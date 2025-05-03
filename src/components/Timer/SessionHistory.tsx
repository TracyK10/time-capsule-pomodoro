
import React from 'react';
import { cn } from '@/lib/utils';

interface Session {
  id: number;
  type: 'work' | 'shortBreak' | 'longBreak';
  startTime: Date;
  duration: number; // in minutes
  completed: boolean;
}

interface SessionHistoryProps {
  sessions: Session[];
  className?: string;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions, className }) => {
  const getSessionTypeText = (type: 'work' | 'shortBreak' | 'longBreak') => {
    switch (type) {
      case 'work':
        return 'Work';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  return (
    <div className={cn("p-4", className)}>
      <h3 className="text-xl font-typewriter mb-4 font-bold text-retro-dark-brown">Session History</h3>
      
      {sessions.length === 0 ? (
        <p className="font-typewriter text-retro-brown text-sm italic">No sessions yet.</p>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div 
              key={session.id} 
              className={cn(
                "retro-inset p-3 rounded",
                session.completed ? "border-retro-green" : "border-retro-orange"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="font-typewriter text-retro-brown">
                  {getSessionTypeText(session.type)}
                </span>
                <span className="text-xs text-retro-brown font-typewriter">
                  {session.completed ? "Completed" : "Interrupted"}
                </span>
              </div>
              <div className="flex justify-between text-xs text-retro-brown/80 font-typewriter mt-1">
                <span>
                  {session.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span>{session.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionHistory;
