export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  website?: string;
}
export class ContactError extends Error {
  code: "validation" | "activation" | "timeout" | "service";
  constructor(code: ContactError["code"], message: string) {
    super(message);
    this.name = "ContactError";
    this.code = code;
  }
}

/** Sends a real request to FormSubmit; success requires the provider's explicit acknowledgement. */
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
  const data = new FormData();
  Object.entries({
    name,
    email,
    message,
    _replyto: email,
    _subject: `Portfolio — Message de ${name}`,
    _template: "table",
    _captcha: "false",
    _honey: "",
  }).forEach(([key, value]) => data.append(key, value));
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
      signal: controller.signal,
    });
    const result: { success?: boolean | string; message?: string } =
      await response.json();
    if (/activat|confirm.*email|verify.*email/i.test(result.message || ""))
      throw new ContactError(
        "activation",
        "Le formulaire attend son activation. Vous pouvez déjà me contacter directement par email.",
      );
    if (!response.ok || (result.success !== true && result.success !== "true"))
      throw new ContactError(
        "service",
        "Le service n’a pas confirmé l’envoi. Réessayez ou contactez-moi directement par email.",
      );
  } catch (error) {
    if (error instanceof ContactError) throw error;
    if (controller.signal.aborted)
      throw new ContactError(
        "timeout",
        "Le service met trop de temps à répondre. Vos champs sont conservés : réessayez ou écrivez-moi directement.",
      );
    throw new ContactError(
      "service",
      "La connexion au service d’envoi a échoué. Vos champs sont conservés.",
    );
  } finally {
    window.clearTimeout(timeout);
  }
}
