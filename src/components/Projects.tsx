import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Folder, Sparkles, Eye } from 'lucide-react';
import ProjectModal from './ProjectModal';

const projects = [
  {
    title: 'Projet WiSafe',
    description: 'Mise en place d\'un Hotspot Wi-Fi sécurisé avec portail captif sur Raspberry Pi. Configuration complète de la sécurité réseau, authentification des utilisateurs et monitoring.',
    tags: ['Réseaux', 'Sécurité', 'HTML/CSS', 'JavaScript', 'BASH', 'Raspberry Pi'],
    image: '📡',
    imageUrl: import.meta.env.BASE_URL + projet-wisafe.png',
    gradient: 'from-emerald-600 to-green-600',
    category: 'Sécurité',
    link: '#',
    details: {
      context: 'Projet académique visant à créer une solution de hotspot Wi-Fi sécurisé pour des espaces publics. L\'objectif était de fournir un accès internet tout en garantissant la sécurité des utilisateurs et du réseau.',
      challenges: [
        'Configurer un portail captif sécurisé sur Raspberry Pi',
        'Implémenter un système d\'authentification robuste',
        'Assurer la isolation des utilisateurs sur le réseau',
        'Mettre en place un monitoring en temps réel',
      ],
      solutions: [
        'Installation et configuration de RaspAP sur Raspberry Pi',
        'Développement d\'un portail captif personnalisé avec HTML/CSS/JavaScript',
        'Configuration de VLANs pour isoler les utilisateurs',
        'Scripts BASH pour l\'automatisation et le monitoring',
        'Mise en place de règles iptables pour la sécurité',
      ],
      results: [
        'Hotspot Wi-Fi fonctionnel et sécurisé',
        'Portail captif personnalisé et intuitif',
        'Isolation complète des utilisateurs',
        'Système de monitoring opérationnel',
        'Documentation technique complète',
      ],
      duration: '3 mois',
      role: 'Développeur & Admin Réseau',
    },
  },
  {
    title: 'Stage - Assistant Chef de Projet',
    description: 'Développement d\'applications web et mobile pour divers clients. Gestion de projet agile, contact direct avec les clients et livraison de solutions sur mesure.',
    tags: ['React.js', 'Node.js', 'PHP', 'SQL', 'Gestion de Projet', 'Agile'],
    image: '💼',
    imageUrl: import.meta.env.BASE_URL + 'image/stage-assistant.png',
    gradient: 'from-cyan-600 to-blue-600',
    category: 'Développement',
    link: '#',
    details: {
      context: 'Stage de fin d\'études en tant qu\'Assistant Chef de Projet et Développeur Freelance. Mission principale : développer des applications web et mobile pour divers clients tout en gérant la relation client.',
      challenges: [
        'Gérer plusieurs projets simultanément avec des deadlines serrées',
        'Adapter les solutions techniques aux besoins spécifiques de chaque client',
        'Maintenir une communication efficace avec les clients non-techniques',
        'Assurer la qualité du code et la maintenabilité des applications',
      ],
      solutions: [
        'Méthodologie Agile avec sprints de 2 semaines',
        'Développement full-stack avec React.js et Node.js',
        'Utilisation de PHP pour les backends legacy',
        'Bases de données SQL optimisées pour chaque cas d\'usage',
        'Outils de gestion de projet (Trello, Slack)',
      ],
      results: [
        '3 applications web livrées avec succès',
        '1 application mobile développée',
        'Clients satisfaits et relations maintenues',
        'Compétences en gestion de projet renforcées',
        'Expérience client directe acquise',
      ],
      duration: '4 mois (Déc. 2023 - Mars 2024)',
      role: 'Assistant Chef de Projet & Développeur',
    },
  },
  {
    title: 'Stage - Technicien Informatique',
    description: 'Maintenance et dépannage de parcs informatiques, installation et configuration de postes de travail, support utilisateur niveau 1 et 2, gestion du matériel informatique.',
    tags: ['Maintenance', 'Support', 'Windows', 'Hardware', 'Réseaux', 'Active Directory'],
    image: '🔧',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop', // Image de maintenance informatique
    gradient: 'from-violet-600 to-purple-600',
    category: 'Support',
    place: 'GC Maintenance Informatique, Paris',
    link: '#',
    details: {
      context: 'Stage chez GC Maintenance Informatique à Paris. Mission : assurer la maintenance et le support technique de parcs informatiques pour plusieurs entreprises clientes.',
      challenges: [
        'Diagnostiquer et résoudre rapidement les problèmes matériels et logiciels',
        'Gérer un parc informatique hétérogène (différents OS, configurations)',
        'Assurer un support utilisateur efficace et pédagogue',
        'Maintenir la sécurité des systèmes et des données',
      ],
      solutions: [
        'Installation et configuration de postes de travail Windows',
        'Gestion d\'Active Directory pour les comptes utilisateurs',
        'Maintenance préventive et corrective du matériel',
        'Support niveau 1 et 2 via ticketing et à distance',
        'Documentation des procédures et solutions',
      ],
      results: [
        'Parc informatique maintenu opérationnel',
        'Temps de résolution des incidents réduit',
        'Utilisateurs formés et autonomes',
        'Systèmes sécurisés et à jour',
        'Documentation complète créée',
      ],
      duration: 'Stage',
      role: 'Technicien Informatique',
    },
  },
  {
    title: 'Graphiste Freelance',
    description: 'Création d\'identités visuelles complètes pour des particuliers et petites entreprises. Logos, affiches, supports de communication et chartes graphiques.',
    tags: ['Photoshop', 'Illustrator', 'Canva', 'Identité visuelle', 'Design'],
    image: '🎨',
    imageUrl: import.meta.env.BASE_URL + graphiste-freelance.png',
    gradient: 'from-pink-600 to-rose-600',
    category: 'Design',
    link: '#',
    details: {
      context: 'Activité freelance en graphisme pour des particuliers et petites entreprises. Mission : créer des identités visuelles complètes et des supports de communication professionnels.',
      challenges: [
        'Comprendre et traduire la vision des clients en design',
        'Créer des identités visuelles cohérentes et mémorables',
        'Adapter les designs à différents supports (print, web, réseaux sociaux)',
        'Respecter les budgets et délais des clients',
      ],
      solutions: [
        'Utilisation de Photoshop et Illustrator pour les créations vectorielles',
        'Canva pour les designs rapides et les templates',
        'Création de chartes graphiques complètes (couleurs, typographies, logos)',
        'Déclinaison des identités sur tous les supports nécessaires',
        'Processus de validation itératif avec les clients',
      ],
      results: [
        '5+ identités visuelles créées',
        'Clients satisfaits et récurrents',
        'Supports de communication professionnels livrés',
        'Portfolio de design enrichi',
        'Compétences en design graphique développées',
      ],
      duration: 'Freelance',
      role: 'Graphiste Freelance',
    },
  },
];

