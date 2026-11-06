import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import { profile } from "../data/profile";
import cv from "../assets/CV-Jean-Jaures-KOUASSI.pdf";
import { Reveal } from "./visuals/Reveal";
import TypingText from "./visuals/TypingText";
import HeroConsole from "./HeroConsole";

export default function Hero({
  onOpenTerminal,
}: {
  onOpenTerminal: () => void;
}) {
  return (
    <section
      id="accueil"
      className="hero section-shell cosmic-hero"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <Reveal>
          <p className="hero-overline">
            <span className="mini-orbit" /> KOUAMÉ JEAN-JAURES KOUASSI
          </p>
          <h1 id="hero-title">
            <span>Des idées.</span>
            <br />
            Du code.
            <br />
            Du concret<span className="hero-dot">.</span>
          </h1>
          <div className="hero-role">
            <span className="typing-prompt" aria-hidden="true">
              ❯
            </span>{" "}
            <TypingText />
          </div>
          <p className="hero-description">
            Je construis des expériences web et j’explore les systèmes qui les
            font vivre. Étudiant en Bachelor 3 à l’{profile.school}, je relie
            développement, réseaux et cybersécurité.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#experiences">
              Mes réalisations <ArrowUpRight size={17} />
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
            <span className="availability">
              <span className="status-dot" /> Disponible pour une alternance
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mon profil GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mon profil LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </Reveal>
      </div>
      <Reveal className="hero-visual cosmic-console-visual" delay={0.15}>
        <div className="console-aura" />
        <span className="orbit-spark spark-one" aria-hidden="true">
          ✦
        </span>
        <span className="orbit-spark spark-two" aria-hidden="true">
          +
        </span>
        <HeroConsole onOpenTerminal={onOpenTerminal} />
        <span className="console-caption">
          Un profil. Plusieurs façons de créer.
        </span>
      </Reveal>
      <div className="hero-bottom">
        <span>Développement / Infrastructure / SecOps</span>
        <a href="#apropos">
          <span className="scroll-mouse" aria-hidden="true">
            <i />
          </span>{" "}
          Découvrir mon univers <ArrowDown size={14} />
        </a>
        <span className="hero-coordinate">ÎLE-DE-FRANCE, FR</span>
      </div>
    </section>
  );
}
