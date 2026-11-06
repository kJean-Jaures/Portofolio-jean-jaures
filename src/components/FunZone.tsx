import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Gamepad2, Zap } from 'lucide-react';
const NeonArcade = lazy(() => import('./games/NeonArcade'));
const games = [
  {id:'race',name:'Night Drive',tag:'Course · Esquive',number:'01',description:'Trois voies. Des obstacles. Garde le contrôle et tiens le plus longtemps possible.',color:'pink'},
  {id:'breaker',name:'Brick Rush',tag:'Casse-briques',number:'02',description:'Trouve le bon angle, renvoie la balle et fais tomber le mur de néons.',color:'cyan'},
  {id:'flight',name:'Sky Hop',tag:'Vol · Réflexes',number:'03',description:'Un battement d’ailes à la fois. Faufile-toi entre les colonnes sans les toucher.',color:'violet'},
] as const;
const readGame=()=>games.find(game=>`#${game.id}`===window.location.hash)?.id??null;
export default function FunZone(){
  const [selected,setSelected]=useState(readGame);
  const title=useRef<HTMLHeadingElement>(null);
  const first=useRef(true);
  useEffect(()=>{const update=()=>setSelected(readGame());window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
  useEffect(()=>{if(first.current){first.current=false;return;}title.current?.focus();window.scrollTo({top:0,behavior:'instant'});},[selected]);
  const game=games.find(item=>item.id===selected);
  return <section id="funzone" className={`neon-zone ${game?'neon-playing':''}`}>
    <div className="neon-heading">
      <p className="neon-eyebrow"><span/> JJ. ARCADE / INSERT COIN? NO NEED.</p>
      <h1 tabIndex={-1} ref={title}>{game?game.name:<>Juste une<br/><span>dernière partie.</span></>}</h1>
      <p>{game?game.description:'Coupe avec le quotidien. Prends le volant, casse les briques ou défie la gravité.'}</p>
      {!game&&<div className="neon-meta"><span><Gamepad2 size={15}/> 3 jeux d’arcade</span><span><Zap size={15}/> Joue instantanément</span><span>Mobile + clavier</span></div>}
    </div>
    {game?<>
      <nav className="neon-game-nav" aria-label="Navigation des jeux"><a href="#menu"><ArrowLeft size={17}/> Le salon</a><span>0{games.findIndex(item=>item.id===game.id)+1} / 03</span></nav>
      <div className="neon-stage"><Suspense fallback={<p role="status">Préparation du terrain…</p>}><NeonArcade key={game.id} mode={game.id}/></Suspense></div>
    </>:<>
      <div className="neon-shelf-label"><span>CHOISIS TON TERRAIN</span><span>01 — 03</span></div>
      <div className="neon-library">{games.map(item=><a key={item.id} className={`neon-card neon-card-${item.id}`} href={`#${item.id}`}>
        <div className="neon-art" aria-hidden="true">
          <span className="neon-art-number">{item.number}</span>
          {item.id==='race'?<div className="art-road"><i/><i/><span className="art-car"/><span className="art-rival"/></div>:item.id==='breaker'?<div className="art-breaker"><div>{Array.from({length:18},(_,i)=><i key={i}/>)}</div><span className="art-ball"/><span className="art-paddle"/></div>:<div className="art-flight"><span className="art-moon"/><i/><i/><span className="art-bird">›</span><span className="art-stars">✦ · ✧</span></div>}
          <span className="neon-art-tag">{item.tag}</span>
        </div>
        <div className="neon-card-copy"><h2>{item.name}</h2><p>{item.description}</p><span className="neon-card-cta">Jouer maintenant <ArrowUpRight size={20}/></span></div>
      </a>)}</div>
      <div className="neon-bottom-note"><span className="neon-live-dot"/> Aucun compte. Aucun téléchargement. Juste le jeu.</div>
    </>}
  </section>;
}
