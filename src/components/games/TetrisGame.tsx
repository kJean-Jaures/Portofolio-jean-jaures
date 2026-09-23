import { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Play, Pause } from 'lucide-react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: 'bg-cyan-400' },
  O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-400' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-400' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-400' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-400' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-400' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-400' },
};

type TetrominoType = keyof typeof TETROMINOS;
type Board = (string | null)[][];

interface Piece {
  type: TetrominoType;
  shape: number[][];
  x: number;
  y: number;
}

const createEmptyBoard = (): Board =>
  Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));

const getRandomPiece = (): TetrominoType => {
  const types = Object.keys(TETROMINOS) as TetrominoType[];
  return types[Math.floor(Math.random() * types.length)];
};

const createPiece = (type: TetrominoType): Piece => ({
  type,
  shape: TETROMINOS[type].shape,
  x: Math.floor(BOARD_WIDTH / 2) - Math.floor(TETROMINOS[type].shape[0].length / 2),
  y: 0,
});

const isValidMove = (shape: number[][], x: number, y: number, board: Board): boolean => {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newX = x + col;
        const newY = y + row;
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) return false;
        if (newY >= 0 && board[newY][newX]) return false;
      }
    }
  }
  return true;
};

const rotatePiece = (shape: number[][]): number[][] => {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array(cols).fill(null).map(() => Array(rows).fill(0));
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      rotated[col][rows - 1 - row] = shape[row][col];
    }
  }
  return rotated;
};

