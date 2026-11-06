import { createHash } from "node:crypto";

const RECIPIENT = "kouassijaures605@gmail.com";
const WINDOW_MS = 10 * 60 * 1000;

export function createContactHandler({
  fetchImpl = (...args) => fetch(...args),
  getEnv = () => process.env,
  now = () => Date.now(),
} = {}) {
  // A small per-instance limit; the email provider also applies its account limits.
  const attempts = new Map();
  return async function contact(req, res) {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ success: false, code: "method" });
    }
    const env = getEnv();
    const origins = new Set([
      "https://portofolio-jean-jaures.vercel.app",
      "https://kjean-jaures.github.io",
      ...[env.VERCEL_URL, env.VERCEL_PROJECT_PRODUCTION_URL]
        .filter(Boolean)
        .map((host) => `https://${host}`),
      env.CONTACT_ALLOWED_ORIGIN,
    ]);
    if (!req.headers.origin || !origins.has(req.headers.origin))
      return res.status(403).json({ success: false, code: "origin" });
    if (!req.headers["content-type"]?.startsWith("application/json"))
      return res.status(415).json({ success: false, code: "validation" });

    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ success: false, code: "validation" });
      }
    }
    if (!body || typeof body !== "object" || Array.isArray(body))
      return res.status(400).json({ success: false, code: "validation" });
    if (Buffer.byteLength(JSON.stringify(body), "utf8") > 32768)
      return res.status(413).json({ success: false, code: "validation" });
    const name =
      typeof body.name === "string"
        ? body.name.trim().replace(/[\r\n]/g, " ")
        : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (
      body.website ||
      name.length < 2 ||
      name.length > 120 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      message.length < 10 ||
      message.length > 5000
    )
      return res.status(400).json({ success: false, code: "validation" });
    if (!env.RESEND_API_KEY)
      return res.status(503).json({ success: false, code: "configuration" });

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
    const time = now();
    for (const [key, attempt] of attempts)
      if (time >= attempt.expires) attempts.delete(key);
    const attempt = attempts.get(ip) || { count: 0, expires: time + WINDOW_MS };
    if (attempt.count >= 5 || (!attempts.has(ip) && attempts.size >= 1024)) {
      res.setHeader("Retry-After", "600");
      return res.status(429).json({ success: false, code: "rate_limit" });
    }
    attempt.count += 1;
    attempts.set(ip, attempt);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const idempotency = createHash("sha256")
        .update(JSON.stringify({ name, email, message }))
        .digest("hex");
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `portfolio-${idempotency}`,
        },
        body: JSON.stringify({
          from:
            env.CONTACT_FROM_EMAIL ||
            "Jean-Jaures KOUASSI <onboarding@resend.dev>",
          to: [RECIPIENT],
          reply_to: email,
          subject: `Portfolio — Message de ${name}`,
          text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
        }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || typeof result.id !== "string" || !result.id) {
        const code = [401, 403].includes(response.status)
          ? "configuration"
          : "service";
        return res.status(502).json({ success: false, code });
      }
      return res.status(202).json({ success: true });
    } catch {
      return res.status(controller.signal.aborted ? 504 : 502).json({
        success: false,
        code: controller.signal.aborted ? "timeout" : "service",
      });
    } finally {
      clearTimeout(timeout);
    }
  };
}
