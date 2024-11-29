import React, { useState } from 'react';
import { Brain, Zap, Trophy, Target } from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { StatsCard } from './components/dashboard/StatsCard';
import { ActivityChart } from './components/dashboard/ActivityChart';
import { RecommendedExercises } from './components/dashboard/RecommendedExercises';
import { ProfileStats } from './components/profile/ProfileStats';
import { GamesDashboard } from './components/games/GamesDashboard';
import { useHoverCursor } from './hooks/useHoverCursor';

function App() {
  useHoverCursor();
  const [currentView, setCurrentView] = useState('training');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        onNavChange={setCurrentView} 
        currentView={currentView} 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={setIsMobileMenuOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMobileMenuToggle={setIsMobileMenuOpen}
          username="John" 
        />
        
        <main className="flex-1 overflow-y-auto">
          {currentView === 'training' ? (
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-2 mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 gradient-animate bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Welcome back, John!
                  </h1>
                  <p className="text-gray-500">Track your progress and continue improving your cognitive abilities.</p>
                </div>
                
                <div className="mb-8">
                  <ProfileStats />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatsCard
                    title="Daily Score"
                    value="856"
                    change="+12.5%"
                    isPositive={true}
                    icon={Brain}
                  />
                  <StatsCard
                    title="Current Streak"
                    value="7 days"
                    change="+2 days"
                    isPositive={true}
                    icon={Zap}
                  />
                  <StatsCard
                    title="Completion Rate"
                    value="92%"
                    change="+5.2%"
                    isPositive={true}
                    icon={Target}
                  />
                  <StatsCard
                    title="Total Points"
                    value="12,543"
                    change="+1,200"
                    isPositive={true}
                    icon={Trophy}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ActivityChart />
                  <RecommendedExercises />
                </div>
              </div>
            </div>
          ) : currentView === 'games' ? (
            <GamesDashboard />
          ) : (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">Coming Soon</h2>
              <p className="text-gray-500">This section is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;