export default function TetrisGame() {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<TetrominoType>(getRandomPiece());
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const gameLoopRef = useRef<number | null>(null);

  const spawnNewPiece = useCallback(() => {
    const newPiece = createPiece(nextPiece);
    const newNextPiece = getRandomPiece();

    if (!isValidMove(newPiece.shape, newPiece.x, newPiece.y, board)) {
      setGameOver(true);
      setGameStarted(false);
      return;
    }

    setCurrentPiece(newPiece);
    setNextPiece(newNextPiece);
  }, [nextPiece, board]);

  const placePiece = useCallback(() => {
    if (!currentPiece) return;

    const newBoard = board.map(row => [...row]);
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          const y = currentPiece.y + row;
          const x = currentPiece.x + col;
          if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
            newBoard[y][x] = TETROMINOS[currentPiece.type].color;
          }
        }
      }
    }

    const newLines = newBoard.filter(row => row.some(cell => cell === null));
    const linesCleared = BOARD_HEIGHT - newLines.length;

    while (newLines.length < BOARD_HEIGHT) {
      newLines.unshift(Array(BOARD_WIDTH).fill(null));
    }

    setBoard(newLines);
    setScore(prev => prev + linesCleared * 100 * level);
    setLines(prev => {
      const newTotal = prev + linesCleared;
      setLevel(Math.floor(newTotal / 10) + 1);
      return newTotal;
    });

    spawnNewPiece();
  }, [currentPiece, board, level, spawnNewPiece]);

  const moveDown = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    if (isValidMove(currentPiece.shape, currentPiece.x, currentPiece.y + 1, board)) {
      setCurrentPiece({ ...currentPiece, y: currentPiece.y + 1 });
    } else {
      placePiece();
    }
  }, [currentPiece, gameOver, isPaused, board, placePiece]);

  const moveLeft = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    if (isValidMove(currentPiece.shape, currentPiece.x - 1, currentPiece.y, board)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x - 1 });
    }
  }, [currentPiece, gameOver, isPaused, board]);

  const moveRight = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    if (isValidMove(currentPiece.shape, currentPiece.x + 1, currentPiece.y, board)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x + 1 });
    }
  }, [currentPiece, gameOver, isPaused, board]);

  const rotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    const rotated = rotatePiece(currentPiece.shape);
    
    if (isValidMove(rotated, currentPiece.x, currentPiece.y, board)) {
      setCurrentPiece({ ...currentPiece, shape: rotated });
    } else if (isValidMove(rotated, currentPiece.x - 1, currentPiece.y, board)) {
      setCurrentPiece({ ...currentPiece, shape: rotated, x: currentPiece.x - 1 });
    } else if (isValidMove(rotated, currentPiece.x + 1, currentPiece.y, board)) {
      setCurrentPiece({ ...currentPiece, shape: rotated, x: currentPiece.x + 1 });
    }
  }, [currentPiece, gameOver, isPaused, board]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    let newY = currentPiece.y;
    while (isValidMove(currentPiece.shape, currentPiece.x, newY + 1, board)) {
      newY++;
    }
    setCurrentPiece({ ...currentPiece, y: newY });
    setTimeout(() => placePiece(), 50);
  }, [currentPiece, gameOver, isPaused, board, placePiece]);

  const startGame = () => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
    
    const firstPiece = getRandomPiece();
    const secondPiece = getRandomPiece();
    setCurrentPiece(createPiece(firstPiece));
    setNextPiece(secondPiece);
  };

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused(!isPaused);
    }
  };

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const speed = Math.max(100, 1000 - (level - 1) * 100);
    gameLoopRef.current = window.setInterval(moveDown, speed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, isPaused, level, moveDown]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;

      if (e.key === 'p' || e.key === 'P') {
        togglePause();
        return;
      }

      if (isPaused) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotate();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver, isPaused, moveLeft, moveRight, moveDown, rotate, hardDrop]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    if (currentPiece && !isPaused) {
      for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
          if (currentPiece.shape[row][col]) {
            const y = currentPiece.y + row;
            const x = currentPiece.x + col;
            if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
              displayBoard[y][x] = TETROMINOS[currentPiece.type].color;
            }
          }
        }
      }
    }
    return displayBoard;
  };

  const renderNextPiece = () => {
    const shape = TETROMINOS[nextPiece].shape;
    const color = TETROMINOS[nextPiece].color;

    return (
      <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${shape[0].length}, 1fr)` }}>
        {shape.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-5 h-5 ${cell ? color : 'bg-transparent'}`}
            />
          ))
        )}
      </div>
    );
  };

  // Handler pour boutons tactiles (appelle directement les fonctions, pas besoin de simuler keydown)
  const handleTouch = (action: () => void) => (e: React.PointerEvent) => {
    e.preventDefault();
    action();
  };

  return (
    <div className="p-4 md:p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm max-w-2xl w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-2xl">🎮</span>
        </div>
        <h3 className="text-2xl font-bold">Tetris</h3>
      </div>

      {!gameStarted || gameOver ? (
        <div className="text-center py-12">
          {gameOver && (
            <div className="text-6xl mb-4">💀</div>
          )}
          <div className="mb-6">
            <p className="text-gray-400 mb-2">
              {gameOver ? `Game Over! Score final: ${score}` : 'Prêt à jouer ?'}
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p className="hidden md:block">← → : Déplacer | ↑ : Rotation</p>
              <p className="hidden md:block">↓ : Descente douce | Espace : Descente rapide</p>
              <p className="hidden md:block">P : Pause</p>
              <p className="md:hidden">Utilise les boutons sous le plateau pour jouer</p>
            </div>
          </div>
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center gap-2 mx-auto shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform"
          >
            {gameOver ? <RotateCcw size={20} /> : <Play size={20} />}
            {gameOver ? 'Rejouer' : 'Commencer'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
          {/* Game Board */}
          <div className="relative flex-shrink-0">
            <div className="border-2 border-gray-700 rounded bg-gray-950 p-1">
              {renderBoard().map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className={`w-5 h-5 md:w-6 md:h-6 border border-gray-800 ${
                        cell ? `${cell} shadow-lg` : 'bg-gray-900'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {isPaused && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded">
                <div className="text-center">
                  <div className="text-4xl mb-2">⏸️</div>
                  <p className="text-white font-bold">PAUSE</p>
                  <p className="text-gray-400 text-sm">Appuie sur P pour continuer</p>
                </div>
              </div>
            )}
          </div>

          {/* 🎮 MANETTE TACTILE - visible uniquement sur mobile */}
          <div className="md:hidden w-full max-w-xs mx-auto space-y-3 select-none">
            {/* Mini stats mobile */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <p className="text-xs text-gray-400">Score</p>
                <p className="text-lg font-bold text-purple-400">{score}</p>
              </div>
              <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <p className="text-xs text-gray-400">Niveau</p>
                <p className="text-lg font-bold text-cyan-400">{level}</p>
              </div>
              <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <p className="text-xs text-gray-400">Lignes</p>
                <p className="text-lg font-bold text-emerald-400">{lines}</p>
              </div>
            </div>

            {/* Boutons de contrôle */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onPointerDown={handleTouch(moveLeft)}
                className="py-4 rounded-xl bg-gray-800/80 border border-gray-700/50 text-2xl active:scale-90 active:bg-purple-500/20 touch-manipulation"
              >
                ⬅️
              </button>
              <button
                onPointerDown={handleTouch(rotate)}
                className="py-4 rounded-xl bg-gray-800/80 border border-gray-700/50 text-2xl active:scale-90 active:bg-purple-500/20 touch-manipulation"
              >
                🔄
              </button>
              <button
                onPointerDown={handleTouch(moveRight)}
                className="py-4 rounded-xl bg-gray-800/80 border border-gray-700/50 text-2xl active:scale-90 active:bg-purple-500/20 touch-manipulation"
              >
                ➡️
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onPointerDown={handleTouch(moveDown)}
                className="py-4 rounded-xl bg-gray-800/80 border border-gray-700/50 text-2xl active:scale-90 active:bg-purple-500/20 touch-manipulation"
              >
                ⬇️
              </button>
              <button
                onPointerDown={handleTouch(hardDrop)}
                className="py-4 rounded-xl bg-purple-600/30 border border-purple-500/40 text-2xl active:scale-90 active:bg-purple-500/40 touch-manipulation"
              >
                ⏬
              </button>
            </div>

            <button
              onClick={togglePause}
              className="w-full py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:border-purple-500/50 transition-all flex items-center justify-center gap-2"
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
              {isPaused ? 'Reprendre' : 'Pause'}
            </button>
          </div>

          {/* Side Panel - desktop seulement */}
          <div className="hidden md:block space-y-4">
            {/* Next Piece */}
            <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-2">Suivant</p>
              <div className="flex justify-center">
                {renderNextPiece()}
              </div>
            </div>

            {/* Score */}
            <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-1">Score</p>
              <p className="text-2xl font-bold text-purple-400">{score}</p>
            </div>

            {/* Level */}
            <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-1">Niveau</p>
              <p className="text-2xl font-bold text-cyan-400">{level}</p>
            </div>

            {/* Lines */}
            <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-1">Lignes</p>
              <p className="text-2xl font-bold text-emerald-400">{lines}</p>
            </div>

            {/* Pause Button */}
            <button
              onClick={togglePause}
              className="w-full px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:border-purple-500/50 transition-all flex items-center justify-center gap-2"
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
              {isPaused ? 'Reprendre' : 'Pause'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}