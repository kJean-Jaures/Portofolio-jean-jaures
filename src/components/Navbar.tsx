import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Bot,
  Menu,
  Moon,
  Sun,
  X,
  Pause,
  Play,
  Home,
  UserRound,
  Layers,
  Mail,
} from "lucide-react";
import { useMotionSettings } from "./visuals/MotionSettings";

const links = [
  { label: "Accueil", id: "accueil", icon: Home },
  { label: "Profil", id: "apropos", icon: UserRound },
  { label: "Portfolio", id: "portfolio", icon: Layers },
  { label: "Contact", id: "contact", icon: Mail },
];

export default function Navbar({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const navRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const [mascotLeft, setMascotLeft] = useState(24);
  const { enabled, toggle, systemReduced } = useMotionSettings();
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const menu = document.getElementById("main-navigation");
        if (menu?.contains(document.activeElement))
          menuToggleRef.current?.focus();
        setMenuOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    links.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });
    document.addEventListener("keydown", close);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", close);
      desktop.removeEventListener("change", onResize);
      observer.disconnect();
    };
  }, []);
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () => {
      const link = nav.querySelector<HTMLAnchorElement>(
        ".nav-links > a.is-current",
      );
      if (window.innerWidth < 768 || !link) {
        setMascotLeft(24);
        return;
      }
      const bounds = link.getBoundingClientRect();
      setMascotLeft(
        bounds.left - nav.getBoundingClientRect().left + bounds.width / 2 - 16,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [active, menuOpen]);
  return (
    <header className="site-header floating-header">
      <nav
        ref={navRef}
        className="nav-shell section-shell"
        aria-label="Navigation principale"
      >
        <a
          href="#accueil"
          className="brand"
          aria-label="Jean-Jaures KOUASSI — Accueil"
          onClick={() => {
            setMenuOpen(false);
            setActive("accueil");
          }}
        >
          <span
            className="nav-mascot"
            style={{ left: mascotLeft }}
            aria-hidden="true"
          >
            <Bot size={23} />
          </span>
          <span className="brand-monogram">
            JJ<span>.</span>
          </span>
        </a>
        <div
          id="main-navigation"
          className={`nav-links ${menuOpen ? "is-open" : ""}`}
        >
          {links.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "is-current" : ""}
              aria-current={active === id ? "location" : undefined}
              onClick={() => {
                setMenuOpen(false);
                setActive(id);
              }}
            >
              <Icon size={14} />
              <span>{label}</span>
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="icon-button motion-toggle"
            onClick={toggle}
            disabled={systemReduced}
            aria-label={
              systemReduced
                ? "Animations réduites selon vos préférences système"
                : enabled
                  ? "Mettre les animations en pause"
                  : "Activer les animations"
            }
            title={
              systemReduced
                ? "Animations réduites selon vos préférences système"
                : enabled
                  ? "Mettre les animations en pause"
                  : "Activer les animations"
            }
          >
            {enabled ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            className="icon-button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
              darkMode ? "Activer le thème clair" : "Activer le thème sombre"
            }
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            ref={menuToggleRef}
            className="icon-button menu-toggle"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-controls="main-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
