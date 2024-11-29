import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  reset?: boolean;
  onReset?: () => void;
}

export function Timer({ isRunning, reset, onReset }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (reset) {
      setTime(0);
      if (onReset) onReset();
    }
  }, [reset, onReset]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
      <span className="text-base sm:text-lg font-semibold text-gray-900">{formatTime(time)}</span>
    </div>
  );
}
