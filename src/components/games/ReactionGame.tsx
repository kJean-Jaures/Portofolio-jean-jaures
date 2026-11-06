import { useEffect, useRef, useState } from 'react';
import { Timer } from 'lucide-react';
type Phase = 'idle' | 'waiting' | 'ready' | 'early' | 'result';
export default function ReactionGame() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [times, setTimes] = useState<number[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const started = useRef(0);
  const ready = useRef(false);
  const clear = () => { if (timer.current) clearTimeout(timer.current); ready.current = false; };
  useEffect(() => {
    const hide = () => { if (document.hidden) {clear(); setPhase('idle');} };
    document.addEventListener('visibilitychange', hide);
    return () => { clear(); document.removeEventListener('visibilitychange', hide); };
  }, []);
  const play = () => {
    if (ready.current) {
      const elapsed = Math.round(performance.now() - started.current);
      ready.current = false; setTimes(previous => [...previous.slice(-4), elapsed]); setPhase('result');
    } else if (phase === 'waiting') { clear(); setPhase('early'); }
    else {
      setPhase('waiting');
      timer.current = setTimeout(() => { started.current = performance.now(); ready.current = true; setPhase('ready'); }, 1800 + Math.random()*2500);
    }
  };
  const text = {idle:'Prêt à tester tes réflexes ?', waiting:'Patiente…', ready:'À toi !', early:'Trop tôt !', result:`${times[times.length - 1] ?? 0} ms`};
  return <div className="mini-game reaction-game">
    <div className="game-stats"><span>Derniers essais <strong>{times.length}/5</strong></span><span>Meilleur <strong>{times.length ? `${Math.min(...times)} ms` : '—'}</strong></span></div>
    <button className={`reaction-pad reaction-${phase}`} onClick={play}>
      <Timer size={38}/><strong>{text[phase]}</strong>
      <span>{phase === 'ready' ? 'Appuie maintenant' : phase === 'waiting' ? 'Attends le signal vert' : 'Appuie pour commencer'}</span>
    </button>
    <p className="game-help" role="status">{phase === 'early' ? 'Attends que la zone devienne verte avant d’appuyer.' : phase === 'result' ? 'Bien joué ! Recommence pour battre ton temps.' : 'Une seule règle : appuie dès que « À toi ! » apparaît.'}</p>
    {times.length > 0 && <div className="reaction-history" aria-label="Tes cinq derniers essais">{times.map((time,i)=><span key={i}>{time} ms</span>)}</div>}
  </div>;
}
