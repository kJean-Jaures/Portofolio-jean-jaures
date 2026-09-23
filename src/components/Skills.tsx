import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Radar } from 'lucide-react';

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const skillCategories = [
  {
    title: 'Développement',
    icon: '💻',
    color: 'from-emerald-500 to-green-500',
    hover: 'hover:border-emerald-500/40',
    skills: [
      { name: 'HTML5', logo: `${CDN}/html5/html5-original.svg` },
      { name: 'CSS3', logo: `${CDN}/css3/css3-original.svg` },
      { name: 'JavaScript', logo: `${CDN}/javascript/javascript-original.svg` },
      { name: 'TypeScript', logo: `${CDN}/typescript/typescript-original.svg` },
      { name: 'React', logo: `${CDN}/react/react-original.svg` },
      { name: 'Next.js', logo: `${CDN}/nextjs/nextjs-original.svg` },
      { name: 'Node.js', logo: `${CDN}/nodejs/nodejs-original.svg` },
      { name: 'Express', logo: `${CDN}/express/express-original.svg` },
      { name: 'PHP', logo: `${CDN}/php/php-original.svg` },
      { name: 'Python', logo: `${CDN}/python/python-original.svg` },
      { name: 'MySQL', logo: `${CDN}/mysql/mysql-original.svg` },
    ],
  },
  {
    title: 'Cybersécurité & Réseaux',
    icon: '🛡️',
    color: 'from-cyan-500 to-blue-500',
    hover: 'hover:border-cyan-500/40',
    skills: [
      { name: 'Linux', logo: `${CDN}/linux/linux-original.svg` },
      { name: 'Windows Server', logo: `${CDN}/windows8/windows8-original.svg` },
      { name: 'Bash', logo: `${CDN}/bash/bash-original.svg` },
      { name: 'Docker', logo: `${CDN}/docker/docker-original.svg` },
      { name: 'Kubernetes', logo: `${CDN}/kubernetes/kubernetes-plain.svg` },
      { name: 'Nginx', logo: `${CDN}/nginx/nginx-original.svg` },
      { name: 'Apache', logo: `${CDN}/apache/apache-original.svg` },
      { name: 'Wireshark', logo: 'https://cdn.simpleicons.org/wireshark/1679A7' },
      { name: 'Nmap', Icon: Radar, color: '#4CAF50' },
    ],
  },
  {
    title: 'Outils & Monitoring',
    icon: '🔧',
    color: 'from-violet-500 to-purple-500',
    hover: 'hover:border-violet-500/40',
    skills: [
      { name: 'Git', logo: `${CDN}/git/git-original.svg` },
      { name: 'GitHub', logo: `${CDN}/github/github-original.svg` },
      { name: 'VS Code', logo: `${CDN}/vscode/vscode-original.svg` },
      { name: 'Grafana', logo: `${CDN}/grafana/grafana-original.svg` },
      { name: 'Prometheus', logo: `${CDN}/prometheus/prometheus-original.svg` },
      { name: 'Figma', logo: `${CDN}/figma/figma-original.svg` },
      { name: 'Trello', logo: `${CDN}/trello/trello-plain.svg` },
      { name: 'Jira', logo: `${CDN}/jira/jira-plain.svg` },
    ],
  },
];

const certifications = [
  { name: 'Bachelor 3 Cybersécurité', status: 'En cours', color: 'emerald' },
  { name: 'Admin Sys/Réseau Sécurisés', status: 'Validé', color: 'cyan' },
  { name: 'BTS Informatique', status: 'Obtenu', color: 'violet' },
];

const extraTechs = [
  { name: 'Photoshop', logo: `${CDN}/photoshop/photoshop-plain.svg` },
  { name: 'Illustrator', logo: `${CDN}/illustrator/illustrator-plain.svg` },
   { name: 'InDesign', logo: 'https://cdn.simpleicons.org/adobeindesign/FF3366' },
  { name: 'Canva', logo: `${CDN}/canva/canva-original.svg` },
  { name: 'PowerShell', logo: `${CDN}/powershell/powershell-plain.svg` },
];

function SkillRow({ skill, index, isInView, hover }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
      whileHover={{ scale: 1.02, x: 5 }}
      className={`group flex items-center gap-4 p-3 rounded-xl bg-gray-800/40 border border-gray-700/40 ${hover} transition-all cursor-default`}
    >
      {/* Tuile blanche avec le vrai logo */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 6 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-white p-2 shadow-lg shadow-black/30"
      >
        {skill.logo ? (
          <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" loading="lazy" />
        ) : (
          <skill.Icon size={26} color={skill.color} strokeWidth={1.8} />
        )}
      </motion.div>
      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="competences" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3], x: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
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

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              whileHover={{ y: -8 }}
              className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-3xl"
                  >
                    {category.icon}
                  </motion.span>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillRow
                      key={skill.name}
                      skill={skill}
                      index={skillIndex}
                      isInView={isInView}
                      hover={category.hover}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {extraTechs.map((tech, index) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.5 + index * 0.05, type: 'spring' }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-mono bg-gray-800/50 border border-gray-700/30 text-gray-400 hover:text-white hover:border-emerald-500/30 transition-colors cursor-default"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white p-1">
                <img src={tech.logo} alt={tech.name} className="w-full h-full object-contain" loading="lazy" />
              </span>
              {tech.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}