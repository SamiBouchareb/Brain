import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GameStats {
  totalSessions: number;
  bestStreak: number;
  timeSpent: number; // in minutes
  achievements: number;
  maxAchievements: number;
  dailyScore: number;
  currentStreak: number;
  completionRate: number;
  totalPoints: number;
  lastWeekStats: {
    dailyScore: number;
    streak: number;
    completionRate: number;
    points: number;
  };
  dailyProgress: Array<{
    date: string;
    focusScore: number;
    memoryScore: number;
    reactionTime: number;
    timePerception: number;
  }>;
}

type GameStatsActions = {
  updateGameResult: (gameId: string, score: number, timeSpent: number) => void;
  updateStreak: () => void;
  resetDailyStats: () => void;
};

const initialStats: GameStats = {
  totalSessions: 248,
  bestStreak: 12,
  timeSpent: 86 * 60, // 86 hours in minutes
  achievements: 24,
  maxAchievements: 50,
  dailyScore: 856,
  currentStreak: 7,
  completionRate: 92,
  totalPoints: 12543,
  lastWeekStats: {
    dailyScore: 761,
    streak: 5,
    completionRate: 87,
    points: 11343
  },
  dailyProgress: [
    { date: 'Mon', focusScore: 85, memoryScore: 75, reactionTime: 82, timePerception: 70 },
    { date: 'Tue', focusScore: 90, memoryScore: 80, reactionTime: 85, timePerception: 75 },
    { date: 'Wed', focusScore: 88, memoryScore: 85, reactionTime: 80, timePerception: 80 },
    { date: 'Thu', focusScore: 92, memoryScore: 78, reactionTime: 88, timePerception: 85 },
    { date: 'Fri', focusScore: 95, memoryScore: 82, reactionTime: 90, timePerception: 82 },
    { date: 'Sat', focusScore: 91, memoryScore: 88, reactionTime: 85, timePerception: 88 },
    { date: 'Sun', focusScore: 93, memoryScore: 85, reactionTime: 87, timePerception: 90 }
  ]
};

export const useGameStats = create<GameStats & GameStatsActions>()(
  persist(
    (set) => ({
      ...initialStats,

      updateGameResult: (gameId, score, timeSpent) => 
        set((state) => {
          const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
          const dailyProgress = [...state.dailyProgress];
          const todayIndex = dailyProgress.findIndex(d => d.date === today);
          
          if (todayIndex !== -1) {
            switch (gameId) {
              case 'focus':
                dailyProgress[todayIndex].focusScore = score;
                break;
              case 'memory-match':
                dailyProgress[todayIndex].memoryScore = score;
                break;
            }
          }

          return {
            ...state,
            timeSpent: state.timeSpent + timeSpent,
            totalSessions: state.totalSessions + 1,
            totalPoints: state.totalPoints + score,
            dailyScore: Math.round((state.dailyScore + score) / 2),
            dailyProgress,
          };
        }),

      updateStreak: () => 
        set((state) => {
          const newStreak = state.currentStreak + 1;
          return {
            ...state,
            currentStreak: newStreak,
            bestStreak: Math.max(state.bestStreak, newStreak),
          };
        }),

      resetDailyStats: () => 
        set((state) => ({
          ...state,
          lastWeekStats: {
            dailyScore: state.dailyScore,
            streak: state.currentStreak,
            completionRate: state.completionRate,
            points: state.totalPoints
          }
        }))
    }),
    {
      name: 'brain-training-stats',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
