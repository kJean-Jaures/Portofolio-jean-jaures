import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

interface Question {
  question: string;
  answers: string[];
  correct: number;
}

const QUESTIONS: Question[] = [
  // Informatique générale
  {
    question: "Que signifie 'CPU' ?",
    answers: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],
    correct: 0,
  },
  {
    question: "Quel langage est utilisé pour créer des pages web ?",
    answers: ["Python", "HTML", "Java", "C++"],
    correct: 1,
  },
  {
    question: "Que signifie 'RAM' ?",
    answers: ["Read Access Memory", "Random Access Memory", "Run Application Memory", "Real Active Memory"],
    correct: 1,
  },
  {
    question: "Quel système d'exploitation est open source ?",
    answers: ["Windows", "macOS", "Linux", "iOS"],
    correct: 2,
  },
  {
    question: "Que signifie 'URL' ?",
    answers: ["Universal Resource Link", "Uniform Resource Locator", "United Reference Location", "Universal Reference Link"],
    correct: 1,
  },
  {
    question: "Quel protocole est utilisé pour envoyer des emails ?",
    answers: ["HTTP", "FTP", "SMTP", "TCP"],
    correct: 2,
  },
  {
    question: "Que signifie 'API' ?",
    answers: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interface", "Application Process Integration"],
    correct: 0,
  },
  {
    question: "Quel langage est principalement utilisé pour le développement Android ?",
    answers: ["Swift", "Kotlin", "Objective-C", "Ruby"],
    correct: 1,
  },
  {
    question: "Que signifie 'CSS' ?",
    answers: ["Cascading Style Sheets", "Computer Style System", "Creative Style Sheets", "Cascading System Style"],
    correct: 0,
  },
  {
    question: "Quel est le port par défaut pour HTTP ?",
    answers: ["21", "22", "80", "443"],
    correct: 2,
  },
  {
    question: "Que signifie 'JSON' ?",
    answers: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Online Network", "Java Simple Object Network"],
    correct: 0,
  },
  {
    question: "Quel langage est utilisé pour les requêtes de base de données ?",
    answers: ["Python", "SQL", "JavaScript", "PHP"],
    correct: 1,
  },
  {
    question: "Que signifie 'IoT' ?",
    answers: ["Internet of Things", "Integration of Technology", "Internet of Technology", "Integration of Things"],
    correct: 0,
  },
  {
    question: "Quel framework JavaScript est développé par Facebook ?",
    answers: ["Angular", "Vue.js", "React", "Ember"],
    correct: 2,
  },
  {
    question: "Que signifie 'DNS' ?",
    answers: ["Domain Name System", "Digital Network Service", "Data Name System", "Domain Network Service"],
    correct: 0,
  },
];

export default function CyberQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    
    setTimeout(() => {
      if (answerIndex === QUESTIONS[currentQuestion].correct) {
        setScore(score + 1);
      }
      
      if (currentQuestion + 1 < QUESTIONS.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        const finalScore = answerIndex === QUESTIONS[currentQuestion].correct ? score + 1 : score;
        if (!bestScore || finalScore > bestScore) {
          setBestScore(finalScore);
        }
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
          <span className="text-2xl">💻</span>
        </div>
        <h3 className="text-2xl font-bold">Quiz Informatique</h3>
      </div>

      {!showResult ? (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Question</p>
              <p className="text-2xl font-bold text-violet-400">
                {currentQuestion + 1}/{QUESTIONS.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Score</p>
              <p className="text-2xl font-bold text-emerald-400">{score}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-6 text-gray-200">
              {QUESTIONS[currentQuestion].question}
            </h4>
            <div className="space-y-3">
              {QUESTIONS[currentQuestion].answers.map((answer, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedAnswer === index
                      ? index === QUESTIONS[currentQuestion].correct
                        ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20'
                        : 'bg-red-500/20 border-2 border-red-500 text-red-400 shadow-lg shadow-red-500/20'
                      : selectedAnswer !== null && index === QUESTIONS[currentQuestion].correct
                      ? 'bg-emerald-500/10 border-2 border-emerald-500/50 text-emerald-400'
                      : 'bg-gray-800/50 border-2 border-gray-700/50 hover:border-violet-500/50 text-gray-300'
                  }`}
                >
                  {answer}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 10 }}
            className="text-6xl mb-4"
          >
            {score >= 7 ? '🏆' : score >= 5 ? '🎉' : score >= 3 ? '👍' : '💪'}
          </motion.div>
          <h4 className="text-2xl font-bold mb-2">Quiz terminé !</h4>
          <p className="text-4xl font-bold text-violet-400 mb-2">
            {score}/{QUESTIONS.length}
          </p>
          <p className="text-gray-400 mb-6">
            {score >= 12 ? 'Excellent ! Tu es un expert !' : 
             score >= 9 ? 'Très bien ! Bonne connaissance !' : 
             score >= 6 ? 'Pas mal ! Continue à apprendre !' : 
             'Continue à étudier l\'informatique !'}
          </p>
          {bestScore && (
            <p className="text-sm text-gray-500 mb-6">
              Meilleur score: <span className="text-emerald-400 font-bold">{bestScore}/{QUESTIONS.length}</span>
            </p>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetQuiz}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold flex items-center gap-2 mx-auto shadow-lg shadow-violet-500/20"
          >
            <RotateCcw size={18} />
            Recommencer
          </motion.button>
        </div>
      )}
    </div>
  );
}
