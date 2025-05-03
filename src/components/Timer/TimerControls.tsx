
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Stop } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerControlsProps {
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  className?: string;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isActive,
  onStart,
  onPause,
  onReset,
  className
}) => {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {!isActive ? (
        <button 
          onClick={onStart} 
          className="retro-button"
          aria-label="Start Timer"
        >
          <Play className="mr-2 h-5 w-5 inline" />
          Start
        </button>
      ) : (
        <button 
          onClick={onPause} 
          className="retro-button"
          aria-label="Pause Timer"
        >
          <Pause className="mr-2 h-5 w-5 inline" />
          Pause
        </button>
      )}
      
      <button 
        onClick={onReset} 
        className="retro-button"
        aria-label="Reset Timer"
      >
        <Stop className="mr-2 h-5 w-5 inline" />
        Reset
      </button>
    </div>
  );
};

export default TimerControls;
