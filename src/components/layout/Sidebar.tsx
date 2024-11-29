import React, { useState } from 'react';
import { Brain, BarChart2, Settings, Award, Calendar, LogOut, Gamepad2 } from 'lucide-react';
import { ScheduleModal } from '../schedule/ScheduleModal';

interface SidebarProps {
  onNavChange: (view: string) => void;
  currentView: string;
}

const navItems = [
  { icon: Brain, label: 'Training', id: 'training' },
  { icon: Gamepad2, label: 'Games', id: 'games' },
  { icon: BarChart2, label: 'Progress', id: 'progress' },
  { icon: Calendar, label: 'Schedule', id: 'schedule', modal: true },
  { icon: Award, label: 'Achievements', id: 'achievements' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export function Sidebar({ onNavChange, currentView }: SidebarProps) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleNavItemClick = (item: typeof navItems[0]) => {
    if (item.modal) {
      setIsScheduleModalOpen(true);
    } else {
      onNavChange(item.id);
    }
  };

  return (
    <>
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-200">
        <div className="flex items-center gap-3 px-6 h-[73px] border-b border-gray-200">
          <Brain className="w-8 h-8 text-indigo-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
            MemoryBrain
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavItemClick(item)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors w-full ${
                    currentView === item.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <button className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <ScheduleModal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} />
    </>
  );
}