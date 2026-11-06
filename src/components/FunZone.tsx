import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Gamepad2 } from "lucide-react";

const TetrisGame = lazy(() => import("./games/TetrisGame"));
const MemoryGame = lazy(() => import("./games/MemoryGame"));
const CyberQuiz = lazy(() => import("./games/CyberQuiz"));
const games = [
  { id: "tetris", name: "Tetris", label: "Réflexes & stratégie", description: "Empile les pièces, complète les lignes et garde le rythme.", icon: "🎮", difficulty: "Moyen", component: TetrisGame },
  { id: "memory", name: "Memory", label: "Observation & mémoire", description: "Retrouve les huit paires avec le moins de coups possible.", icon: "🧠", difficulty: "Facile", component: MemoryGame },
  { id: "quiz", name: "Quiz informatique", label: "Culture tech", description: "Quinze questions pour tester tes connaissances en informatique.", icon: "💻", difficulty: "Moyen", component: CyberQuiz },
];
const readGame = () => games.find(game => `#${game.id}` === window.location.hash)?.id ?? null;

export default function FunZone() {
  const [selected, setSelected] = useState(readGame);
  const title = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    const update = () => setSelected(readGame());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    title.current?.focus();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [selected]);
  const game = games.find(item => item.id === selected);
  const Game = game?.component;
  return (
    <section id="funzone" className="arcade-zone">
      <div className="arcade-heading">
        <p className="eyebrow"><Gamepad2 size={16} /> Le terrain de jeu</p>
        <h1 ref={title} tabIndex={-1}>{game ? game.name : <>Petite pause.<br /><span>Grand défi.</span></>}</h1>
        <p>{game ? game.description : "Choisis ton défi. Trois jeux, trois façons de te dépasser."}</p>
        {!game && <div className="arcade-badges"><span>3 jeux</span><span>Mobile & clavier</span><span>Sans inscription</span></div>}
      </div>
      {game && Game ? (
        <>
          <a className="arcade-back" href="#menu"><ArrowLeft size={18} /> Tous les jeux</a>
          <div className="arcade-stage">
            <Suspense fallback={<p role="status">Chargement du jeu…</p>}><Game /></Suspense>
          </div>
        </>
      ) : (
        <div className="arcade-grid">
          {games.map((item, index) => (
            <a key={item.id} href={`#${item.id}`} className={`arcade-card arcade-card-${item.id}`}>
              <div className="arcade-card-top"><span>0{index + 1}</span><span>{item.difficulty}</span></div>
              <span className="arcade-emoji" aria-hidden="true">{item.icon}</span>
              <p className="arcade-category">{item.label}</p>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <span className="arcade-play">Lancer la partie <ArrowUpRight size={19} /></span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
