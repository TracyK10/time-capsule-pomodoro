
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  isActive: boolean;
  className?: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  minutes, 
  seconds, 
  isActive,
  className 
}) => {
  const [tickClass, setTickClass] = useState('');

  // Create the ticking effect when timer is active
  useEffect(() => {
    if (!isActive) {
      setTickClass('');
      return;
    }
    
    setTickClass('animate-tick');
  }, [isActive]);

  return (
    <div className={cn(
      "retro-inset rounded-md p-6 flex items-center justify-center",
      className
    )}>
      <div 
        className={cn(
          "font-typewriter text-8xl tabular-nums tracking-wider text-retro-dark-brown",
          tickClass
        )}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

export default TimerDisplay;
