import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw, Trophy } from 'lucide-react';
import { createWorld, flap, stepWorld, steer, type ArcadeMode, type World } from './neon-engine';

const colors = ['#fb7185','#fb923c','#facc15','#4ade80','#38bdf8'];
function paint(ctx: CanvasRenderingContext2D, w: World) {
  ctx.fillStyle='#090c20';ctx.fillRect(0,0,360,480);
  ctx.fillStyle='#58658b';
  for(let i=0;i<35;i++) ctx.fillRect((i*97)%360,(i*43+w.time*15)%480,1.5,1.5);
  if(w.mode==='race') {
    ctx.fillStyle='#141a32';ctx.fillRect(31,0,298,480);
    ctx.strokeStyle='#fa55bc';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(31,0);ctx.lineTo(31,480);ctx.moveTo(329,0);ctx.lineTo(329,480);ctx.stroke();
    ctx.strokeStyle='#ffffff30';ctx.setLineDash([22,25]);ctx.lineDashOffset=-w.time*150;
    for(const x of [130,230]) {ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,480);ctx.stroke();}ctx.setLineDash([]);
    const car=(lane:number,y:number,color:string)=>{
      const x=80+lane*100;
      ctx.shadowColor=color;ctx.shadowBlur=13;ctx.fillStyle=color;ctx.fillRect(x-23,y,46,60);ctx.shadowBlur=0;
      ctx.fillStyle='#11182b';ctx.fillRect(x-16,y+12,32,15);ctx.fillRect(x-16,y+40,32,10);
      ctx.fillStyle='#fff3ce';ctx.fillRect(x-19,y+2,10,4);ctx.fillRect(x+9,y+2,10,4);
    };
    for(const obstacle of w.obstacles) car(obstacle.x,obstacle.y,'#fb7185');
    car(w.player,370,'#5eead4');
    ctx.fillStyle='#ffffff50';ctx.font='10px monospace';ctx.textAlign='center';ctx.fillText('NIGHT DRIVE / JJ. ARCADE',180,465);
  } else if(w.mode==='flight') {
    ctx.fillStyle='#162441';
    for(let i=0;i<10;i++) ctx.fillRect(i*44-(w.time*16)%44,375-(i%3)*26,30,110);
    for(const pipe of w.obstacles) {
      ctx.fillStyle='#273867';ctx.fillRect(pipe.x,0,48,pipe.y-78);ctx.fillRect(pipe.x,pipe.y+78,48,480);
      ctx.fillStyle='#a78bfa';ctx.fillRect(pipe.x-3,pipe.y-88,54,10);ctx.fillRect(pipe.x-3,pipe.y+78,54,10);
      ctx.fillStyle='#4c5c8a';ctx.fillRect(pipe.x+7,0,4,pipe.y-88);ctx.fillRect(pipe.x+7,pipe.y+88,4,480);
    }
    ctx.save();ctx.translate(94,w.y);ctx.rotate(Math.max(-.4,Math.min(.7,w.velocity/650)));
    ctx.shadowColor='#facc15';ctx.shadowBlur=18;ctx.fillStyle='#facc15';ctx.beginPath();ctx.ellipse(0,0,14,11,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle='#fb923c';ctx.fillRect(11,-1,9,5);ctx.fillStyle='#fff';ctx.fillRect(4,-6,6,6);ctx.fillStyle='#14172b';ctx.fillRect(7,-4,3,3);
    ctx.fillStyle='#eab308';ctx.beginPath();ctx.ellipse(-7,3,8,5,-.4,0,Math.PI*2);ctx.fill();ctx.restore();
    ctx.fillStyle='#1e3355';ctx.fillRect(0,467,360,13);ctx.fillStyle='#67e8f9';ctx.fillRect(0,467,360,2);
  } else {
    for(const brick of w.bricks) if(brick.alive) {
      ctx.shadowColor=colors[brick.color];ctx.shadowBlur=5;ctx.fillStyle=colors[brick.color];ctx.fillRect(brick.x,brick.y,50,18);ctx.shadowBlur=0;
      ctx.fillStyle='#ffffff38';ctx.fillRect(brick.x+2,brick.y+2,46,3);
    }
    ctx.shadowBlur=17;ctx.shadowColor='#67e8f9';ctx.fillStyle='#67e8f9';ctx.fillRect(w.player-42,429,84,10);
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(w.ball.x,w.ball.y,7,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  }
}
export default function NeonArcade({ mode }: {mode:ArcadeMode}) {
  const world=useRef(createWorld(mode));
  const canvas=useRef<HTMLCanvasElement>(null);
  const [phase,setPhase]=useState<'idle'|'playing'|'paused'|'over'>('idle');
  const [score,setScore]=useState(0);
  const [lives,setLives]=useState(3);
  const [best,setBest]=useState(0);
  const held=useRef(0);
  const active=useRef(false);
  const phaseRef=useRef(phase);phaseRef.current=phase;
  useEffect(()=>{
    try {setBest(Number(localStorage.getItem(`jj-arcade-${mode}`))||0);} catch {}
  },[mode]);
  useEffect(()=>{
    const element=canvas.current; if(!element) return;
    const ctx=element.getContext('2d');if(!ctx)return;
    const ratio=Math.min(window.devicePixelRatio||1,2);
    element.width=360*ratio;element.height=480*ratio;ctx.scale(ratio,ratio);
    let frame=0,last=0;
    const animate=(now:number)=>{
      if(phaseRef.current==='playing') {
        const dt=last?Math.min((now-last)/1000,1/30):0;
        if(mode==='breaker'&&held.current) steer(world.current,world.current.player+held.current*320*dt);
        stepWorld(world.current,dt);
        setScore(old=>old===world.current.score?old:world.current.score);
        setLives(old=>old===world.current.lives?old:world.current.lives);
        if(world.current.over) {
          active.current=false;setPhase('over');
          setBest(previous=>{
            const value=Math.max(previous,world.current.score);
            try {localStorage.setItem(`jj-arcade-${mode}`,String(value));} catch {}
            return value;
          });
        }
      }
      last=now;paint(ctx,world.current);
      frame=requestAnimationFrame(animate);
    };
    frame=requestAnimationFrame(animate);
    const hide=()=>{if(document.hidden&&phaseRef.current==='playing'){active.current=false;held.current=0;setPhase('paused');}};
    document.addEventListener('visibilitychange',hide);
    return ()=>{cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',hide);};
  },[mode]);
  const start=()=>{world.current=createWorld(mode);setScore(0);setLives(3);held.current=0;active.current=true;setPhase('playing');canvas.current?.focus();};
  const pause=()=>{active.current=false;held.current=0;setPhase('paused');};
  const resume=()=>{active.current=true;setPhase('playing');canvas.current?.focus();};
  const move=(amount:number)=>{if(!active.current)return;steer(world.current,world.current.player+amount*(mode==='race'?1:28));};
  const tap=()=>{if(active.current&&mode==='flight')flap(world.current);};
  const help=mode==='race'?'Change de voie pour éviter les voitures. Flèches ou boutons tactiles.':mode==='flight'?'Appuie sur le terrain ou sur Espace pour voler. Passe entre les colonnes.':'Glisse sur le terrain pour déplacer la raquette. Les flèches fonctionnent aussi.';
  return <div className={`neon-game neon-${mode}`}>
    <div className="neon-scoreboard"><span>Score<strong>{score.toString().padStart(3,'0')}</strong></span><span><Trophy size={13}/> Record<strong>{best}</strong></span>{mode==='breaker'&&<span>Vies<strong>{lives}</strong></span>}</div>
    <div className="neon-screen">
      <canvas ref={canvas} tabIndex={0} aria-label={`${mode==='race'?'Course':mode==='flight'?'Vol':'Casse-briques'}. ${help}`} onBlur={()=>{held.current=0;}}
        onKeyDown={event=>{
          if(['ArrowLeft','ArrowRight',' ','ArrowUp'].includes(event.key))event.preventDefault();
          if(!active.current)return;
          if(mode==='flight'&&(event.key===' '||event.key==='ArrowUp'))tap();
          if(event.key==='ArrowLeft'||event.key==='ArrowRight') {
            const direction=event.key==='ArrowLeft'?-1:1;
            if(mode==='race'&&!event.repeat)move(direction);else if(mode==='breaker')held.current=direction;
          }
          if(event.key.toLowerCase()==='p')pause();
        }} onKeyUp={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight')held.current=0;}}
        onPointerDown={event=>{
          if(!active.current)return;
          event.currentTarget.focus();event.currentTarget.setPointerCapture(event.pointerId);
          if(mode==='flight')tap();
          else {const rect=event.currentTarget.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width*360;steer(world.current,mode==='race'?Math.max(0,Math.min(2,Math.floor((x-30)/100))):x);}
        }} onPointerMove={event=>{if(mode==='breaker'&&active.current&&(event.buttons||event.pointerType==='mouse')){
          const rect=event.currentTarget.getBoundingClientRect();steer(world.current,(event.clientX-rect.left)/rect.width*360);
        }}} />
      {phase!=='playing'&&<div className="neon-overlay">
        <span className="neon-overline">{phase==='over'?'Partie terminée':phase==='paused'?'Prends ton temps':'Prêt à jouer ?'}</span>
        <h2>{phase==='over'?(world.current.won?'Bien joué !':`${score} points`):phase==='paused'?'Pause.':mode==='race'?'Prends la route.':mode==='flight'?'Prends ton envol.':'Vise les briques.'}</h2>
        <p>{phase==='over'?'Une nouvelle partie pour battre ton record ?':help}</p>
        <button className="neon-start" onClick={phase==='paused'?resume:start}>{phase==='over'?<RotateCcw size={18}/>:<Play size={18}/>} {phase==='paused'?'Reprendre':phase==='over'?'Rejouer':'Jouer'}</button>
      </div>}
    </div>
    <div className="neon-controls">
      {mode!=='flight'?<><button disabled={phase!=='playing'} aria-label="Aller à gauche" onClick={()=>move(-1)}><ArrowLeft size={22}/></button><button disabled={phase!=='playing'} aria-label="Aller à droite" onClick={()=>move(1)}><ArrowRight size={22}/></button></>:<button disabled={phase!=='playing'} onClick={tap}>Battre des ailes ↑</button>}
      <button disabled={phase!=='playing'&&phase!=='paused'} onClick={phase==='paused'?resume:pause} aria-label={phase==='paused'?'Reprendre':'Pause'}>{phase==='paused'?<Play size={19}/>:<Pause size={19}/>}</button>
    </div>
    <p className="neon-help" role="status">{phase==='over'?`Partie terminée. Score : ${score}.`:help}</p>
  </div>;
}
