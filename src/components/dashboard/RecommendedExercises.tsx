import React from 'react';
import { Brain, Zap, Timer, ChevronRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

const exercises = [
  {
    title: 'Pattern Recognition',
    description: 'Enhance visual memory and processing speed',
    duration: '15 min',
    difficulty: 'Medium',
    icon: Brain,
  },
  {
    title: 'Number Sequence',
    description: 'Improve working memory and concentration',
    duration: '10 min',
    difficulty: 'Easy',
    icon: Zap,
  },
  {
    title: 'Word Association',
    description: 'Boost verbal memory and cognitive flexibility',
    duration: '20 min',
    difficulty: 'Hard',
    icon: Timer,
  },
];

const difficultyColors = {
  Easy: 'success',
  Medium: 'primary',
  Hard: 'danger',
} as const;

export function RecommendedExercises() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Recommended Exercises</h3>
          <p className="text-sm text-gray-500 mt-1">Personalized for your level</p>
        </div>
      </div>
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.title}
            className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200 hover-pulse"
          >
            <div className="p-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition-all duration-300">
              <exercise.icon className="w-6 h-6 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {exercise.title}
                </h4>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-all duration-300 group-hover:translate-x-1" />
              </div>
              <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700 transition-colors duration-300">
                {exercise.description}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-sm text-gray-500 flex items-center gap-1 group-hover:text-gray-600 transition-colors duration-300">
                  <Timer className="w-4 h-4" />
                  {exercise.duration}
                </span>
                <Badge variant={difficultyColors[exercise.difficulty as keyof typeof difficultyColors]}>
                  {exercise.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}