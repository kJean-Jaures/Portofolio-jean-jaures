import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download, Shield, Terminal, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function TypeWriter({ texts, speed = 100 }: { texts: string[]; speed?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed]);

  return (
    <span className="gradient-text font-bold">
      {displayText}
      <span className="animate-pulse text-emerald-400">|</span>
    </span>
  );
}

function MorphingBlob() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-20"
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3))',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}

function FloatingIcons() {
  const icons = [
    { Icon: Shield, x: '10%', y: '20%', delay: 0 },
    { Icon: Terminal, x: '85%', y: '30%', delay: 1 },
    { Icon: Github, x: '15%', y: '75%', delay: 2 },
    { Icon: Mail, x: '80%', y: '70%', delay: 3 },
  ];

  return (
    <>
      {icons.map(({ Icon, x, y, delay }, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            delay: delay,
            ease: 'easeInOut',
          }}
        >
          <div className="p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 backdrop-blur-sm">
            <Icon size={20} className="text-emerald-400/50" />
          </div>
        </motion.div>
      ))}
    </>
  );
}

function ParallaxSection() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"
        style={{ y: scrollY * 0.3 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl"
        style={{ y: scrollY * -0.2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl"
        style={{ y: scrollY * 0.15 }}
      />
    </div>
  );
}

export default function Hero() {
  const roles = [
    'Étudiant en Cybersécurité',
    'Développeur Full Stack',
    'Admin Systèmes & Réseaux',
    'Passionné de Sécurité',
    'Pentester en Herbe',
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <ParallaxSection />
      
      {/* Morphing Blob */}
      <MorphingBlob />

      {/* Floating Icons */}
      <FloatingIcons />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent animate-scan" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Status Badge */}
        <motion.div variants={item} className="mb-8">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-all cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Disponible pour alternance — Bachelor 3 Cybersécurité
          </motion.span>
        </motion.div>

        {/* Photo with animated border */}
        <motion.div variants={item} className="mb-10 relative">
          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto relative">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 blur-2xl animate-pulse" />
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #10b981, #06b6d4, #8b5cf6, #10b981)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            {/* Background that changes with theme */}
            <div className="absolute inset-[4px] rounded-full bg-white dark:bg-[#0a0e17] transition-colors duration-500" />
            
            {/* Photo - displayed in full */}
            <div className="absolute inset-[8px] rounded-full overflow-hidden shadow-2xl flex items-center justify-center">
              <img
                src="public/image/photo-profil.png"
                alt="Jean-Jaures KOUASSI"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-pulse-ring" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
        >
          <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            KOUASSI Kouamé
          </span>
          <motion.span
            className="block gradient-text mt-2"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Jean-Jaures
          </motion.span>
        </motion.h1>

        {/* Typing Effect */}
        <motion.div
          variants={item}
          className="text-xl md:text-2xl font-mono mb-6 h-8"
        >
          <span className="text-gray-500">&gt; </span>
          <TypeWriter texts={roles} speed={80} />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Passionné par la <span className="text-emerald-400 font-medium">sécurité informatique</span> et le <span className="text-cyan-400 font-medium">développement</span>. 
          Je protège les systèmes tout en construisant des solutions innovantes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <motion.a
            href="#realisations"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold overflow-hidden hover-lift"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Shield size={18} />
              Mes réalisations
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          <motion.a
            href="public/documents/CV-Jean-Jaures-KOUASSI.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-all flex items-center gap-2 backdrop-blur-sm bg-gray-900/30 hover:bg-emerald-500/5"
          >
            <Download size={18} /> Télécharger mon CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={item} className="flex items-center justify-center gap-5">
          {[
            { icon: Github, href: 'https://github.com/kjean-jaures', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#contact', label: 'Email' },
            { icon: Terminal, href: '#apropos', label: 'Terminal' },
          ].map(({ icon: Icon, href, label }, index) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ scale: 1.2, y: -5, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/20"
              aria-label={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {['React', 'Node.js', 'Linux', 'pfSense', 'Python', 'SQL', 'Docker'].map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-gray-800/50 border border-gray-700/30 text-gray-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs font-mono">scroll</span>
          <ArrowDown size={20} className="text-emerald-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
