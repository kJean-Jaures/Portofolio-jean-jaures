import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEggs() {
  const [showMatrix, setShowMatrix] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  useEffect(() => {
    let currentProgress = 0;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Konami Code
      if (e.code === konamiCode[currentProgress]) {
        currentProgress++;
        setKonamiProgress(currentProgress);
        
        if (currentProgress === konamiCode.length) {
          setShowSecret(true);
          currentProgress = 0;
          setKonamiProgress(0);
          setTimeout(() => setShowSecret(false), 5000);
        }
      } else {
        currentProgress = 0;
        setKonamiProgress(0);
      }

      // Matrix mode with 'm' key
      if (e.key === 'm' && e.ctrlKey && e.shiftKey) {
        setShowMatrix(!showMatrix);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showMatrix, konamiProgress]);

  // Matrix rain effect
  const MatrixRain = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-emerald-400 font-mono text-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
            }}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="mb-2">
                {chars[Math.floor(Math.random() * chars.length)]}
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Secret message
  const SecretMessage = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div className="bg-gray-900/95 backdrop-blur-xl border-2 border-emerald-500 rounded-2xl p-8 max-w-md text-center shadow-2xl shadow-emerald-500/50">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">
          KONAMI CODE ACTIVATED!
        </h3>
        <p className="text-gray-300 mb-4">
          You found the secret! You're a true hacker! 😄
        </p>
        <p className="text-sm text-gray-500">
          PS: Try Ctrl+Shift+M for another surprise...
        </p>
      </div>
    </motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {showMatrix && <MatrixRain key="matrix" />}
        {showSecret && <SecretMessage key="secret" />}
      </AnimatePresence>
    </>
  );
}
