import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Terminal,
} from "lucide-react";
import { profile } from "../data/profile";

export default function Footer({
  onOpenTerminal,
}: {
  onOpenTerminal: () => void;
}) {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-main">
        <a className="brand" href="#accueil">
          JJ / KOUASSI<span className="accent">.</span>
        </a>
        <p>Systèmes fiables. Réseaux sécurisés. Interfaces utiles.</p>
        <a
          className="back-top"
          href="#accueil"
          aria-label="Revenir en haut de la page"
        >
          <ArrowUp size={19} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={15} /> GitHub <ArrowUpRight size={12} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={15} /> LinkedIn <ArrowUpRight size={12} />
          </a>
          <button onClick={onOpenTerminal} aria-haspopup="dialog">
            <Terminal size={15} /> Version terminal
          </button>
        </div>
        <span>Conçu avec soin, en Île-de-France.</span>
      </div>
    </footer>
  );
}
