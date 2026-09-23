import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Gamepad2, Play, ArrowLeft } from 'lucide-react';
import TetrisGame from './games/TetrisGame';
import MemoryGame from './games/MemoryGame';
import CyberQuiz from './games/CyberQuiz';

const games = [
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'Le classique jeu de puzzle ! Empile les pièces et complète les lignes.',
    icon: '🎮',
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Moyen',
  },
  {
    id: 'memory',
    name: 'Memory Game',
    description: 'Teste ta mémoire en retrouvant les paires de cartes identiques.',
    icon: '🧠',
    color: 'from-pink-500 to-rose-500',
    difficulty: 'Facile',
  },
  {
    id: 'quiz',
    name: 'Quiz Informatique',
    description: 'Teste tes connaissances en informatique avec ce quiz interactif.',
    icon: '💻',
    color: 'from-violet-500 to-purple-500',
    difficulty: 'Moyen',
  },
];

export default function FunZone() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const renderGame = () => {
    switch (selectedGame) {
      case 'tetris':
        return <TetrisGame />;
      case 'memory':
        return <MemoryGame />;
      case 'quiz':
        return <CyberQuiz />;
      default:
        return null;
    }
  };

  return (
    <section id="funzone" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-orange-400 font-mono text-sm uppercase tracking-wider"
          >
            <Gamepad2 size={14} />
            Fun Zone
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Pause <span className="gradient-text">Ludique</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '5rem' } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"
          />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Choisis un jeu et amuse-toi !
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedGame ? (
            // Game Selection Menu
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedGame(game.id)}
                  className="group cursor-pointer p-8 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-orange-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-6xl mb-6 text-center"
                    >
                      {game.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3 text-center group-hover:text-orange-400 transition-colors">
                      {game.name}
                    </h3>

                    <p className="text-gray-400 text-sm text-center mb-6 leading-relaxed">
                      {game.description}
                    </p>

                    <div className="flex justify-center mb-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        game.difficulty === 'Facile'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : game.difficulty === 'Moyen'
                          ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {game.difficulty}
                      </span>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all"
                    >
                      <Play size={18} />
                      Jouer
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Selected Game
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: -5 }}
                onClick={() => setSelectedGame(null)}
                className="mb-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:border-orange-500/50 transition-all"
              >
                <ArrowLeft size={18} />
                Retour au menu
              </motion.button>

              <div className="flex justify-center">
                {renderGame()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}