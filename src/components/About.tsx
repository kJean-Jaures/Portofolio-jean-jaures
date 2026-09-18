import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Code2, Shield, Network, Lock, Sparkles } from 'lucide-react';

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

function GlitchText({ text }: { text: string }) {
  return (
    <motion.span
      className="relative inline-block"
      whileHover={{ scale: 1.05 }}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 text-cyan-400 opacity-0"
        animate={{
          opacity: [0, 0.5, 0],
          x: [0, -2, 2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: Code2,
      title: 'Développement',
      description: 'Création d\'applications web et mobile sécurisées avec React, Node.js, PHP et plus encore.',
      color: 'from-emerald-500 to-green-500',
      stats: '10+ projets',
    },
    {
      icon: Shield,
      title: 'Cybersécurité',
      description: 'Audit de sécurité, pentesting, mise en place de firewalls et protection d\'infrastructures.',
      color: 'from-cyan-500 to-blue-500',
      stats: 'Bachelor 3',
    },
    {
      icon: Network,
      title: 'Systèmes & Réseaux',
      description: 'Administration Linux/Windows, virtualisation, monitoring avec Zabbix et Grafana.',
      color: 'from-violet-500 to-purple-500',
      stats: 'ESIEA certifié',
    },
  ];

  const terminalLines = [
    { prompt: '~', command: 'whoami', output: 'jean-jaures.kouassi' },
    { prompt: '~', command: 'cat profil.txt', output: 'Étudiant Bachelor 3 Cybersécurité @ ESGI Paris' },
    { prompt: '~', command: 'cat compétences.txt', output: 'Dev Full Stack | Admin Sys/Réseau | Sécurité' },
    { prompt: '~', command: 'echo $OBJECTIF', output: 'Alternance en cybersécurité' },
    { prompt: '~', command: 'ls -la /passions', output: 'drwxr-xr-x  sécurité  développement  innovation' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="apropos" className="py-24 md:py-32 relative">
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
            className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm uppercase tracking-wider"
          >
            <Sparkles size={14} />
            À propos
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Qui suis-je<span className="text-emerald-400">?</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '5rem' } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Photo + Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative space-y-6"
          >
            {/* Photo - displayed in full */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-sm mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10 border-2 border-emerald-500/20">
                <img
                  src={`${import.meta.env.BASE_URL}image/photo-profil.png`}
                  alt="Jean-Jaures KOUASSI"
                  className="w-full h-auto object-contain"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 blur-xl -z-10" />
            </motion.div>

            {/* Terminal */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-gray-900/80 border border-gray-800 overflow-hidden shadow-2xl shadow-emerald-500/5 backdrop-blur-xl"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
                <div className="flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
                  />
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
                  />
                </div>
                <span className="text-xs text-gray-500 font-mono ml-2">~/jean-jaures — zsh</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm space-y-3">
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">{line.prompt}</span>
                      <span className="text-cyan-400">$</span>
                      <motion.span
                        className="text-white"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.2 }}
                      >
                        {line.command}
                      </motion.span>
                    </div>
                    <motion.div
                      className="text-gray-400 ml-4 mt-1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.2 }}
                    >
                      {line.output}
                    </motion.div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.5 }}
                  className="flex items-center gap-2 pt-2"
                >
                  <span className="text-emerald-400">~</span>
                  <span className="text-cyan-400">$</span>
                  <motion.span
                    className="w-2 h-4 bg-emerald-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              animate={{
                y: [-5, 5, -5],
                rotate: [-2, 2, -2],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono backdrop-blur-sm"
            >
              <Lock size={12} className="inline mr-1" />
              Secure
            </motion.div>
          </motion.div>
          

          {/* Right - Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.h3
              variants={item}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              Un profil <GlitchText text="polyvalent" /> : Dev & Cybersécurité
            </motion.h3>
            <motion.p
              variants={item}
              className="text-gray-400 leading-relaxed mb-6"
            >
              Passionné par la <span className="text-emerald-400 font-medium">sécurité informatique</span> et la <span className="text-cyan-400 font-medium">résolution de problèmes complexes</span>. Mon parcours m'a permis de développer une grande autonomie et une forte capacité d'adaptation.
            </motion.p>
            <motion.p
              variants={item}
              className="text-gray-400 leading-relaxed mb-8"
            >
              Actuellement en <span className="text-violet-400 font-medium">Bachelor 3 Cybersécurité à l'ESGI Paris</span>, je suis à la recherche d'une <span className="text-emerald-400 font-medium">alternance</span> pour mettre mes compétences au service d'une entreprise innovante.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 3, suffix: '', label: 'Années d\'études', display: 'Bac+3' },
                { value: 4, suffix: '+', label: 'Expériences pro', display: '4+' },
                { value: 15, suffix: '+', label: 'Technologies', display: '15+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-emerald-500/30 transition-all cursor-default"
                >
                  <div className="text-2xl font-bold gradient-text">
                    {stat.display}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlights Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Animated border gradient */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
                  opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
              />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <item.icon size={24} className="text-white" />
                  </motion.div>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="text-xs font-mono text-gray-500 bg-gray-800/50 px-2 py-1 rounded"
                  >
                    {item.stats}
                  </motion.span>
                </div>
                <h4 className="text-lg font-semibold mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
