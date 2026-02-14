import { useState, useRef, useCallback, useEffect } from 'react';
import { playStart, playPause, playComplete, playBreakEnd } from '../utils/sounds';

const MODES = {
  work: { label: 'Odaklan', defaultMinutes: 25 },
  shortBreak: { label: 'Kısa Mola', defaultMinutes: 5 },
  longBreak: { label: 'Uzun Mola', defaultMinutes: 15 },
};

const STORAGE_KEY = 'pomodoro-state';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export default function useTimer() {
  const saved = loadState();

  const [settings, setSettings] = useState(saved?.settings || {
    work: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    autoStartBreaks: false,
    autoStartWork: false,
    soundEnabled: true,
  });

  const [mode, setMode] = useState(saved?.mode || 'work');
  const [timeLeft, setTimeLeft] = useState(
    saved?.timeLeft ?? settings.work * 60
  );
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(
    saved?.sessionsCompleted || 0
  );
  const [dailyStats, setDailyStats] = useState(saved?.dailyStats || {
    date: new Date().toDateString(),
    workSessions: 0,
    totalFocusMinutes: 0,
  });

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const totalDuration = settings[mode] * 60;

  // Save state periodically
  useEffect(() => {
    saveState({ settings, mode, timeLeft, sessionsCompleted, dailyStats });
  }, [settings, mode, timeLeft, sessionsCompleted, dailyStats]);

  // Reset daily stats if new day
  useEffect(() => {
    const today = new Date().toDateString();
    if (dailyStats.date !== today) {
      setDailyStats({ date: today, workSessions: 0, totalFocusMinutes: 0 });
    }
  }, [dailyStats.date]);

  // Update document title
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const modeLabel = MODES[mode].label;
    document.title = isRunning
      ? `${timeStr} — ${modeLabel}`
      : `Pomodoro — Focus Timer`;
  }, [timeLeft, mode, isRunning]);

  const handleComplete = useCallback(() => {
    setIsRunning(false);
    clearInterval(intervalRef.current);

    if (mode === 'work') {
      if (settings.soundEnabled) playComplete();
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);
      setDailyStats(prev => ({
        ...prev,
        workSessions: prev.workSessions + 1,
        totalFocusMinutes: prev.totalFocusMinutes + settings.work,
      }));

      // Determine next break
      const nextMode = newSessions % settings.longBreakInterval === 0
        ? 'longBreak'
        : 'shortBreak';
      setMode(nextMode);
      setTimeLeft(settings[nextMode] * 60);

      if (settings.autoStartBreaks) {
        setTimeout(() => {
          setIsRunning(true);
        }, 500);
      }

      // Browser notification
      if (Notification.permission === 'granted') {
        new Notification('Pomodoro Tamamlandı! 🍅', {
          body: `Harika iş! ${MODES[nextMode].label} zamanı.`,
        });
      }
    } else {
      if (settings.soundEnabled) playBreakEnd();
      setMode('work');
      setTimeLeft(settings.work * 60);

      if (settings.autoStartWork) {
        setTimeout(() => {
          setIsRunning(true);
        }, 500);
      }

      if (Notification.permission === 'granted') {
        new Notification('Mola Bitti! ⚡', {
          body: 'Tekrar odaklanma zamanı.',
        });
      }
    }
  }, [mode, sessionsCompleted, settings]);

  // Timer tick
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - ((totalDuration - timeLeft) * 1000);
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const remaining = Math.max(0, totalDuration - elapsed);
        setTimeLeft(remaining);
        if (remaining <= 0) {
          handleComplete();
        }
      }, 200);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, totalDuration, handleComplete]);

  const start = useCallback(() => {
    if (settings.soundEnabled) playStart();
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsRunning(true);
  }, [settings.soundEnabled]);

  const pause = useCallback(() => {
    if (settings.soundEnabled) playPause();
    setIsRunning(false);
  }, [settings.soundEnabled]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(settings[mode] * 60);
  }, [mode, settings]);

  const switchMode = useCallback((newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(settings[newMode] * 60);
  }, [settings]);

  const updateSettings = useCallback((newSettings) => {
    setSettings(newSettings);
    if (!isRunning) {
      setTimeLeft(newSettings[mode] * 60);
    }
  }, [isRunning, mode]);

  const progress = 1 - (timeLeft / totalDuration);

  return {
    mode,
    timeLeft,
    isRunning,
    progress,
    sessionsCompleted,
    dailyStats,
    settings,
    totalDuration,
    MODES,
    start,
    pause,
    reset,
    switchMode,
    updateSettings,
  };
}
