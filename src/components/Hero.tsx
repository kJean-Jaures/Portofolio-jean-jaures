import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import { profile } from "../data/profile";
import cv from "../assets/CV-Jean-Jaures-KOUASSI.pdf";
import TechScene from "./visuals/LazyScene";
import { Reveal } from "./visuals/Reveal";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="hero section-shell"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <Reveal>
          <span className="availability">
            <span className="status-dot" /> Disponible pour une alternance
          </span>
          <p className="hero-overline">Hello world_ / Moi, c’est Kouamé</p>
          <h1 id="hero-title">
            Jean-Jaures
            <br />
            <span>KOUASSI</span>
            <span className="accent hero-dot">.</span>
          </h1>
          <p className="hero-role">
            Le code rencontre <span>l’infrastructure.</span>
          </p>
          <p className="hero-description">
            Systèmes, réseaux & SecOps. Je connecte les environnements IT et je
            construis des expériences web. Une double compétence, une même
            curiosité.
          </p>
          <div className="hero-study">
            <span className="code-bracket">&lt;/&gt;</span> Bachelor 3 Réseaux &
            SecOps <span>· {profile.school}</span>
          </div>
          <div className="button-row">
            <a className="button button-primary" href="#experiences">
              Explorer mes expériences <ArrowUpRight size={18} />
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
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} />
            </a>
          </div>
        </Reveal>
      </div>
      <div className="hero-visual">
        <div className="scene-aura" />
        <span className="scene-orbit-label label-cyan">Systèmes & réseaux</span>
        <span className="scene-orbit-label label-pink">
          Créativité × Technologie
        </span>
        <TechScene />
        <div className="scene-caption">
          <span className="caption-line" />
          <span>Construire. Connecter. Sécuriser.</span>
          <span className="caption-line" />
        </div>
      </div>
      <div className="hero-bottom">
        <span>De l’idée à l’infrastructure.</span>
        <a href="#apropos">
          Scroll pour explorer <ArrowDown size={15} />
        </a>
        <span className="hero-coordinate">48.85° N / 2.35° E</span>
      </div>
    </section>
  );
}
