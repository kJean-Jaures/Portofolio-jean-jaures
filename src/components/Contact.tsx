import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { profile } from "../data/profile";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (status !== "sending") setStatus("idle");
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(form))
        data.append(key, value.trim());
      data.append("_subject", `Portfolio — Message de ${form.name.trim()}`);
      data.append("_template", "table");
      data.append("_captcha", "false");
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        { method: "POST", headers: { Accept: "application/json" }, body: data },
      );
      const result: { success?: boolean | string } = await response.json();
      if (
        !response.ok ||
        (result.success !== true && result.success !== "true")
      )
        throw new Error("Envoi non confirmé");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };
  return (
    <section id="contact" className="section section-shell">
      <div className="contact-panel">
        <div className="contact-copy">
          <SectionHeading
            number="06"
            label="Faisons connaissance"
            title="Et si on travaillait ensemble ?"
          />
          <p>
            Vous recherchez un alternant curieux, impliqué et à l’aise entre
            systèmes, réseaux et développement ? Échangeons sur les besoins de
            votre équipe.
          </p>
          <span className="availability">
            <span className="status-dot" /> Alternance · Île-de-France
          </span>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>
              <Mail size={19} />
              <span>
                <small>Écrivez-moi</small>
                {profile.email}
              </span>
              <ArrowUpRight size={17} />
            </a>
            <a href={profile.phoneHref}>
              <Phone size={19} />
              <span>
                <small>Appelez-moi</small>
                {profile.phone}
              </span>
              <ArrowUpRight size={17} />
            </a>
            <div>
              <MapPin size={19} />
              <span>
                <small>Localisation</small>
                {profile.location}, France
              </span>
            </div>
          </div>
          <div className="contact-socials">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={17} /> GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          aria-label="Envoyer un message"
        >
          <h3>Un premier message ?</h3>
          <p>
            Parlez-moi de votre équipe, de votre projet ou de votre opportunité.
          </p>
          <label htmlFor="contact-name">Votre nom</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Prénom et nom"
            required
            maxLength={120}
            disabled={status === "sending"}
          />
          <label htmlFor="contact-email">Votre adresse email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="vous@entreprise.fr"
            required
            maxLength={254}
            disabled={status === "sending"}
          />
          <label htmlFor="contact-message">Votre message</label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Bonjour Jean-Jaures, échangeons sur…"
            rows={5}
            required
            maxLength={5000}
            disabled={status === "sending"}
          />
          <button
            className="button button-primary"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <Loader2 className="loading-icon" size={18} /> Envoi en cours…
              </>
            ) : (
              <>
                Envoyer mon message <Send size={17} />
              </>
            )}
          </button>
          <div aria-live="polite" aria-atomic="true">
            {status === "success" && (
              <p className="form-success">
                <CheckCircle2 size={17} /> Merci ! Votre message a bien été
                envoyé.
              </p>
            )}
            {status === "error" && (
              <p className="form-error">
                L’envoi n’a pas abouti. Vos champs sont conservés. Vous pouvez
                réessayer ou m’écrire à{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </p>
            )}
          </div>
          <p className="form-note">
            Envoi via FormSubmit. Vos coordonnées servent uniquement à répondre
            à votre message.
          </p>
        </form>
      </div>
    </section>
  );
}
