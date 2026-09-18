import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, MapPin, Tag, CheckCircle, ArrowRight, Code2, Target, Lightbulb, Trophy } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    tags: string[];
    image: string;
    imageUrl?: string | null;
    gradient: string;
    category: string;
    place?: string;
    link: string;
    details?: {
      context: string;
      challenges: string[];
      solutions: string[];
      results: string[];
      duration: string;
      role: string;
    };
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
        >
          {/* Modal */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-hidden rounded-2xl bg-[#0a0e17] border border-gray-800/50 shadow-2xl shadow-emerald-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-gray-800/80 border border-gray-700/50 text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all backdrop-blur-sm"
            >
              <X size={20} />
            </motion.button>

            {/* Content */}
            <div className="h-full overflow-y-auto">
              {/* Hero Image */}
              <div className={`relative h-48 md:h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                {project.imageUrl ? (
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                    className="text-8xl md:text-9xl"
                  >
                    {project.image}
                  </motion.span>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />

                {/* Category badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-sm text-white text-xs font-medium border border-white/10"
                >
                  {project.category}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10 max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                    {project.title}
                  </h2>
                  
                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                    {project.place && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <MapPin size={14} className="text-emerald-400" />
                        {project.place}
                      </motion.div>
                    )}
                    {project.details?.duration && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                        className="flex items-center gap-2"
                      >
                        <Calendar size={14} className="text-cyan-400" />
                        {project.details.duration}
                      </motion.div>
                    )}
                    {project.details?.role && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-2"
                      >
                        <Tag size={14} className="text-violet-400" />
                        {project.details.role}
                      </motion.div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>

                {/* Details sections */}
                {project.details && (
                  <div className="space-y-8">
                    {/* Context */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                          <Target size={20} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Contexte & Objectifs</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed pl-13">
                        {project.details.context}
                      </p>
                    </motion.div>

                    {/* Challenges */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                          <Lightbulb size={20} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Défis relevés</h3>
                      </div>
                      <ul className="space-y-3 pl-13">
                        {project.details.challenges.map((challenge, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.55 + index * 0.1 }}
                            className="flex items-start gap-3 text-gray-400"
                          >
                            <ArrowRight size={16} className="text-orange-400 mt-1 shrink-0" />
                            <span>{challenge}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                          <Code2 size={20} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Solutions implémentées</h3>
                      </div>
                      <ul className="space-y-3 pl-13">
                        {project.details.solutions.map((solution, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.65 + index * 0.1 }}
                            className="flex items-start gap-3 text-gray-400"
                          >
                            <CheckCircle size={16} className="text-cyan-400 mt-1 shrink-0" />
                            <span>{solution}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Results */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                          <Trophy size={20} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Résultats obtenus</h3>
                      </div>
                      <ul className="space-y-3 pl-13">
                        {project.details.results.map((result, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.75 + index * 0.1 }}
                            className="flex items-start gap-3 text-gray-400"
                          >
                            <Trophy size={16} className="text-violet-400 mt-1 shrink-0" />
                            <span>{result}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                )}

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-10"
                >
                  <h3 className="text-xl font-bold mb-4">Technologies utilisées</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.85 + index * 0.05, type: 'spring' }}
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="px-4 py-2 rounded-lg text-sm font-mono bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-10 flex flex-col sm:flex-row gap-4"
                >
                  <motion.a
                    href={project.link}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
                  >
                    <ExternalLink size={18} />
                    Voir le projet
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-all"
                  >
                    Fermer
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
