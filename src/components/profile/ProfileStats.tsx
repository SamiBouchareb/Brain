import React from 'react';
import { Brain, Zap, Clock, Star } from 'lucide-react';

const stats = [
  { label: 'Total Sessions', value: '248', icon: Brain, color: 'text-indigo-600' },
  { label: 'Best Streak', value: '12 days', icon: Zap, color: 'text-yellow-600' },
  { label: 'Time Spent', value: '86h', icon: Clock, color: 'text-green-600' },
  { label: 'Achievements', value: '24/50', icon: Star, color: 'text-purple-600' },
];

export function ProfileStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-200 hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 transition-all duration-300 hover-float"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}