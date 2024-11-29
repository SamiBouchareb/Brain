import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryCard } from './MemoryCard';
import { Timer } from './Timer';
import { Trophy, ArrowLeft, RotateCcw, Settings, Lock, Smartphone, Monitor } from 'lucide-react';
import { useDeviceType, DeviceType } from '../../../hooks/useDeviceType';

const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎢', '🎡', '🎹', '🎸', '🎺', '🎻', '🎬', '🎤', '🎧', '🎙️', '🎩', '🎪', '🎫', '🎗️', '🎟️', '🎭', '🎨', '🎪', '🎢', '🎡', '🎠', '🎪', '🎭', '🎨', '🎯', '🎲'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface DifficultyLevel {
  name: string;
  pairs: number;
  cols: string;
  requiresDevice?: DeviceType[];
}

const difficultyLevels: DifficultyLevel[] = [
  { name: 'Easy', pairs: 4, cols: 'grid-cols-2 sm:grid-cols-4' },
  { name: 'Normal', pairs: 8, cols: 'grid-cols-3 sm:grid-cols-4' },
  { name: 'Hard', pairs: 12, cols: 'grid-cols-4 sm:grid-cols-6' },
  { name: 'Expert', pairs: 16, cols: 'grid-cols-4 sm:grid-cols-8' },
  { 
    name: 'God Mode', 
    pairs: 32, 
    cols: 'grid-cols-4 sm:grid-cols-8',
    requiresDevice: ['tablet', 'desktop'] as DeviceType[]
  },
];

export function MemoryGame({ onBack, updateStats }: { onBack: () => void; updateStats: (gameId: string, time: number, score: number) => void }) {
  const deviceType = useDeviceType();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(difficultyLevels[1]);
  const [showDifficultySelect, setShowDifficultySelect] = useState(false);
  const [timerReset, setTimerReset] = useState(false);
  const [showDeviceWarning, setShowDeviceWarning] = useState(false);

  const shuffleCards = (pairs: number = difficulty.pairs) => {
    const selectedEmojis = emojis.slice(0, pairs);
    const allEmojis = [...selectedEmojis, ...selectedEmojis];
    const shuffled = allEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsGameComplete(false);
    setGameStarted(false);
    setMatchedPairs(0);
    setTimerReset(true);
  };

  const handleDifficultyChange = (newDifficulty: DifficultyLevel) => {
    if (newDifficulty.requiresDevice && !newDifficulty.requiresDevice.includes(deviceType)) {
      setShowDeviceWarning(true);
      setTimeout(() => setShowDeviceWarning(false), 3000);
      return;
    }
    setDifficulty(newDifficulty);
    setShowDifficultySelect(false);
    shuffleCards(newDifficulty.pairs);
  };

  useEffect(() => {
    shuffleCards();
    const savedBestScore = localStorage.getItem('memoryGameBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (
      flippedCards.length === 2 ||
      cards[cardId].isFlipped ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;

      if (cards[firstCard].emoji === cards[secondCard].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstCard].isMatched = true;
          matchedCards[secondCard].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(prev => prev + 1);

          if (matchedPairs + 1 === difficulty.pairs) {
            setIsGameComplete(true);
            const currentScore = moves + 1;
            updateStats('memory-match', 0, currentScore);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const unflippedCards = [...cards];
          unflippedCards[firstCard].isFlipped = false;
          unflippedCards[secondCard].isFlipped = false;
          setCards(unflippedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => shuffleCards()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>
          <button
            onClick={() => setShowDifficultySelect(!showDifficultySelect)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>{difficulty.name} Mode</span>
          </button>
        </div>

        {/* Device Warning Modal */}
        <AnimatePresence>
          {showDeviceWarning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 20 }}
                className="bg-white rounded-xl p-5 shadow-xl max-w-sm w-full mx-auto relative"
              >
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Lock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Device Restricted Mode
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      God Mode requires a larger screen to accommodate 64 cards. Please try this mode on a tablet or computer for the best experience.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm bg-red-50 text-red-700 px-3 py-2 rounded-lg">
                        <Smartphone className="w-4 h-4 shrink-0" />
                        <span>Not available on mobile devices</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                        <Monitor className="w-4 h-4 shrink-0" />
                        <span>Available on tablets and computers</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowDeviceWarning(false)}
                  className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Got it
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Difficulty Select */}
        {showDifficultySelect && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 mb-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Difficulty</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {difficultyLevels.map((level) => {
                const isLocked = level.requiresDevice && !level.requiresDevice.includes(deviceType);
                return (
                  <button
                    key={level.name}
                    onClick={() => handleDifficultyChange(level)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      difficulty.name === level.name
                        ? 'bg-indigo-600 text-white'
                        : isLocked
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {level.name}
                      {isLocked && <Lock className="w-3 h-3" />}
                    </div>
                    <span className="block text-xs opacity-75">
                      {level.pairs * 2} cards
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Title Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Memory Match</h1>
          <p className="text-sm sm:text-base text-gray-600">Match all the pairs with the fewest moves possible!</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 sm:px-4 sm:py-2 shadow-sm">
            <span className="text-gray-500 text-sm">Moves:</span>
            <span className="text-base sm:text-lg font-semibold text-gray-900">{moves}</span>
          </div>
          {bestScore && (
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 sm:px-4 sm:py-2 shadow-sm">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <span className="text-gray-500 text-sm">Best:</span>
              <span className="text-base sm:text-lg font-semibold text-gray-900">{bestScore}</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 sm:px-4 sm:py-2 shadow-sm col-span-2 sm:col-span-1 mt-3 sm:mt-0">
            <Timer 
              isRunning={gameStarted && !isGameComplete} 
              reset={timerReset}
              onReset={() => setTimerReset(false)}
            />
          </div>
        </div>

        {/* Game Complete Section */}
        {isGameComplete ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center bg-white rounded-xl p-6 sm:p-8 shadow-lg mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              You completed {difficulty.name} mode in {moves} moves!
              {bestScore === moves && (
                <span className="block text-yellow-500 font-semibold mt-2">
                  New Best Score! 🏆
                </span>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => shuffleCards()}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
              >
                Play Again
              </button>
              <button
                onClick={() => setShowDifficultySelect(true)}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
              >
                Change Difficulty
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`grid ${difficulty.cols} gap-2 sm:gap-4 justify-items-center`}
          >
            {cards.map((card) => (
              <MemoryCard
                key={card.id}
                {...card}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
