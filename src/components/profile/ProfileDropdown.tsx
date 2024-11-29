import React, { useState, useRef, useEffect } from 'react';
import { Settings, User, Trophy, Bell, HelpCircle, LogOut } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ProfileDropdownProps {
  userImage: string;
  userName: string;
  userLevel: number;
}

const menuItems = [
  { icon: User, label: 'My Profile', href: '#profile' },
  { icon: Trophy, label: 'Achievements', href: '#achievements' },
  { icon: Bell, label: 'Notifications', href: '#notifications' },
  { icon: Settings, label: 'Settings', href: '#settings' },
  { icon: HelpCircle, label: 'Help Center', href: '#help' },
];

export function ProfileDropdown({ userImage, userName, userLevel }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <img
          src={userImage}
          alt={userName}
          className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm object-cover"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700">{userName}</p>
          <p className="text-xs text-gray-500">Level {userLevel}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500 mt-0.5">john.doe@example.com</p>
          </div>

          <nav className="px-2 py-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </nav>

          <div className="border-t border-gray-100 px-2 py-2">
            <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors w-full">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}