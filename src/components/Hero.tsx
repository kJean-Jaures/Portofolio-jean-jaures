import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  Network,
  ShieldCheck,
} from "lucide-react";
import { profile } from "../data/profile";
import portrait from "../assets/photo-profil.webp";
import cv from "../assets/CV-Jean-Jaures-KOUASSI.pdf";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="hero section-shell"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <span className="availability">
          <span className="status-dot" /> Disponible pour une alternance
        </span>
        <p className="hero-overline">Systèmes / Réseaux / SecOps</p>
        <h1 id="hero-title">
          Kouamé
          <br />
          <span>Jean-Jaures</span>
          <br />
          KOUASSI<span className="accent">.</span>
        </h1>
        <p className="hero-role">Administrer. Connecter. Sécuriser.</p>
        <p className="hero-description">
          Étudiant en {profile.degree} à l’{profile.school}, je combine
          administration IT et développement full stack pour comprendre les
          infrastructures de bout en bout.
        </p>
        <div className="button-row">
          <a className="button button-primary" href="#contact">
            Parlons de votre équipe <ArrowUpRight size={18} />
          </a>
          <a
            className="button button-secondary"
            href={cv}
            download="CV-Kouame-Jean-Jaures-KOUASSI.pdf"
          >
            <Download size={17} /> Mon CV
          </a>
        </div>
        <div className="hero-meta">
          <span>
            <MapPin size={15} /> {profile.location}
          </span>
          <span className="meta-divider" />
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={16} /> GitHub <ArrowUpRight size={12} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-card">
          <div className="portrait-topline">
            <span>Le sens du service. L’esprit technique.</span>
            <span className="portrait-mark">JJ / K</span>
          </div>
          <div className="portrait-image">
            <img
              src={portrait}
              alt="Kouamé Jean-Jaures KOUASSI"
              width="736"
              height="1000"
              fetchPriority="high"
            />
          </div>
          <div className="portrait-caption">
            <div>
              <strong>
                Construire des solutions.
                <br />
                Prendre soin des systèmes.
              </strong>
              <span>IT & développement web</span>
            </div>
            <Network size={34} strokeWidth={1.2} />
          </div>
        </div>
        <div className="education-note">
          <ShieldCheck size={23} />
          <div>
            <strong>Réseaux & SecOps</strong>
            <span>
              {profile.school} · Bachelor 3 · {profile.academicYear}
            </span>
          </div>
          <span className="status-dot" />
        </div>
      </div>
      <div className="hero-bottom">
        <span>Un profil technique, une approche humaine.</span>
        <a href="#apropos">
          Découvrir mon parcours <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}
