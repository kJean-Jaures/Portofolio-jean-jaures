import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

const EMOJIS = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺', '🎻'];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].flipped || cards[id].matched) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          setFlippedCards([]);

          if (matchedCards.every(card => card.matched)) {
            setGameWon(true);
            if (!bestScore || moves + 1 < bestScore) {
              setBestScore(moves + 1);
            }
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
          <span className="text-2xl">🧠</span>
        </div>
        <h3 className="text-2xl font-bold">Memory Game</h3>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Coups</p>
          <p className="text-2xl font-bold text-pink-400">{moves}</p>
        </div>
        {bestScore && (
          <div className="text-right">
            <p className="text-sm text-gray-400">Meilleur</p>
            <p className="text-2xl font-bold text-emerald-400">{bestScore}</p>
          </div>
        )}
      </div>

      {!gameWon ? (
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: card.flipped || card.matched ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all ${
                card.flipped || card.matched
                  ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-2 border-pink-500/50 shadow-lg shadow-pink-500/20'
                  : 'bg-gray-800/50 border-2 border-gray-700/50 hover:border-pink-500/30'
              }`}
            >
              {card.flipped || card.matched ? card.emoji : '?'}
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 10 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h4 className="text-2xl font-bold mb-2">Bravo !</h4>
          <p className="text-gray-400 mb-6">Terminé en {moves} coups</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={initializeGame}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold flex items-center gap-2 mx-auto shadow-lg shadow-pink-500/20"
          >
            <RotateCcw size={18} />
            Rejouer
          </motion.button>
        </div>
      )}
    </div>
  );
}
