import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMobileMenuToggle: (isOpen: boolean) => void;
  username?: string;
}

export function Header({ onMobileMenuToggle, username }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => onMobileMenuToggle(true)} 
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Open mobile menu"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Page Title or Logo */}
        <div className="flex-1 md:flex-none text-center md:text-left">
          <h1 className="text-lg font-semibold text-gray-800">
            {username ? `Welcome, ${username}` : 'MemoryBrain'}
          </h1>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button 
            className="relative p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="User Profile"
          >
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}