import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Timer, Zap, Target, RotateCcw, ArrowLeft } from 'lucide-react';

interface GameOverScreenProps {
  stats: {
    score: number;
    targetsHit: number;
    totalTargets: number;
    averageReactionTime: number;
    bestReactionTime: number;
    level: number;
  };
  onRestart: () => void;
  onBack: () => void;
}

export function GameOverScreen({ stats, onRestart, onBack }: GameOverScreenProps) {
  const formatTime = (ms: number) => {
    if (ms === Infinity) return '---';
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const accuracy = ((stats.targetsHit / stats.totalTargets) * 100).toFixed(1);

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-gray-700" />
        </div>
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-lg font-semibold text-gray-900">{value}</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Game Over!</h2>
            <p className="text-gray-500">Here's how you did:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <StatCard
              icon={Trophy}
              label="Final Score"
              value={stats.score.toLocaleString()}
              color="bg-yellow-100"
            />
            <StatCard
              icon={Target}
              label="Accuracy"
              value={`${accuracy}%`}
              color="bg-green-100"
            />
            <StatCard
              icon={Zap}
              label="Best Reaction Time"
              value={formatTime(stats.bestReactionTime)}
              color="bg-purple-100"
            />
            <StatCard
              icon={Timer}
              label="Average Reaction Time"
              value={formatTime(stats.averageReactionTime)}
              color="bg-blue-100"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Games
            </button>
            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
