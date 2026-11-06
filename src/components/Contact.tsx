import { useRef, useState, type FormEvent } from "react";
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
import { ContactError, sendContactMessage } from "../lib/contact";
import TechScene from "./visuals/LazyScene";
import { Reveal } from "./visuals/Reveal";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inFlight = useRef(false);
  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (status !== "sending") setStatus("idle");
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setErrorMessage("");
    setStatus("sending");
    try {
      await sendContactMessage(form, profile.email);
      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (error) {
      setErrorMessage(
        error instanceof ContactError
          ? error.message
          : "L’envoi n’a pas pu être confirmé.",
      );
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  };
  return (
    <section id="contact" className="section section-shell">
      <Reveal className="contact-panel">
        <div className="contact-copy">
          <SectionHeading
            number="03"
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
          <div className="contact-scene">
            <TechScene variant="globe" />
          </div>
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
          aria-busy={status === "sending"}
          onSubmit={handleSubmit}
          aria-label="Envoyer un message"
          action={`https://formsubmit.co/${profile.email}`}
          method="POST"
        >
          <h3>Un premier message ?</h3>
          <p>
            Parlez-moi de votre équipe, de votre projet ou de votre opportunité.
          </p>
          <div className="form-honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Votre site web</label>
            <input
              id="contact-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
            />
          </div>
          <label htmlFor="contact-name">Votre nom</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Prénom et nom"
            required
            minLength={2}
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
            minLength={10}
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
          <div aria-live="polite" aria-atomic="true" className="form-feedback">
            {status === "success" && (
              <p className="form-success">
                <CheckCircle2 size={17} /> Merci ! Le service d’envoi a bien
                accepté votre message.
              </p>
            )}
            {status === "error" && (
              <p className="form-error">
                {errorMessage} Vous pouvez m’écrire à{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </p>
            )}
          </div>
          <p className="form-note">
            Envoi via FormSubmit. Vos coordonnées servent uniquement à répondre
            à votre message.
          </p>
        </form>
      </Reveal>
    </section>
  );
}
