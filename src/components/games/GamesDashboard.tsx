import { useState, useEffect } from 'react';
import { Brain, Zap, Target, Clock, Shapes, Lightbulb, Dices } from 'lucide-react';
import { MemoryGame } from './MemoryMatch/MemoryGame';
import { FocusGame } from './FocusTarget/FocusGame';

interface GameCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  inDevelopment?: boolean;
}

interface GameStats {
  timeSpent: number;
  score: number;
}

const difficultyColors = {
  Easy: 'bg-green-50 text-green-600',
  Medium: 'bg-yellow-50 text-yellow-600',
  Hard: 'bg-red-50 text-red-600'
} as const;

const initialStats: Record<string, GameStats> = {
  'memory-match': { timeSpent: 0, score: 0 },
  'focus': { timeSpent: 0, score: 0 },
};

const games: GameCard[] = [
  {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards',
    icon: Brain,
    difficulty: 'Easy',
    category: 'Memory'
  },
  {
    id: 'focus',
    title: 'Focus Target',
    description: 'Click targets as they appear on screen',
    icon: Target,
    difficulty: 'Easy',
    category: 'Reaction Time'
  },
  {
    id: 'speed-math',
    title: 'Speed Math',
    description: 'Solve math problems against the clock',
    icon: Zap,
    difficulty: 'Medium',
    category: 'Mathematics',
    inDevelopment: true
  },
  {
    id: 'time',
    title: 'Time Challenge',
    description: 'Estimate time intervals accurately',
    icon: Clock,
    difficulty: 'Hard',
    category: 'Time Perception',
    inDevelopment: true
  },
  {
    id: '3d',
    title: '3D Rotation',
    description: 'Mentally rotate 3D shapes',
    icon: Shapes,
    difficulty: 'Hard',
    category: 'Spatial Reasoning',
    inDevelopment: true
  },
  {
    id: 'word',
    title: 'Word Association',
    description: 'Connect related words quickly',
    icon: Lightbulb,
    difficulty: 'Medium',
    category: 'Language',
    inDevelopment: true
  },
  {
    id: 'probability',
    title: 'Probability Master',
    description: 'Make decisions based on probability',
    icon: Dices,
    difficulty: 'Hard',
    category: 'Logic',
    inDevelopment: true
  }
];

export function GamesDashboard() {
  const [selectedGame, setSelectedGame] = useState<GameCard | null>(null);
  const [gameStats, setGameStats] = useState<Record<string, GameStats>>(initialStats);

  const handleGameSelect = (game: GameCard) => {
    setSelectedGame(game);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  const updateGameStats = (gameId: string, time: number, score: number) => {
    setGameStats((prevStats) => ({
      ...prevStats,
      [gameId]: {
        timeSpent: prevStats[gameId].timeSpent + time,
        score: Math.max(prevStats[gameId].score, score),
      },
    }));
  };

  if (selectedGame) {
    switch (selectedGame.id) {
      case 'memory-match':
        return <MemoryGame onBack={handleBackToGames} updateStats={updateGameStats} />;
      case 'focus':
        return <FocusGame onBack={handleBackToGames} updateStats={updateGameStats} />;
      default:
        return null;
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Brain Training Games</h1>
          <p className="text-gray-500">
            Challenge your cognitive abilities with our collection of brain training games. 
            More games are currently in development!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => handleGameSelect(game)}
              disabled={game.inDevelopment}
              className={`bg-white p-6 rounded-xl border border-gray-200 text-left transition-all duration-300
                ${game.inDevelopment 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:border-blue-500 hover:shadow-lg hover:-translate-y-1'}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-blue-50">
                  <game.icon className="w-6 h-6 text-blue-500" />
                </div>
                {game.inDevelopment && (
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{game.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{game.description}</p>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[game.difficulty]}`}>
                  {game.difficulty}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                  {game.category}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Time Spent: {gameStats[game.id]?.timeSpent || 0} seconds</p>
                <p className="text-sm text-gray-600">Score: {gameStats[game.id]?.score || 0}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
