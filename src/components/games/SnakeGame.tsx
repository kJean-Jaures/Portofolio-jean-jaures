import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pause, Play, RotateCcw } from 'lucide-react';
import { advanceSnake, randomFood, type Point } from './arcade-engine';
const SIZE = 16;
const initial = [{x:7,y:8},{x:6,y:8},{x:5,y:8}];
const directions: Record<string, Point> = {ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}};
export default function SnakeGame() {
  const [snake,setSnake] = useState<Point[]>(initial);
  const [food,setFood] = useState<Point>({x:11,y:8});
  const [phase,setPhase] = useState<'idle'|'playing'|'paused'|'over'|'won'>('idle');
  const direction = useRef<Point>({x:1,y:0});
  const pending = useRef<Point>({x:1,y:0});
  const changed = useRef(false);
  const board = useRef<HTMLDivElement>(null);
  const score = snake.length - initial.length;
  const steer = (next:Point) => {
    if (changed.current || phase !== 'playing' || (next.x === -direction.current.x && next.y === -direction.current.y)) return;
    pending.current = next; changed.current = true;
  };
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      direction.current = pending.current; changed.current = false;
      const next = advanceSnake(snake, direction.current, food, SIZE);
      if (next.collided) {setPhase('over'); return;}
      setSnake(next.snake);
      if (next.ate) {
        const target = randomFood(next.snake,SIZE);
        if (target) setFood(target); else setPhase('won');
      }
    },Math.max(85,180-score*4));
    return () => clearInterval(timer);
  },[snake,food,phase,score]);
  useEffect(() => {
    const hide = () => {if(document.hidden) setPhase(p=>p==='playing'?'paused':p);};
    document.addEventListener('visibilitychange',hide);
    return () => document.removeEventListener('visibilitychange',hide);
  },[]);
  const start = () => {
    setSnake(initial); setFood({x:11,y:8}); direction.current={x:1,y:0};pending.current={x:1,y:0};changed.current=false;setPhase('playing');board.current?.focus();
  };
  return <div className="mini-game snake-game">
    <div className="game-stats"><span>Score <strong>{score}</strong></span><span>Vitesse <strong>{Math.min(10,1+Math.floor(score/3))}</strong></span></div>
    <p className="game-status" role="status">{phase==='over'?'Partie terminée !':phase==='won'?'Plateau rempli, bravo !':phase==='paused'?'En pause':phase==='idle'?'Prêt à jouer ?':'Attrape les points verts.'}</p>
    <div ref={board} tabIndex={0} className="snake-board" role="group" aria-label="Plateau Snake, utilise les flèches pour diriger le serpent" onKeyDown={e=>{
      if(directions[e.key]) {e.preventDefault();steer(directions[e.key]);}
      if(e.key===' ') {e.preventDefault();setPhase(p=>p==='playing'?'paused':p==='paused'?'playing':p);}
    }}>
      {Array.from({length:SIZE*SIZE},(_,i)=>{
        const x=i%SIZE,y=Math.floor(i/SIZE), body=snake.findIndex(p=>p.x===x&&p.y===y);
        return <span key={i} className={body===0?'snake-head':body>0?'snake-body':food.x===x&&food.y===y?'snake-food':''}/>;
      })}
    </div>
    <div className="snake-controls" role="group" aria-label="Direction du serpent">
      {[[ArrowUp,'ArrowUp','Haut'],[ArrowLeft,'ArrowLeft','Gauche'],[ArrowDown,'ArrowDown','Bas'],[ArrowRight,'ArrowRight','Droite']].map(([Icon,key,label])=>{
        const Symbol=Icon as typeof ArrowUp;
        return <button key={key as string} aria-label={label as string} disabled={phase!=='playing'} onClick={()=>steer(directions[key as string])}><Symbol size={22}/></button>;
      })}
    </div>
    <div className="game-actions">{phase==='playing'||phase==='paused'?<button className="button button-secondary" onClick={()=>setPhase(phase==='playing'?'paused':'playing')}>{phase==='paused'?<Play size={17}/>:<Pause size={17}/>} {phase==='paused'?'Reprendre':'Pause'}</button>:null}
      <button className="button button-primary" onClick={start}>{phase==='idle'?<Play size={17}/>:<RotateCcw size={17}/>} {phase==='idle'?'Commencer':'Rejouer'}</button>
    </div>
    <p className="game-help">Flèches du clavier ou boutons directionnels. Évite les murs et ta propre queue.</p>
  </div>;
}
