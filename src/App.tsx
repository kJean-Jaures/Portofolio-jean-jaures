import { lazy, Suspense, useEffect, useState } from "react";
import { Gamepad2, ArrowUpRight } from "lucide-react";
import Navbar from "./components/Navbar";
import { MotionSettingsProvider } from "./components/visuals/MotionSettings";
import Atmosphere from "./components/visuals/Atmosphere";
import Hero from "./components/Hero";
import About from "./components/About";
import PortfolioHub from "./components/PortfolioHub";
import WelcomeIntro from "./components/visuals/WelcomeIntro";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const GamesPage = lazy(() => import("./components/GamesPage"));
const InteractiveTerminal = lazy(
  () => import("./components/InteractiveTerminal"),
);

function Portfolio() {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [terminalOpen, setTerminalOpen] = useState(false);
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.classList.toggle("light", !darkMode);
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Theme remains usable without storage. */
    }
  }, [darkMode]);
  return (
    <>
      <Atmosphere />
      <WelcomeIntro />
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main id="main">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <About />
        <PortfolioHub />
        <Contact />
        <section className="arcade-invite section-shell" aria-labelledby="arcade-invite-title">
          <div>
            <span className="eyebrow"><Gamepad2 size={18} /> La pause ludique</span>
            <h2 id="arcade-invite-title">On fait une partie ?</h2>
            <p>Course, casse-briques et vol : trois défis dans mon salon arcade.</p>
          </div>
          <a className="button button-primary" href="./jeux.html">
            Entrer dans l’espace jeux <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />
      {terminalOpen && (
        <Suspense fallback={<p role="status">Ouverture du terminal…</p>}>
          <InteractiveTerminal
            isOpen={terminalOpen}
            onClose={() => setTerminalOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}

export default function App() {
  return (
    <MotionSettingsProvider>
      {window.location.pathname.endsWith("/jeux.html") ? (
        <Suspense fallback={<p className="lazy-loading" role="status">Chargement de l’espace jeux…</p>}>
          <GamesPage />
        </Suspense>
      ) : <Portfolio />}
    </MotionSettingsProvider>
  );
}
