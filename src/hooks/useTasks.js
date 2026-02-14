import { useState, useCallback, useEffect } from 'react';

const TASKS_KEY = 'pomodoro-tasks';

function loadTasks() {
  try {
    const saved = localStorage.getItem(TASKS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

export default function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((text) => {
    if (!text.trim()) return;
    setTasks(prev => [
      ...prev,
      {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        text: text.trim(),
        completed: false,
        pomodoros: 0,
        createdAt: Date.now(),
      }
    ]);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const incrementPomodoro = useCallback((id) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, pomodoros: t.pomodoros + 1 } : t
    ));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(t => !t.completed));
  }, []);

  const activeTask = tasks.find(t => !t.completed) || null;

  return {
    tasks,
    activeTask,
    addTask,
    toggleTask,
    deleteTask,
    incrementPomodoro,
    clearCompleted,
  };
}
