import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler } from "../server/contact-handler.js";

const message = {
  name: "Camille Martin",
  email: "camille@example.com",
  message: "Bonjour Jean-Jaures, parlons de mon projet.",
  website: "",
};
function request(body = message, overrides = {}) {
  return {
    method: "POST",
    headers: {
      origin: "https://portofolio-jean-jaures.vercel.app",
      "content-type": "application/json",
      "x-forwarded-for": "192.0.2.1",
    },
    body,
    ...overrides,
  };
}
function fixture(options = {}) {
  const calls = [];
  const handler = createContactHandler({
    getEnv: () => ({ RESEND_API_KEY: "test-only-key" }),
    fetchImpl: async (...args) => {
      calls.push(args);
      return new Response(JSON.stringify({ id: "test-message-id" }), {
        status: 200,
      });
    },
    ...options,
  });
  return {
    calls,
    send: async (req = request()) => {
      const response = {
        code: 200,
        headers: {},
        body: null,
        status(code) {
          this.code = code;
          return this;
        },
        setHeader(key, value) {
          this.headers[key] = value;
        },
        json(body) {
          this.body = body;
          return this;
        },
      };
      await handler(req, response);
      return response;
    },
  };
}

test("envoie au propriétaire, conserve l’adresse de réponse et évite les doubles envois", async () => {
  const f = fixture();
  const input = {
    ...message,
    name: "Camille\nMartin",
    to: "intrus@example.com",
    message: "Bonjour, <script>alert(1)</script> voici mon projet.",
  };
  const response = await f.send(request(input));
  assert.equal(response.code, 202);
  assert.deepEqual(response.body, { success: true });
  const [url, options] = f.calls[0];
  assert.equal(url, "https://api.resend.com/emails");
  const payload = JSON.parse(options.body);
  assert.deepEqual(payload.to, ["kouassijaures605@gmail.com"]);
  assert.equal(payload.reply_to, message.email);
  assert.equal(payload.subject.includes("\n"), false);
  assert.equal(payload.html, undefined);
  assert.ok(payload.text.includes(input.message));
  assert.equal(JSON.stringify(response.body).includes("test-only-key"), false);
  await f.send(request(input));
  assert.equal(
    f.calls[0][1].headers["Idempotency-Key"],
    f.calls[1][1].headers["Idempotency-Key"],
  );
});

test("refuse les données invalides et le honeypot avant tout envoi", async () => {
  const f = fixture();
  for (const body of [
    null,
    [],
    "{invalide",
    { ...message, name: "A" },
    { ...message, email: "invalid" },
    { ...message, message: "court" },
    { ...message, message: "x".repeat(5001) },
    { ...message, website: "spam" },
    { ...message, extra: "x".repeat(40000) },
  ]) {
    const r = await f.send(request(body));
    assert.ok([400, 413].includes(r.code));
    assert.equal(r.body.success, false);
  }
  assert.equal(f.calls.length, 0);
});

test("refuse les autres méthodes, les origines inconnues et les formulaires externes", async () => {
  const f = fixture();
  assert.equal((await f.send(request(message, { method: "GET" }))).code, 405);
  assert.equal(
    (
      await f.send(
        request(message, {
          headers: {
            origin: "https://example.com",
            "content-type": "application/json",
          },
        }),
      )
    ).code,
    403,
  );
  assert.equal(
    (
      await f.send(
        request(message, { headers: { "content-type": "application/json" } }),
      )
    ).code,
    403,
  );
  assert.equal(
    (
      await f.send(
        request(message, {
          headers: {
            origin: "https://portofolio-jean-jaures.vercel.app",
            "content-type": "text/plain",
          },
        }),
      )
    ).code,
    415,
  );
  assert.equal(f.calls.length, 0);
});

test("signale la configuration manquante sans annoncer de réussite", async () => {
  const f = fixture({ getEnv: () => ({}) });
  const r = await f.send();
  assert.equal(r.code, 503);
  assert.equal(r.body.code, "configuration");
  assert.equal(f.calls.length, 0);
});

test("aucune fausse réussite si le prestataire refuse, renvoie du HTML ou n’accuse pas réception", async () => {
  for (const [status, body] of [
    [403, { message: "Sender not verified" }],
    [429, {}],
    [500, {}],
    [200, {}],
  ]) {
    const f = fixture({
      fetchImpl: async () => new Response(JSON.stringify(body), { status }),
    });
    const r = await f.send();
    assert.equal(r.body.success, false);
    assert.equal(r.code, 502);
  }
  const f = fixture({
    fetchImpl: async () => new Response("<html>Error</html>"),
  });
  assert.equal((await f.send()).body.success, false);
  const network = fixture({
    fetchImpl: async () => {
      throw new TypeError("Network error");
    },
  });
  assert.equal((await network.send()).code, 502);
});

test("arrête un envoi qui ne répond pas", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const f = fixture({
    fetchImpl: async (_url, options) =>
      new Promise((_resolve, reject) => {
        options.signal.addEventListener(
          "abort",
          () => reject(new Error("Aborted")),
          { once: true },
        );
      }),
  });
  const pending = f.send();
  t.mock.timers.tick(10001);
  const r = await pending;
  assert.equal(r.code, 504);
  assert.equal(r.body.code, "timeout");
});

test("limite les envois d’une même IP puis libère le quota", async () => {
  let time = 0;
  const f = fixture({ now: () => time });
  for (let i = 0; i < 5; i++) assert.equal((await f.send()).code, 202);
  const r = await f.send();
  assert.equal(r.code, 429);
  assert.equal(f.calls.length, 5);
  time = 600001;
  assert.equal((await f.send()).code, 202);
});
