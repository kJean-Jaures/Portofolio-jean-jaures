export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  website?: string;
}
export class ContactError extends Error {
  code:
    | "validation"
    | "activation"
    | "configuration"
    | "rate_limit"
    | "timeout"
    | "service";
  constructor(code: ContactError["code"], message: string) {
    super(message);
    this.name = "ContactError";
    this.code = code;
  }
}

/** Uses the site’s server endpoint; static hosting retains the FormSubmit relay. */
export async function sendContactMessage(
  input: ContactMessage,
  recipient: string,
) {
  const name = input.name.trim().replace(/[\r\n]/g, " ");
  const email = input.email.trim();
  const message = input.message.trim();
  if (
    input.website ||
    name.length < 2 ||
    name.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    message.length < 10 ||
    message.length > 5000
  )
    throw new ContactError(
      "validation",
      "Vérifiez votre nom, votre email et votre message (10 caractères minimum).",
    );
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 18000);
  try {
    let response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        website: input.website || "",
      }),
      signal: controller.signal,
    });
    // GitHub Pages has no server functions. Only a missing endpoint falls back;
    // a timeout never triggers a second send, because the first may have arrived.
    const staticHost =
      response.status === 404 ||
      response.status === 405 ||
      (response.ok &&
        response.headers.get("content-type")?.includes("text/html"));
    if (staticHost) {
      response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `Portfolio — Message de ${name}`,
          _template: "table",
          _captcha: "false",
          _honey: "",
        }),
        signal: controller.signal,
      });
    }
    const result: {
      success?: boolean | string;
      message?: string;
      code?: string;
    } = await response.json();
    if (result.code === "configuration")
      throw new ContactError(
        "configuration",
        "L’envoi est momentanément indisponible. Vous pouvez m’écrire depuis votre messagerie.",
      );
    if (response.status === 429 || result.code === "rate_limit")
      throw new ContactError(
        "rate_limit",
        "Plusieurs messages ont déjà été envoyés. Merci de patienter quelques minutes avant de réessayer.",
      );
    if (result.code === "timeout")
      throw new ContactError(
        "timeout",
        "La confirmation tarde à arriver. Votre message est conservé ; vérifiez avant de le renvoyer pour éviter un doublon.",
      );
    if (/activat|confirm.*email|verify.*email/i.test(result.message || ""))
      throw new ContactError(
        "activation",
        "L’envoi n’est pas encore disponible. Vous pouvez m’écrire depuis votre messagerie.",
      );
    if (!response.ok || (result.success !== true && result.success !== "true"))
      throw new ContactError(
        "service",
        "L’envoi n’a pas pu être confirmé. Votre message est conservé ; vous pouvez utiliser votre messagerie.",
      );
  } catch (error) {
    if (error instanceof ContactError) throw error;
    if (controller.signal.aborted)
      throw new ContactError(
        "timeout",
        "La confirmation tarde à arriver. Votre message est conservé ; vérifiez avant de le renvoyer pour éviter un doublon.",
      );
    throw new ContactError(
      "service",
      "La connexion a été interrompue. Votre message est conservé ; vous pouvez utiliser votre messagerie.",
    );
  } finally {
    window.clearTimeout(timeout);
  }
}
