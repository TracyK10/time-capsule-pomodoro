
import React from 'react';
import PomodoroTimer from '@/components/Timer/PomodoroTimer';

const Index = () => {
  return (
    <div className="min-h-screen wood-panel text-retro-cream">
      <header className="border-b border-retro-cream/20 p-4">
        <div className="container mx-auto">
          <h1 className="font-typewriter text-3xl md:text-4xl">Retro Pomodoro Timer</h1>
          <p className="font-typewriter text-retro-cream/80 mt-1">Your vintage productivity companion</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="paper-texture rounded-md shadow-md text-retro-brown min-h-[calc(100vh-10rem)]">
          <PomodoroTimer />
        </div>
      </main>
    </div>
  );
};

export default Index;
