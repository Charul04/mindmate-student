import { useState, useEffect, useRef } from 'react';

export interface TimerState {
  isRunning: boolean;
  timer: number;
  initialTime: number;
  mode: 'work' | 'break';
  sessionStartTime: Date | null;
  focusMinutes: number;
  breakMinutes: number;
}

// Global timer state that persists across component mounts/unmounts
let globalTimerState: TimerState = {
  isRunning: false,
  timer: 1500, // 25 minutes
  initialTime: 1500,
  mode: 'work',
  sessionStartTime: null,
  focusMinutes: 25,
  breakMinutes: 5,
};

let globalInterval: NodeJS.Timeout | null = null;
let listeners: Set<() => void> = new Set();

// Notify all listening components of state changes
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

// Background timer service
export const backgroundTimerService = {
  getState: () => ({ ...globalTimerState }),
  
  setState: (newState: Partial<TimerState>) => {
    globalTimerState = { ...globalTimerState, ...newState };
    notifyListeners();
  },

  start: (onComplete: () => void) => {
    if (globalTimerState.isRunning) return;
    
    globalTimerState.isRunning = true;
    globalTimerState.sessionStartTime = new Date();
    notifyListeners();
    
    globalInterval = setInterval(() => {
      globalTimerState.timer -= 1;
      
      if (globalTimerState.timer <= 0) {
        backgroundTimerService.stop();
        onComplete();
      }
      
      notifyListeners();
    }, 1000);
  },

  pause: () => {
    globalTimerState.isRunning = false;
    if (globalInterval) {
      clearInterval(globalInterval);
      globalInterval = null;
    }
    notifyListeners();
  },

  stop: () => {
    globalTimerState.isRunning = false;
    if (globalInterval) {
      clearInterval(globalInterval);
      globalInterval = null;
    }
    notifyListeners();
  },

  reset: () => {
    backgroundTimerService.stop();
    const newTime = globalTimerState.mode === 'work' 
      ? globalTimerState.focusMinutes * 60 
      : globalTimerState.breakMinutes * 60;
    
    globalTimerState.timer = newTime;
    globalTimerState.initialTime = newTime;
    globalTimerState.sessionStartTime = null;
    notifyListeners();
  },

  switchMode: (mode: 'work' | 'break') => {
    backgroundTimerService.stop();
    globalTimerState.mode = mode;
    const newTime = mode === 'work' 
      ? globalTimerState.focusMinutes * 60 
      : globalTimerState.breakMinutes * 60;
    
    globalTimerState.timer = newTime;
    globalTimerState.initialTime = newTime;
    globalTimerState.sessionStartTime = null;
    notifyListeners();
  },

  updateSettings: (focusMinutes: number, breakMinutes: number) => {
    globalTimerState.focusMinutes = focusMinutes;
    globalTimerState.breakMinutes = breakMinutes;
    
    if (!globalTimerState.isRunning) {
      const newTime = globalTimerState.mode === 'work' ? focusMinutes * 60 : breakMinutes * 60;
      globalTimerState.timer = newTime;
      globalTimerState.initialTime = newTime;
    }
    
    notifyListeners();
  },

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  cleanup: () => {
    if (globalInterval) {
      clearInterval(globalInterval);
      globalInterval = null;
    }
  }
};

// Hook to use the background timer
export const useBackgroundTimer = () => {
  const [state, setState] = useState(globalTimerState);
  const forceUpdate = useRef(0);

  useEffect(() => {
    const unsubscribe = backgroundTimerService.subscribe(() => {
      setState({ ...globalTimerState });
      forceUpdate.current += 1;
    });

    // Sync initial state
    setState({ ...globalTimerState });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    ...state,
    start: backgroundTimerService.start,
    pause: backgroundTimerService.pause,
    stop: backgroundTimerService.stop,
    reset: backgroundTimerService.reset,
    switchMode: backgroundTimerService.switchMode,
    updateSettings: backgroundTimerService.updateSettings,
    progressPercentage: ((state.initialTime - state.timer) / state.initialTime) * 100,
  };
};

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    backgroundTimerService.cleanup();
  });
}