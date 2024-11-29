import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FocusTarget } from './FocusTarget';
import { Target, Timer, Zap, ArrowLeft } from 'lucide-react';
import { useGameStats } from '../../../store/gameStats';

// Game constants
const GAME_DURATION = 60000; // 60 seconds
const POINTS_PER_HIT = 100;
const STREAK_BONUS = 50;

interface GameStats {
  score: number;
  level: number;
  streak: number;
  maxStreak: number;
  timeLeft: number;
  totalHits: number;
  accuracy: number;
  totalTargets: number;
}

const initialStats: GameStats = {
  score: 0,
  level: 1,
  streak: 0,
  maxStreak: 0,
  timeLeft: GAME_DURATION,
  totalHits: 0,
  accuracy: 100,
  totalTargets: 0,
};

export function FocusGame({ onBack, updateStats }: { onBack: () => void; updateStats: (gameId: string, time: number, score: number) => void }) {
  const updateGameResult = useGameStats(state => state.updateGameResult);
  const updateStreak = useGameStats(state => state.updateStreak);
  
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [stats, setStats] = useState<GameStats>(initialStats);
  const [targetKey, setTargetKey] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setStats(prev => ({
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - 1000)
        }));
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [gameState]);

  useEffect(() => {
    if (stats.timeLeft === 0) {
      setGameState('finished');
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [stats.timeLeft]);

  useEffect(() => {
    if (gameState === 'finished') {
      const finalScore = Math.round((stats.score / POINTS_PER_HIT) * 100);
      const timeSpentMinutes = GAME_DURATION / 60000; // Convert to minutes
      updateStats('focus', timeSpentMinutes * 60, finalScore);
      updateStreak();
    }
  }, [gameState, stats.score, updateGameResult, updateStreak, updateStats]);

  const handleTargetClick = () => {
    if (gameState === 'playing') {
      const newStreak = stats.streak + 1;
      const streakBonus = Math.floor(newStreak / 5) * STREAK_BONUS;
      
      setStats(prev => ({
        ...prev,
        score: prev.score + POINTS_PER_HIT + streakBonus,
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        totalHits: prev.totalHits + 1,
        totalTargets: prev.totalTargets + 1,
        accuracy: Math.round((prev.totalHits + 1) / (prev.totalTargets + 1) * 100),
        level: Math.floor((prev.score + POINTS_PER_HIT + streakBonus) / (POINTS_PER_HIT * 10)) + 1
      }));

      setTargetKey(prev => prev + 1);
    }
  };

  const handleGameStart = () => {
    setGameState('playing');
    setStats(initialStats);
    setTargetKey(0);
  };

  const handleBackClick = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onBack();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Games
        </button>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{stats.score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">x{stats.streak}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-green-500" />
            <span className="font-medium">{Math.ceil(stats.timeLeft / 1000)}s</span>
          </div>
        </div>
      </div>

      <div 
        ref={gameAreaRef}
        className="flex-1 relative"
        style={{ background: 'radial-gradient(circle, #f8fafc 0%, #f1f5f9 100%)' }}
      >
        <AnimatePresence>
          {gameState === 'ready' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Focus Target</h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Click targets as they appear to score points. Build streaks for bonus points!
              </p>
              <button
                onClick={handleGameStart}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Start Game
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <FocusTarget
              key={targetKey}
              onHit={handleTargetClick}
              x={Math.random() * (gameAreaRef.current?.clientWidth ?? 0 - 60)}
              y={Math.random() * (gameAreaRef.current?.clientHeight ?? 0 - 60)}
              size={60}
            />
          )}

          {gameState === 'finished' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-white bg-opacity-90"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Game Over!</h2>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stats.score}</div>
                  <div className="text-gray-600">Final Score</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">{stats.maxStreak}x</div>
                  <div className="text-gray-600">Best Streak</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleGameStart}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Play Again
                </button>
                <button
                  onClick={handleBackClick}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Back to Games
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
