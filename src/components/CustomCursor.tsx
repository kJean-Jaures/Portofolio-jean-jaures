import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);

useEffect(() => {
  const mq = window.matchMedia('(pointer: fine)'); // vrai seulement si souris
  const update = () => setVisible(mq.matches);
  update();
  mq.addEventListener('change', update);
  return () => mq.removeEventListener('change', update);
}, []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail(prev => [
        ...prev.slice(-10), // Keep last 10 positions
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Clean old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(-8));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    if (!visible) return null;
    <>
      {/* Trail effect */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-emerald-400"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 10),
          y: mousePosition.y - (isHovering ? 20 : 10),
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div
          className={`w-5 h-5 rounded-full border-2 ${
            isHovering ? 'border-cyan-400 bg-cyan-400/20' : 'border-emerald-400 bg-emerald-400/20'
          }`}
          style={{
            boxShadow: isHovering 
              ? '0 0 20px rgba(6, 182, 212, 0.8)' 
              : '0 0 10px rgba(16, 185, 129, 0.5)',
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      >
        <div
          className={`w-10 h-10 rounded-full border ${
            isHovering ? 'border-cyan-400/50' : 'border-emerald-400/30'
          }`}
        />
      </motion.div>
    </>
  );
}
