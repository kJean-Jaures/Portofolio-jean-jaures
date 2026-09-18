import { motion } from 'framer-motion';
import { Github, Linkedin, Heart, Shield, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/kjean-jaures', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative py-12 border-t border-gray-800/50">
      {/* Animated gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ backgroundSize: '200% 200%' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <motion.a
              href="#accueil"
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold gradient-text flex items-center gap-2 justify-center md:justify-start"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Shield size={20} className="text-emerald-400" />
              </motion.div>
              Jean-Jaures KOUASSI
            </motion.a>
            <p className="text-gray-500 text-sm mt-2 flex items-center gap-1 justify-center md:justify-start">
              © {currentYear} — Fait avec{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} className="text-red-500 fill-red-500" />
              </motion.span>
              {' '}à Paris
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.2, y: -5, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors hover:shadow-lg hover:shadow-emerald-500/20"
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* Back to top */}
          <motion.a
            href="#accueil"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5, scale: 1.1 }}
            className="text-sm text-gray-500 hover:text-emerald-400 transition-colors font-mono flex items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp size={16} />
            </motion.div>
            Retour en haut
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
