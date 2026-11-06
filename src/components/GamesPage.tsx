import { ArrowLeft, Gamepad2 } from "lucide-react";
import FunZone from "./FunZone";

export default function GamesPage() {
  return (
    <div className="arcade-page dark">
      <a className="skip-link" href="#arcade-main">Aller aux jeux</a>
      <header className="arcade-header section-shell">
        <a className="arcade-home" href="./index.html#accueil">
          <ArrowLeft size={18} /> Retour au portfolio
        </a>
        <span className="arcade-brand"><Gamepad2 size={20} /> JJ. Arcade</span>
      </header>
      <main id="arcade-main" className="section-shell">
        <FunZone />
      </main>
      <footer className="arcade-footer">Une pause entre deux projets. À toi de jouer.</footer>
    </div>
  );
}
