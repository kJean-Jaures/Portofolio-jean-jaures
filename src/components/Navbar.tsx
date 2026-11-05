import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Network, Sun, X } from "lucide-react";

const links = [
  { label: "Profil", id: "apropos" },
  { label: "Expériences", id: "experiences" },
  { label: "Projets", id: "realisations" },
  { label: "Compétences", id: "competences" },
  { label: "Formation", id: "parcours" },
];

export default function Navbar({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", close);
      desktop.removeEventListener("change", onResize);
    };
  }, []);
  return (
    <header className="site-header">
      <nav
        className="nav-shell section-shell"
        aria-label="Navigation principale"
      >
        <a
          href="#accueil"
          className="brand"
          aria-label="Jean-Jaures KOUASSI — Accueil"
          onClick={() => setMenuOpen(false)}
        >
          <Network size={24} strokeWidth={1.6} />
          <span>
            JJ<span className="brand-slash"> / </span>KOUASSI
            <span className="accent">.</span>
          </span>
        </a>
        <div
          id="main-navigation"
          className={`nav-links ${menuOpen ? "is-open" : ""}`}
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="nav-mobile-contact"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Me contacter <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
              darkMode ? "Activer le thème clair" : "Activer le thème sombre"
            }
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <a className="nav-contact" href="#contact">
            Échangeons <ArrowUpRight size={16} />
          </a>
          <button
            className="icon-button menu-toggle"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-controls="main-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