const filters = ['Tous', 'Sécurité', 'Développement', 'Support', 'Design'];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = activeFilter === 'Tous'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="realisations" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm uppercase tracking-wider"
          >
            <Sparkles size={14} />
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Mes Réalisations
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '5rem' } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700/50 hover:border-gray-600'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl bg-gray-900/50 border border-gray-800/50 overflow-hidden hover:border-emerald-500/30 transition-all duration-300"
            >
              {/* Project Image Area */}
              <div className={`h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                {project.imageUrl ? (
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.4 }}
                  />
                ) : (
                  <motion.span
                    className="text-7xl relative z-10"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {project.image}
                  </motion.span>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                
                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openModal(project)}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                  >
                    <Eye size={20} />
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    href={project.link}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </motion.div>

                {/* Category badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-black/30 backdrop-blur-sm text-white text-xs font-medium border border-white/10"
                >
                  {project.category}
                </motion.div>

                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  initial={{ y: '100%' }}
                  whileHover={{ y: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Folder size={16} className="text-emerald-400" />
                  <h3 className="text-lg font-semibold group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                {project.place && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-cyan-400/80 mb-2 font-mono"
                  >
                    {project.place}
                  </motion.p>
                )}
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* View details button */}
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(project)}
                  className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium mb-4 group/btn"
                >
                  <Eye size={16} />
                  Voir les détails
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>

                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + tagIndex * 0.05, type: 'spring' }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-gray-800/80 text-gray-400 border border-gray-700/50 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-gray-800/80 text-gray-500 border border-gray-700/50">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
    </section>
  );
}
