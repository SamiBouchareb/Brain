import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Target, Zap, Award } from 'lucide-react';

interface StatsBarProps {
  stats: {
    score: number;
    targetsHit: number;
    averageReactionTime: number;
    bestReactionTime: number;
    streak: number;
    level: number;
    timeLeft: number;
  };
}

export function StatsBar({ stats }: StatsBarProps) {
  const formatTime = (ms: number) => {
    if (ms === Infinity) return '---';
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        {
          label: 'Score',
          value: stats.score.toLocaleString(),
          icon: Award,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-100',
        },
        {
          label: 'Time Left',
          value: `${stats.timeLeft}s`,
          icon: Timer,
          color: 'text-red-500',
          bgColor: 'bg-red-100',
        },
        {
          label: 'Level',
          value: stats.level,
          icon: Target,
          color: 'text-blue-500',
          bgColor: 'bg-blue-100',
        },
        {
          label: 'Streak',
          value: stats.streak,
          icon: Zap,
          color: 'text-purple-500',
          bgColor: 'bg-purple-100',
        },
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
