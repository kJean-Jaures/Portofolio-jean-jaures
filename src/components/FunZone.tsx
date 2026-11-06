import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Gamepad2, Blocks, Brain, Code2, Grid3X3, Timer, Route } from "lucide-react";

const TetrisGame = lazy(() => import("./games/TetrisGame"));
const MemoryGame = lazy(() => import("./games/MemoryGame"));
const CyberQuiz = lazy(() => import("./games/CyberQuiz"));
const SnakeGame = lazy(() => import("./games/SnakeGame"));
const TicTacToe = lazy(() => import("./games/TicTacToe"));
const ReactionGame = lazy(() => import("./games/ReactionGame"));
const categories = ["Tous", "Réflexes", "Réflexion", "Culture tech"];
const games = [
  { id: "snake", name: "Snake", label: "Réflexes", description: "Guide le serpent et attrape les points sans toucher les murs.", icon: Route, difficulty: "Progressif", component: SnakeGame, fresh: true },
  { id: "morpion", name: "Morpion", label: "Réflexion", description: "Défie l’ordinateur ou joue à deux sur le même écran.", icon: Grid3X3, difficulty: "Solo ou duo", component: TicTacToe, fresh: true },
  { id: "reflexes", name: "Test de réflexes", label: "Réflexes", description: "Attends le signal et découvre ton temps de réaction.", icon: Timer, difficulty: "Express", component: ReactionGame, fresh: true },
  { id: "tetris", name: "Tetris", label: "Réflexes", description: "Empile les pièces, complète les lignes et garde le rythme.", icon: Blocks, difficulty: "Moyen", component: TetrisGame },
  { id: "memory", name: "Memory", label: "Réflexion", description: "Retrouve les huit paires avec le moins de coups possible.", icon: Brain, difficulty: "Facile", component: MemoryGame },
  { id: "quiz", name: "Quiz informatique", label: "Culture tech", description: "Quinze questions pour tester tes connaissances en informatique.", icon: Code2, difficulty: "Moyen", component: CyberQuiz },
];
const readGame = () => games.find(game => `#${game.id}` === window.location.hash)?.id ?? null;

export default function FunZone() {
  const [selected, setSelected] = useState(readGame);
  const [category, setCategory] = useState("Tous");
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
    <section id="funzone" className={`arcade-zone ${game ? "arcade-playing" : ""}`}>
      <div className="arcade-heading">
        <p className="eyebrow"><Gamepad2 size={16} /> Le terrain de jeu</p>
        <h1 ref={title} tabIndex={-1}>{game ? game.name : <>Choisis ton<br /><span>prochain défi.</span></>}</h1>
        <p>{game ? game.description : "Une collection de mini-jeux pour déconnecter, réfléchir et tester tes réflexes."}</p>
        {!game && <div className="arcade-badges"><span>{games.length} jeux gratuits</span><span>Mobile & clavier</span><span>Sans inscription</span></div>}
      </div>
      {game && Game ? (
        <>
          <a className="arcade-back" href="#menu"><ArrowLeft size={18} /> Tous les jeux</a>
          <div className="arcade-stage">
            <Suspense fallback={<p role="status">Chargement du jeu…</p>}><Game /></Suspense>
          </div>
        </>
      ) : (
        <>
          <div className="arcade-library-bar">
            <div className="arcade-filters" role="group" aria-label="Catégorie de jeux">
              {categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <span className="arcade-count" role="status">{games.filter(item => category === "Tous" || item.label === category).length} jeux</span>
          </div>
          <div className="arcade-grid">
            {games.filter(item => category === "Tous" || item.label === category).map(item => {
              const Icon = item.icon;
              return <a key={item.id} href={`#${item.id}`} className={`arcade-card arcade-card-${item.id}`}>
                <div className="arcade-card-top"><span className="arcade-symbol"><Icon size={26} strokeWidth={1.5}/></span>{item.fresh && <span className="arcade-new">Nouveau</span>}</div>
                <p className="arcade-category">{item.label}</p>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <span className="arcade-play"><span>{item.difficulty}</span><span>Jouer <ArrowUpRight size={17}/></span></span>
              </a>;
            })}
          </div>
        </>
      )}
    </section>
  );
}
