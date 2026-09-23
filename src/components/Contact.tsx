import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, MapPin, Mail, Phone, Github, Linkedin, Terminal, Sparkles } from 'lucide-react';

const FORM_EMAIL = 'kouassijaures605@gmail.com';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);
      formData.append('_subject', `Nouveau message de ${formState.name} - Portfolio`);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      const response = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      const result = await response.json();

      if (result.success === 'true' || result.success) {
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError("Erreur lors de l'envoi. Essayez directement via email.");
      }
    } catch (err) {
      setError("Erreur lors de l'envoi. Essayez directement via email.");
      console.error('FormSubmit error:', err);
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: FORM_EMAIL, href: `mailto:${FORM_EMAIL}` },
    { icon: Phone, label: 'Téléphone', value: '+33 6 XX XX XX XX', href: 'tel:+33605585469' },
    { icon: MapPin, label: 'Localisation', value: 'Paris, France', href: '#' },
    { icon: Github, label: 'GitHub', value: '@kjean-jaures', href: 'https://github.com/kjean-jaures' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Jean-Jaures KOUASSI', href: 'https://www.linkedin.com/in/k-kouassi' },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={sectionRef}>
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
            className="inline-flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider"
          >
            <Sparkles size={14} />
            Contact
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Contactez-moi
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
            className="text-gray-500 dark:text-gray-400 mt-6 max-w-xl mx-auto"
          >
            Un projet, une question ou une opportunité d'alternance ? Je suis à votre écoute.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Établissons une <span className="gradient-text">connexion</span>
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Je suis à la recherche d'une <span className="text-emerald-500 dark:text-emerald-400 font-medium">alternance en cybersécurité</span> et toujours ouvert aux nouvelles opportunités. 
                Que ce soit pour un projet, un stage ou simplement pour échanger, n'hésitez pas à me contacter !
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-100/80 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-800/50 hover:border-emerald-500/30 transition-all group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors"
                  >
                    <item.icon size={18} className="text-emerald-500 dark:text-emerald-400" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-mono">{item.label}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-300 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/20 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-emerald-500"
                  />
                  <span className="text-sm text-emerald-500 dark:text-emerald-400 font-semibold">Disponible pour alternance</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Bachelor 3 Cybersécurité — ESGI Paris
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              whileHover={{ scale: 1.01 }}
              className="space-y-5 p-6 md:p-8 rounded-2xl bg-gray-100/80 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-800/50 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              <div className="relative">
                {/* Terminal-style header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-300 dark:border-gray-800/50">
                  <Terminal size={16} className="text-emerald-500 dark:text-emerald-400" />
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400">~/contact — send_message.sh</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 font-mono">
                      <span className="text-emerald-500 dark:text-emerald-400">$</span> nom
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Votre nom"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 font-mono">
                      <span className="text-emerald-500 dark:text-emerald-400">$</span> email
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="Votre Mail"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono"
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="mt-5"
                >
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 font-mono">
                    <span className="text-emerald-500 dark:text-emerald-400">$</span> message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    name="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Décrivez votre projet ou votre message..."
                    rows={6}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none font-mono"
                  />
                </motion.div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
                <motion.button
                  whileHover={{ scale: sending ? 1 : 1.02, y: sending ? 0 : -2 }}
                  whileTap={{ scale: sending ? 1 : 0.98 }}
                  type="submit"
                  disabled={sending}
                  className="w-full mt-5 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/20 transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                  {submitted ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10 flex items-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 0.5 }}
                      >
                        ✓
                      </motion.span>
                      Message envoyé avec succès !
                    </motion.span>
                  ) : sending ? (
                    <span className="relative z-10 flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        ⏳
                      </motion.div>
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      <Send size={18} /> Envoyer le message
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}