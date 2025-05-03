
import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerSettings from './TimerSettings';
import SessionHistory from './SessionHistory';
import TaskList from './TaskList';
import { useToast } from '@/components/ui/use-toast';
import { PanelRight } from 'lucide-react';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface Session {
  id: number;
  type: TimerMode;
  startTime: Date;
  duration: number;
  completed: boolean;
}

const PomodoroTimer: React.FC = () => {
  const { toast } = useToast();
  
  // Timer settings
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  
  // Current timer state
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(pomodoroTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Handle mode tabs
  const handleModeChange = (newMode: TimerMode) => {
    // Don't switch mode if timer is active
    if (isActive) {
      toast({
        title: "Pause timer first",
        description: "Please pause the timer before switching modes.",
      });
      return;
    }
    
    setMode(newMode);
    
    // Set appropriate time based on mode
    switch (newMode) {
      case 'work':
        setTimeLeft(pomodoroTime * 60);
        break;
      case 'shortBreak':
        setTimeLeft(shortBreakTime * 60);
        break;
      case 'longBreak':
        setTimeLeft(longBreakTime * 60);
        break;
    }
  };
  
  // Start the timer
  const startTimer = () => {
    setIsActive(true);
    
    // Create a new session
    const newSession = {
      id: Date.now(),
      type: mode,
      startTime: new Date(),
      duration: mode === 'work' ? pomodoroTime : mode === 'shortBreak' ? shortBreakTime : longBreakTime,
      completed: false
    };
    
    setCurrentSession(newSession);
  };
  
  // Pause the timer
  const pauseTimer = () => {
    setIsActive(false);
    
    // If there was a session in progress, mark it as incomplete
    if (currentSession) {
      const updatedSession = { ...currentSession, completed: false };
      setSessions([updatedSession, ...sessions]);
      setCurrentSession(null);
    }
  };
  
  // Reset the timer
  const resetTimer = () => {
    setIsActive(false);
    
    // Reset time based on current mode
    switch (mode) {
      case 'work':
        setTimeLeft(pomodoroTime * 60);
        break;
      case 'shortBreak':
        setTimeLeft(shortBreakTime * 60);
        break;
      case 'longBreak':
        setTimeLeft(longBreakTime * 60);
        break;
    }
    
    // If there was a session in progress, mark it as incomplete
    if (currentSession) {
      const updatedSession = { ...currentSession, completed: false };
      setSessions([updatedSession, ...sessions]);
      setCurrentSession(null);
    }
  };
  
  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer completed
      setIsActive(false);
      
      // Notify user
      toast({
        title: `${mode === 'work' ? 'Work' : mode === 'shortBreak' ? 'Short break' : 'Long break'} completed!`,
        description: "Time to take a break!",
      });
      
      // If there was a session in progress, mark it as complete
      if (currentSession) {
        const completedSession = { ...currentSession, completed: true };
        setSessions([completedSession, ...sessions]);
        setCurrentSession(null);
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, currentSession, sessions, toast]);
  
  // Update time left when settings change
  useEffect(() => {
    if (!isActive) {
      switch (mode) {
        case 'work':
          setTimeLeft(pomodoroTime * 60);
          break;
        case 'shortBreak':
          setTimeLeft(shortBreakTime * 60);
          break;
        case 'longBreak':
          setTimeLeft(longBreakTime * 60);
          break;
      }
    }
  }, [pomodoroTime, shortBreakTime, longBreakTime, mode, isActive]);
  
  return (
    <div className="flex flex-col md:flex-row w-full h-full relative">
      {/* Main Timer Area */}
      <div className="flex-1 relative flex flex-col">
        <div className="flex-1 p-6 flex flex-col">
          {/* Mode Tabs */}
          <div className="flex border-b border-retro-brown/30 mb-8">
            <button
              className={`py-2 px-4 font-typewriter transition-colors ${
                mode === 'work'
                  ? 'text-retro-brown border-b-2 border-retro-brown'
                  : 'text-retro-brown/60 hover:text-retro-brown'
              }`}
              onClick={() => handleModeChange('work')}
            >
              Work
            </button>
            <button
              className={`py-2 px-4 font-typewriter transition-colors ${
                mode === 'shortBreak'
                  ? 'text-retro-brown border-b-2 border-retro-brown'
                  : 'text-retro-brown/60 hover:text-retro-brown'
              }`}
              onClick={() => handleModeChange('shortBreak')}
            >
              Short Break
            </button>
            <button
              className={`py-2 px-4 font-typewriter transition-colors ${
                mode === 'longBreak'
                  ? 'text-retro-brown border-b-2 border-retro-brown'
                  : 'text-retro-brown/60 hover:text-retro-brown'
              }`}
              onClick={() => handleModeChange('longBreak')}
            >
              Long Break
            </button>
          </div>
          
          {/* Timer Display */}
          <div className="flex-1 flex flex-col justify-center">
            <TimerDisplay 
              minutes={minutes} 
              seconds={seconds} 
              isActive={isActive}
              className="max-w-xl mx-auto w-full mb-12"
            />
            
            <TimerControls 
              isActive={isActive}
              onStart={startTimer}
              onPause={pauseTimer}
              onReset={resetTimer}
              className="mx-auto mb-8"
            />
          </div>
          
          {/* Toggle Sidebar Button (Mobile) */}
          <div className="md:hidden">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="retro-button w-full"
            >
              {sidebarOpen ? 'Hide Settings' : 'Show Settings'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Sidebar Toggle Button (Always visible when sidebar is hidden) */}
      {!sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 right-4 md:right-0 md:mr-2 w-10 h-10 flex items-center justify-center rounded bg-retro-cream/90 text-retro-brown border border-retro-brown/30 hover:bg-retro-cream transition-colors"
          aria-label="Show Sidebar"
        >
          <PanelRight className="h-5 w-5" />
        </button>
      )}
      
      {/* Sidebar */}
      <div 
        className={`border-t md:border-l md:border-t-0 border-retro-brown/30 paper-texture overflow-y-auto
          transition-all duration-300 ${sidebarOpen ? 'max-h-[70vh] md:max-h-none md:w-80' : 'max-h-0 md:w-0'}`}
      >
        <div className="p-4">
          <div className="hidden md:block">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="retro-button text-sm w-full mb-4"
            >
              {sidebarOpen ? 'Hide Sidebar ›' : '‹ Show Sidebar'}
            </button>
          </div>
          
          <div className="space-y-6">
            <TimerSettings
              pomodoroTime={pomodoroTime}
              shortBreakTime={shortBreakTime}
              longBreakTime={longBreakTime}
              onPomodoroTimeChange={setPomodoroTime}
              onShortBreakTimeChange={setShortBreakTime}
              onLongBreakTimeChange={setLongBreakTime}
            />
            
            <TaskList />
            
            <SessionHistory sessions={sessions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
