import React from 'react';
import { Card } from '../common/Card';
import { Brain, Target, Zap, Trophy, Clock } from 'lucide-react';
import { useGameStats } from '../../store/gameStats';

interface StatItem {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}

export function ProfileStats() {
  const { 
    dailyScore,
    totalPoints,
    timeSpent,
    currentStreak,
    bestStreak,
    achievements,
    maxAchievements,
    completionRate,
    totalSessions
  } = useGameStats();

  const stats: StatItem[] = [
    {
      label: 'Total Sessions',
      value: totalSessions,
      icon: Brain,
      color: 'text-purple-500 bg-purple-50'
    },
    {
      label: 'Best Streak',
      value: `${bestStreak} days`,
      icon: Zap,
      color: 'text-yellow-500 bg-yellow-50'
    },
    {
      label: 'Time Spent',
      value: `${Math.round(timeSpent / 60)}h`,
      icon: Clock,
      color: 'text-green-500 bg-green-50'
    },
    {
      label: 'Achievements',
      value: `${achievements}/${maxAchievements}`,
      icon: Trophy,
      color: 'text-indigo-500 bg-indigo-50'
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 gradient-animate bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome back, John!
          </h3>
          <p className="text-gray-500 mt-1">Track your progress and continue improving your cognitive abilities.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-3 rounded-xl ${stat.color} mb-3`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
