import React, { useState } from 'react';
import { Card } from '../common/Card';
import { useGameStats } from '../../store/gameStats';

interface DailyActivity {
  date: string;
  focusScore: number;
  memoryScore: number;
  reactionTime: number;
  timePerception: number;
}

const mockData: DailyActivity[] = [
  { date: 'Mon', focusScore: 85, memoryScore: 75, reactionTime: 82, timePerception: 70 },
  { date: 'Tue', focusScore: 90, memoryScore: 80, reactionTime: 85, timePerception: 75 },
  { date: 'Wed', focusScore: 88, memoryScore: 85, reactionTime: 80, timePerception: 80 },
  { date: 'Thu', focusScore: 92, memoryScore: 78, reactionTime: 88, timePerception: 85 },
  { date: 'Fri', focusScore: 95, memoryScore: 82, reactionTime: 90, timePerception: 82 },
  { date: 'Sat', focusScore: 91, memoryScore: 88, reactionTime: 85, timePerception: 88 },
  { date: 'Sun', focusScore: 93, memoryScore: 85, reactionTime: 87, timePerception: 90 }
];

export function ActivityChart() {
  const [selectedMetric, setSelectedMetric] = useState<keyof Omit<DailyActivity, 'date'>>('focusScore');
  const [timeRange, setTimeRange] = useState('7');
  const dailyProgress = useGameStats(state => state.dailyProgress);

  const metricColors = {
    focusScore: 'from-blue-500 to-blue-300',
    memoryScore: 'from-purple-500 to-purple-300',
    reactionTime: 'from-yellow-500 to-yellow-300',
    timePerception: 'from-green-500 to-green-300'
  };

  const metricLabels = {
    focusScore: 'Focus Score',
    memoryScore: 'Memory Score',
    reactionTime: 'Reaction Time',
    timePerception: 'Time Perception'
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Training Activity</h3>
          <p className="text-sm text-gray-500 mt-1">Your daily cognitive training progress</p>
        </div>
        <div className="flex gap-4">
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as keyof Omit<DailyActivity, 'date'>)}
          >
            {Object.entries(metricLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between gap-3">
        {dailyProgress.map((day, index) => {
          const value = day[selectedMetric];
          const height = `${value}%`;
          
          return (
            <div key={index} className="relative flex-1">
              <div 
                className={`rounded-t-lg bg-gradient-to-b ${metricColors[selectedMetric]}`}
                style={{ height }}
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
                {day.date}
              </div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-900">
                {value}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}