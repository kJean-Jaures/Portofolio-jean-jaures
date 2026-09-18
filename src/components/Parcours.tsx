import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Award, Sparkles } from 'lucide-react';

const parcours = [
  {
    year: '2020 - 2021',
    title: 'BAC Scientifique',
    place: 'Collège Sebaco',
    description: 'Obtention de mon baccalauréat scientifique, marquant le début de mon orientation vers les domaines techniques et scientifiques.',
    icon: GraduationCap,
    color: 'from-emerald-500 to-green-500',
    type: 'education',
  },
  {
    year: '2022 - 2023',
    title: 'BTS en Informatique',
    place: 'Institut Supérieur Jean Paul 2',
    description: 'Spécialisation en développement d\'applications, où j\'ai acquis des bases solides en algorithmique, programmation et bases de données.',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
    type: 'education',
  },
  {
    year: 'Mars 2025 - Juillet 2025',
    title: 'Administrateur Systèmes & Réseaux Sécurisés',
    place: 'ESIEA, Paris — Bac+2',
    description: 'Année de spécialisation validée avec succès. Approfondissement des compétences en infrastructure, administration réseau sécurisé et cybersécurité.',
    icon: Award,
    color: 'from-orange-500 to-red-500',
    type: 'education',
  },
  {
    year: 'En cours',
    title: 'Bachelor 3 Cybersécurité',
    place: 'ESGI, Paris',
    description: 'Spécialisation en cybersécurité : pentesting, cryptographie, sécurité des systèmes et réseaux, analyse de vulnérabilités et réponse aux incidents.',
    icon: GraduationCap,
    color: 'from-emerald-500 to-cyan-500',
    type: 'education',
    current: true,
  },
];

export default function Parcours() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="parcours" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider"
          >
            <Sparkles size={14} />
            Mon parcours
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Formation & Expérience
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '5rem' } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line with gradient */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-violet-500/50"
          />

          {parcours.map((item, index) => (
            <motion.div
              key={item.title + item.year}
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
                damping: 20
              }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot with pulse */}
              <motion.div 
                className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className={`w-5 h-5 rounded-full bg-gradient-to-r ${item.color} ring-4 ring-[#0a0e17] ${item.current ? 'animate-pulse' : ''}`}
                  />
                  {item.current && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Card */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    rotateY: 5,
                  }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group cursor-pointer backdrop-blur-sm"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Glow on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  
                  {/* Animated border gradient */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))`,
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <div className="relative">
                    {/* Header */}
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center shrink-0 shadow-lg`}
                      >
                        <item.icon size={20} className="text-white" />
                      </motion.div>
                      <div>
                        <span className="text-xs text-gray-500 font-mono">{item.year}</span>
                        {item.current && (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="ml-2 inline-block px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono"
                          >
                            En cours
                          </motion.span>
                        )}
                        {item.type === 'experience' && (
                          <span className="ml-2 inline-block px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                            Expérience
                          </span>
                        )}
                      </div>
                    </motion.div>

                    <motion.h3 
                      className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {item.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-sm text-emerald-400/80 mb-3 font-mono"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      {item.place}
                    </motion.p>
                    
                    <motion.p 
                      className="text-gray-400 text-sm leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
