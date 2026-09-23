import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus, Maximize2 } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveTerminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Jean-Jaures Terminal v1.0',
    'Type "help" to see available commands.',
    '',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands: { [key: string]: () => string[] } = {
    help: () => [
      'Available commands:',
      '  about      - Learn about me',
      '  skills     - View my skills',
      '  projects   - See my projects',
      '  contact    - Get my contact info',
      '  social     - View my social links',
      '  education  - View my education',
      '  clear      - Clear terminal',
      '  exit       - Close terminal',
      '  matrix     - Enter the matrix',
      '  hack       - Try to hack me 😄',
      '',
    ],
    about: () => [
      '╔════════════════════════════════════════╗',
      '║   Jean-Jaures KOUASSI                  ║',
      '║   Cybersecurity Student @ ESGI Paris   ║',
      '║   Bachelor 3 - Cybersecurity           ║',
      '╚════════════════════════════════════════╝',
      '',
      'Passionate about cybersecurity and development.',
      'Looking for an apprenticeship in cybersecurity.',
      '',
    ],
    skills: () => [
      '╔════════════════════════════════════════╗',
      '║          TECHNICAL SKILLS              ║',
      '╠════════════════════════════════════════╣',
      '║ Development:                           ║',
      '║   • HTML/CSS/JavaScript    [████████░] ║',
      '║   • React/Next.js          [███████░░] ║',
      '║   • Node.js/Express        [██████░░░] ║',
      '║   • PHP/SQL                [██████░░░] ║',
      '║                                        ║',
      '║ Cybersecurity:                         ║',
      '║   • Linux Administration   [████████░] ║',
      '║   • Network Security       [████████░] ║',
      '║   • pfSense/Firewall       [███████░░] ║',
      '║   • Pentesting             [█████░░░░] ║',
      '╚════════════════════════════════════════╝',
      '',
    ],
    projects: () => [
      'My Projects:',
      '',
      '1. WiSafe - Secure WiFi Hotspot',
      '   Tech: Raspberry Pi, HTML/CSS, JavaScript, BASH',
      '',
      '2. Stage Assistant Chef de Projet',
      '   Tech: React.js, Node.js, PHP, SQL',
      '',
      '3. Stage Technicien Informatique',
      '   Location: GC Maintenance Informatique, Paris',
      '',
      '4. Graphiste Freelance',
      '   Tech: Photoshop, Illustrator, Canva',
      '',
    ],
    contact: () => [
      '╔════════════════════════════════════════╗',
      '║         CONTACT INFORMATION            ║',
      '╠════════════════════════════════════════╣',
      '║ 📧 Email: kouassijaures@exemple.com    ║',
      '║ 📱 Phone: +33 6 XX XX XX XX            ║',
      '║ 📍 Location: Paris, France             ║',
      '╚════════════════════════════════════════╝',
      '',
    ],
    social: () => [
      'My Social Links:',
      '',
      '🔗 GitHub: https://github.com/kjean-jaures',
      '🔗 LinkedIn: Jean-Jaures KOUASSI',
      '',
    ],
    education: () => [
      'Education:',
      '',
      '• 2025-2026: Bachelor 3 Cybersécurité - ESGI Paris',
      '• 2025: Admin Systèmes & Réseaux Sécurisés - ESIEA',
      '• 2022-2023: BTS Informatique',
      '• 2020-2021: BAC Scientifique',
      '',
    ],
    matrix: () => [
      '',
      '🟢 WELCOME TO THE MATRIX 🟢',
      '',
      'Wake up, Neo...',
      'The Matrix has you...',
      'Follow the white rabbit.',
      '',
      'Knock, knock.',
      '',
    ],
    hack: () => [
      '',
      '⚠️  INITIATING HACK SEQUENCE... ⚠️',
      '',
      '[████████████████████] 100%',
      '',
      '❌ ACCESS DENIED',
      '',
      'Nice try! 😄 My security is too strong!',
      'But hey, if you\'re interested in cybersecurity,',
      'let\'s talk about an apprenticeship!',
      '',
    ],
    clear: () => [],
    exit: () => {
      setTimeout(() => onClose(), 100);
      return ['Closing terminal...', ''];
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `$ ${input}`];

    if (cmd === 'clear') {
      setHistory([]);
    } else if (commands[cmd]) {
      newHistory.push(...commands[cmd]());
      setHistory(newHistory);
    } else if (cmd) {
      newHistory.push(`Command not found: ${cmd}`);
      newHistory.push('Type "help" to see available commands.');
      newHistory.push('');
      setHistory(newHistory);
    }

    setInput('');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
              <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
              <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
            </div>
            <span className="ml-4 text-sm text-gray-400 font-mono">jean-jaures@portfolio:~</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <TerminalIcon size={16} />
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="p-6 h-96 overflow-y-auto font-mono text-sm"
        >
          {history.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`${
                line.startsWith('$') ? 'text-emerald-400' : 
                line.startsWith('╔') || line.startsWith('╠') || line.startsWith('╚') ? 'text-cyan-400' :
                line.startsWith('║') ? 'text-gray-300' :
                'text-gray-400'
              } whitespace-pre-wrap`}
            >
              {line}
            </motion.div>
          ))}

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
            <span className="text-emerald-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white caret-emerald-400"
              autoFocus
            />
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
