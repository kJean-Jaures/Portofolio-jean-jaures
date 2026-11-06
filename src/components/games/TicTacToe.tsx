import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { bestMove, winner, type Mark } from './arcade-engine';

export default function TicTacToe() {
  const [board, setBoard] = useState<Mark[]>(Array(9).fill(null));
  const [mode, setMode] = useState<'solo' | 'duo'>('solo');
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const result = winner(board);
  const thinking = mode === 'solo' && turn === 'O' && !result;
  useEffect(() => {
    if (!thinking) return;
    const timer = setTimeout(() => {
      const index = bestMove(board);
      if (index < 0) return;
      setBoard(previous => previous.map((cell, i) => i === index ? 'O' : cell));
      setTurn('X');
    }, 350);
    return () => clearTimeout(timer);
  }, [board, thinking]);
  const reset = () => { setBoard(Array(9).fill(null)); setTurn('X'); };
  const play = (index: number) => {
    if (board[index] || result || thinking) return;
    setBoard(board.map((cell, i) => i === index ? turn : cell));
    setTurn(turn === 'X' ? 'O' : 'X');
  };
  return <div className="mini-game">
    <div className="game-options" role="group" aria-label="Mode de jeu">
      <button aria-pressed={mode === 'solo'} onClick={() => {setMode('solo'); reset();}}>Solo</button>
      <button aria-pressed={mode === 'duo'} onClick={() => {setMode('duo'); reset();}}>À deux</button>
    </div>
    <p className="game-status" role="status">{result === 'draw' ? 'Match nul !' : result ? `${result} remporte la partie !` : thinking ? 'L’ordinateur réfléchit…' : `Au tour de ${turn}`}</p>
    <div className="morpion-board" role="group" aria-label="Plateau de morpion">
      {board.map((cell, i) => <button key={i} className={cell === 'X' ? 'mark-x' : 'mark-o'} disabled={Boolean(cell || result || thinking)} aria-label={`Case ${i+1} : ${cell || 'vide'}`} onClick={() => play(i)}>{cell}</button>)}
    </div>
    <p className="game-help">{mode === 'solo' ? 'Tu joues les X. Réussiras-tu à tenir tête à l’ordinateur ?' : 'Jouez à tour de rôle sur le même écran.'}</p>
    <button className="button button-primary" onClick={reset}><RotateCcw size={17}/> Nouvelle partie</button>
  </div>;
}
