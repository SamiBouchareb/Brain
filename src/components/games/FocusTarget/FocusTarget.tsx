import React from 'react';
import { motion } from 'framer-motion';

interface FocusTargetProps {
  x: number;
  y: number;
  size: number;
  onHit: () => void;
}

export function FocusTarget({ x, y, size, onHit }: FocusTargetProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onHit();
      }}
    >
      {/* Target design */}
      <div className="absolute inset-0">
        {/* Outer ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-blue-500"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner circle */}
        <div className="absolute inset-[15%] rounded-full bg-blue-500/10">
          <div className="absolute inset-[20%] rounded-full bg-blue-500/20" />
        </div>

        {/* Center dot */}
        <div className="absolute inset-[45%] rounded-full bg-blue-500 shadow-sm" />
      </div>

      {/* Click effect */}
      <motion.div
        className="absolute inset-0"
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-full h-full rounded-full border border-blue-500/30"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ 
            scale: [1, 1.2],
            opacity: [0.3, 0]
          }}
          transition={{ 
            duration: 0.8,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}
