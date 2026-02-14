import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Background from './components/Background';
import TimerRing from './components/TimerRing';
import ModeSelector from './components/ModeSelector';
import Controls from './components/Controls';
import SessionDots from './components/SessionDots';
import TaskList from './components/TaskList';
import Stats from './components/Stats';
import SettingsPanel from './components/SettingsPanel';
import useTimer from './hooks/useTimer';
import useTasks from './hooks/useTasks';

function App() {
  const timer = useTimer();
  const taskManager = useTasks();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showStats, setShowStats] = useState(true);

  // Increment pomodoro count on active task when work session completes
  useEffect(() => {
    if (timer.mode !== 'work' && taskManager.activeTask) {
      // A work session just ended — check if sessions increased
    }
  }, [timer.sessionsCompleted, taskManager.activeTask]);

  // Track previous sessions to detect completion
  const [prevSessions, setPrevSessions] = useState(timer.sessionsCompleted);
  useEffect(() => {
    if (timer.sessionsCompleted > prevSessions && taskManager.activeTask) {
      taskManager.incrementPomodoro(taskManager.activeTask.id);
    }
    setPrevSessions(timer.sessionsCompleted);
  }, [timer.sessionsCompleted]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    // Don't handle if typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        timer.isRunning ? timer.pause() : timer.start();
        break;
      case 'KeyR':
        if (!e.ctrlKey && !e.metaKey) {
          timer.reset();
        }
        break;
      case 'KeyS':
        if (!e.ctrlKey && !e.metaKey) {
          setSettingsOpen(prev => !prev);
        }
        break;
      case 'Digit1':
        if (!timer.isRunning) timer.switchMode('work');
        break;
      case 'Digit2':
        if (!timer.isRunning) timer.switchMode('shortBreak');
        break;
      case 'Digit3':
        if (!timer.isRunning) timer.switchMode('longBreak');
        break;
    }
  }, [timer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="app">
      <Background mode={timer.mode} />

      {/* Header */}
      <header className="app-header">
        <div className="app-logo">
          <span className="app-logo-icon">🍅</span>
          <span className="app-logo-text">
            Pomodoro<span className="app-logo-dot">.</span>
          </span>
        </div>

        <div className="header-actions">
          <button
            className="header-btn"
            onClick={() => setShowStats(prev => !prev)}
            title="İstatistikler"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20V10" />
              <path d="M12 20V4" />
              <path d="M6 20v-6" />
            </svg>
          </button>
          <button
            className="header-btn"
            onClick={() => setSettingsOpen(true)}
            title="Ayarlar (S)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-1.42 3.42 2 2 0 0 1-1.42-.59l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1.08 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.77 1.02 1.39 1.08H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Mode Selector */}
        <ModeSelector
          mode={timer.mode}
          onSwitch={timer.switchMode}
          isRunning={timer.isRunning}
        />

        {/* Active Task Label */}
        {taskManager.activeTask && (
          <div className="active-task-label">
            <div className="active-task-dot" />
            <span className="active-task-text">{taskManager.activeTask.text}</span>
          </div>
        )}

        {/* Timer Ring */}
        <TimerRing
          progress={timer.progress}
          mode={timer.mode}
          isRunning={timer.isRunning}
          timeLeft={timer.timeLeft}
        />

        {/* Session Dots */}
        <SessionDots
          sessionsCompleted={timer.sessionsCompleted}
          longBreakInterval={timer.settings.longBreakInterval}
        />

        {/* Controls */}
        <Controls
          isRunning={timer.isRunning}
          onStart={timer.start}
          onPause={timer.pause}
          onReset={timer.reset}
          progress={timer.progress}
          mode={timer.mode}
        />

        {/* Stats */}
        {showStats && (
          <Stats
            dailyStats={timer.dailyStats}
            sessionsCompleted={timer.sessionsCompleted}
          />
        )}

        {/* Task List */}
        <TaskList
          tasks={taskManager.tasks}
          onAdd={taskManager.addTask}
          onToggle={taskManager.toggleTask}
          onDelete={taskManager.deleteTask}
          onClearCompleted={taskManager.clearCompleted}
        />

        {/* Keyboard Shortcuts Hint */}
        <div className="shortcut-hint">
          <div className="shortcut-item">
            <kbd className="shortcut-key">Space</kbd>
            <span>Baslat/Durdur</span>
          </div>
          <div className="shortcut-item">
            <kbd className="shortcut-key">R</kbd>
            <span>Sifirla</span>
          </div>
          <div className="shortcut-item">
            <kbd className="shortcut-key">S</kbd>
            <span>Ayarlar</span>
          </div>
          <div className="shortcut-item">
            <kbd className="shortcut-key">1</kbd>
            <kbd className="shortcut-key">2</kbd>
            <kbd className="shortcut-key">3</kbd>
            <span>Mod sec</span>
          </div>
        </div>
      </main>

      {/* Settings Panel */}
      <SettingsPanel
        settings={timer.settings}
        onUpdate={timer.updateSettings}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}

export default App;
