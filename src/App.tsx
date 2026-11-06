import { lazy, Suspense, useEffect, useState } from "react";
import { Gamepad2, ArrowDownRight } from "lucide-react";
import Navbar from "./components/Navbar";
import { MotionSettingsProvider } from "./components/visuals/MotionSettings";
import Atmosphere from "./components/visuals/Atmosphere";
import Hero from "./components/Hero";
import About from "./components/About";
import PortfolioHub from "./components/PortfolioHub";
import WelcomeIntro from "./components/visuals/WelcomeIntro";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const FunZone = lazy(() => import("./components/FunZone"));
const InteractiveTerminal = lazy(
  () => import("./components/InteractiveTerminal"),
);

function Portfolio() {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
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
        <div className="playground section-shell">
          <details onToggle={(event) => setGamesOpen(event.currentTarget.open)}>
            <summary>
              <span>
                <Gamepad2 size={19} />
                <strong>Un peu de code, juste pour le plaisir.</strong>
                <span className="playground-subtitle">
                  Mes petites expériences interactives
                </span>
              </span>
              <ArrowDownRight size={20} />
            </summary>
            {gamesOpen && (
              <div className="playground-content dark">
                <Suspense
                  fallback={
                    <p className="lazy-loading" role="status">
                      Chargement des jeux…
                    </p>
                  }
                >
                  <FunZone />
                </Suspense>
              </div>
            )}
          </details>
        </div>
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
      <Portfolio />
    </MotionSettingsProvider>
  );
}
