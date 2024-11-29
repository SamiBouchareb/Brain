import React from 'react';
import { Brain, Zap, Timer, Trophy, Target, CheckCircle2 } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { ActivityChart } from './ActivityChart';
import { RecommendedExercises } from './RecommendedExercises';
import { useGameStats } from '../../store/gameStats';

export function Dashboard() {
  const {
    totalSessions,
    bestStreak,
    timeSpent,
    achievements,
    maxAchievements,
    dailyScore,
    currentStreak,
    completionRate,
    totalPoints,
    lastWeekStats
  } = useGameStats();

  const mainStats = [
    {
      title: 'Total Sessions',
      value: totalSessions,
      icon: Brain,
      iconColor: 'text-purple-500',
      iconBgColor: 'bg-purple-50'
    },
    {
      title: 'Best Streak',
      value: `${bestStreak} days`,
      icon: Zap,
      iconColor: 'text-yellow-500',
      iconBgColor: 'bg-yellow-50'
    },
    {
      title: 'Time Spent',
      value: `${Math.round(timeSpent / 60)}h`,
      icon: Timer,
      iconColor: 'text-green-500',
      iconBgColor: 'bg-green-50'
    },
    {
      title: 'Achievements',
      value: `${achievements}/${maxAchievements}`,
      icon: Trophy,
      iconColor: 'text-indigo-500',
      iconBgColor: 'bg-indigo-50'
    }
  ];

  const performanceStats = [
    {
      title: 'Daily Score',
      value: dailyScore,
      change: {
        value: `${Math.abs(((dailyScore - lastWeekStats.dailyScore) / lastWeekStats.dailyScore) * 100).toFixed(1)}%`,
        isPositive: dailyScore >= lastWeekStats.dailyScore
      },
      icon: Target,
      iconColor: 'text-blue-500',
      iconBgColor: 'bg-blue-50'
    },
    {
      title: 'Current Streak',
      value: `${currentStreak} days`,
      change: {
        value: `${Math.abs(currentStreak - lastWeekStats.streak)} days`,
        isPositive: currentStreak >= lastWeekStats.streak
      },
      icon: Zap,
      iconColor: 'text-yellow-500',
      iconBgColor: 'bg-yellow-50'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      change: {
        value: `${Math.abs(completionRate - lastWeekStats.completionRate).toFixed(1)}%`,
        isPositive: completionRate >= lastWeekStats.completionRate
      },
      icon: CheckCircle2,
      iconColor: 'text-green-500',
      iconBgColor: 'bg-green-50'
    },
    {
      title: 'Total Points',
      value: totalPoints.toLocaleString(),
      change: {
        value: (totalPoints - lastWeekStats.points).toLocaleString(),
        isPositive: totalPoints >= lastWeekStats.points
      },
      icon: Trophy,
      iconColor: 'text-indigo-500',
      iconBgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 gradient-animate bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome back, John!
          </h1>
          <p className="text-gray-500">
            Track your progress and continue improving your cognitive abilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mainStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityChart />
          <RecommendedExercises />
        </div>
      </div>
    </div>
  );
}
