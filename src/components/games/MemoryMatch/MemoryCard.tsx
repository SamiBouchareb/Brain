import React from 'react';
import { motion } from 'framer-motion';

interface MemoryCardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function MemoryCard({ emoji, isFlipped, isMatched, onClick }: MemoryCardProps) {
  return (
    <motion.div
      className="relative w-[90px] h-[90px] sm:w-24 sm:h-24 cursor-pointer"
      whileHover={{ scale: isFlipped || isMatched ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className={`w-full h-full rounded-xl absolute backface-hidden transition-all duration-500 ${
          isFlipped || isMatched ? 'rotate-y-180' : ''
        }`}
        initial={false}
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md flex items-center justify-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-lg"></div>
        </div>
      </motion.div>
      
      <motion.div
        className={`w-full h-full rounded-xl absolute backface-hidden transition-all duration-500 ${
          isFlipped || isMatched ? '' : '-rotate-y-180'
        }`}
        initial={false}
      >
        <div className={`w-full h-full bg-white rounded-xl shadow-md flex items-center justify-center text-2xl sm:text-4xl ${
          isMatched ? 'opacity-50' : ''
        }`}>
          {emoji}
        </div>
      </motion.div>
    </motion.div>
  );
}
