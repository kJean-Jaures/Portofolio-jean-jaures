import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Parcours from './components/Parcours';
import Skills from './components/Skills';
import Projects from './components/Projects';
import FunZone from './components/FunZone';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import EasterEggs from './components/EasterEggs';
import InteractiveTerminal from './components/InteractiveTerminal';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Open terminal with Ctrl+Shift+T
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        setTerminalOpen(!terminalOpen);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [terminalOpen]);
const [isDesktop, setIsDesktop] = useState(false);

useEffect(() => {
  const mq = window.matchMedia('(pointer: fine)'); // souris = true, tactile = false
  setIsDesktop(mq.matches);
  const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}, []);
  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0a0e17] text-white' : 'bg-white text-gray-900'}`}>
      {/* Custom Cursor */}
     
      
      {/* Easter Eggs */}
      <EasterEggs />
      
      {/* Interactive Terminal */}
      <InteractiveTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Particles background */}
      <ParticlesBackground />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Hero />
        <About />
        <Parcours />
        <Skills />
        <Projects />
        <FunZone />
        <Contact />
      </motion.main>
      <Footer />
    </div>
  );
}
