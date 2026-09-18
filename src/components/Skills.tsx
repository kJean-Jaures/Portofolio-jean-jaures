import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';

const skillCategories = [
  {
    title: 'Développement',
    icon: '💻',
    color: 'from-emerald-500 to-green-500',
    skills: [
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'JavaScript / TypeScript', level: 85 },
      { name: 'React / Next.js', level: 82 },
      { name: 'Node.js / Express', level: 78 },
      { name: 'PHP', level: 75 },
      { name: 'Python', level: 70 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    title: 'Cybersécurité & Réseaux',
    icon: '🛡️',
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'Linux (Admin)', level: 88 },
      { name: 'Windows Server', level: 78 },
      { name: 'Réseaux (TCP/IP)', level: 90 },
      { name: 'pfSense / Firewall', level: 85 },
      { name: 'Sécurité offensive', level: 72 },
      { name: 'Cryptographie', level: 75 },
      { name: 'Virtualisation', level: 78 },
    ],
  },
  {
    title: 'Outils & Monitoring',
    icon: '🔧',
    color: 'from-violet-500 to-purple-500',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'Zabbix / Grafana', level: 75 },
      { name: 'Bash Scripting', level: 78 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 72 },
      { name: 'Trello / Jira', level: 85 },
    ],
  },
];

const certifications = [
  { name: 'Bachelor 3 Cybersécurité', status: 'En cours', color: 'emerald' },
  { name: 'Admin Sys/Réseau Sécurisés', status: 'Validé', color: 'cyan' },
  { name: 'BTS Informatique', status: 'Obtenu', color: 'violet' },
];

function SkillBar({ skill, index, isInView, color }: { skill: { name: string; level: number }; index: number; isInView: boolean; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
        <motion.span
          className="text-xs text-gray-500 font-mono"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-gray-800 overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color} relative overflow-hidden`}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="competences" className="py-24 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
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
            className="inline-flex items-center gap-2 text-violet-400 font-mono text-sm uppercase tracking-wider"
          >
            <Sparkles size={14} />
            Compétences
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Arsenal Technique
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '5rem' } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-400 mt-6 max-w-2xl mx-auto"
          >
            Un ensemble de compétences en développement, cybersécurité et administration systèmes pour répondre aux défis IT modernes.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <motion.span
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-3xl"
                  >
                    {category.icon}
                  </motion.span>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={skillIndex}
                      isInView={isInView}
                      color={category.color}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Certifications & <span className="gradient-text">Diplômes</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5, rotateY: 5 }}
                className="p-5 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-emerald-500/30 transition-all text-center cursor-pointer relative overflow-hidden"
              >
                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="relative">
                  <div className={`text-sm font-semibold mb-2 ${
                    cert.color === 'emerald' ? 'text-emerald-400' :
                    cert.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                  }`}>
                    {cert.name}
                  </div>
                  <motion.div
                    animate={cert.status === 'En cours' ? { opacity: [1, 0.5, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`text-xs font-mono px-3 py-1 rounded-full inline-block ${
                      cert.status === 'En cours' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-gray-800/50 text-gray-400 border border-gray-700/50'
                    }`}
                  >
                    {cert.status}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {['Photoshop', 'Illustrator', 'InDesign', 'Canva', 'MS Office', 'Bash', 'PowerShell', 'Wireshark', 'Nmap'].map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.5 + index * 0.05, type: 'spring' }}
              whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
              className="px-4 py-2 rounded-lg text-sm font-mono bg-gray-800/50 border border-gray-700/30 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
