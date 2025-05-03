
import React from 'react';
import { cn } from '@/lib/utils';

interface TimerSettingsProps {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  onPomodoroTimeChange: (time: number) => void;
  onShortBreakTimeChange: (time: number) => void;
  onLongBreakTimeChange: (time: number) => void;
  className?: string;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({
  pomodoroTime,
  shortBreakTime,
  longBreakTime,
  onPomodoroTimeChange,
  onShortBreakTimeChange,
  onLongBreakTimeChange,
  className
}) => {
  return (
    <div className={cn("p-4 rounded-md", className)}>
      <h3 className="text-xl font-typewriter mb-4 font-bold text-retro-dark-brown">Timer Settings</h3>
      
      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="pomodoroTime" className="text-sm font-typewriter text-retro-brown mb-1">
            Work Time (minutes)
          </label>
          <select
            id="pomodoroTime"
            value={pomodoroTime}
            onChange={(e) => onPomodoroTimeChange(Number(e.target.value))}
            className="retro-inset rounded py-1 px-2 font-typewriter"
          >
            {[25, 30, 35, 40, 45, 50, 55, 60].map((time) => (
              <option key={time} value={time}>
                {time} min
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="shortBreakTime" className="text-sm font-typewriter text-retro-brown mb-1">
            Short Break (minutes)
          </label>
          <select
            id="shortBreakTime"
            value={shortBreakTime}
            onChange={(e) => onShortBreakTimeChange(Number(e.target.value))}
            className="retro-inset rounded py-1 px-2 font-typewriter"
          >
            {[5, 8, 10].map((time) => (
              <option key={time} value={time}>
                {time} min
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="longBreakTime" className="text-sm font-typewriter text-retro-brown mb-1">
            Long Break (minutes)
          </label>
          <select
            id="longBreakTime"
            value={longBreakTime}
            onChange={(e) => onLongBreakTimeChange(Number(e.target.value))}
            className="retro-inset rounded py-1 px-2 font-typewriter"
          >
            {[15, 20, 25, 30].map((time) => (
              <option key={time} value={time}>
                {time} min
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimerSettings;
