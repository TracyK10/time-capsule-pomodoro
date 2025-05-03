
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  className?: string;
}

const TaskList: React.FC<TaskListProps> = ({ className }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Complete project proposal', completed: false },
    { id: 2, text: 'Review client feedback', completed: true },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className={cn("p-4 rounded-md", className)}>
      <h3 className="text-xl font-typewriter mb-4 font-bold text-retro-dark-brown">Tasks</h3>
      
      <form onSubmit={addTask} className="mb-4 flex">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a task..."
          className="retro-inset w-full py-2 px-3 font-typewriter text-retro-brown rounded-l-sm"
        />
        <button 
          type="submit" 
          className="bg-retro-brown text-retro-cream px-4 rounded-r-sm font-typewriter"
        >
          Add
        </button>
      </form>
      
      <div className="space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-center justify-between py-2 border-b border-retro-brown/20"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="mr-3 w-4 h-4 accent-retro-brown"
              />
              <span className={cn(
                "font-typewriter text-retro-brown",
                task.completed && "line-through opacity-60"
              )}>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-retro-brown/60 hover:text-retro-brown font-typewriter text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
