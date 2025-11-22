/**
 * useTimer Hook
 * Manages countdown timer state with pause/resume capabilities
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerHookReturn {
  timeRemaining: number; // Seconds remaining
  state: TimerState;
  progress: number; // 0-100 percentage
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  addTime: (seconds: number) => void;
}

export interface TimerOptions {
  duration: number; // Duration in seconds
  onComplete?: () => void;
  onTick?: (timeRemaining: number) => void;
  autoStart?: boolean;
}

/**
 * Hook for managing a countdown timer
 */
export function useTimer(options: TimerOptions): TimerHookReturn {
  const { duration, onComplete, onTick, autoStart = false } = options;

  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [state, setState] = useState<TimerState>(autoStart ? 'running' : 'idle');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(duration);

  // Calculate progress percentage
  const progress = duration > 0 ? ((duration - timeRemaining) / duration) * 100 : 0;

  /**
   * Start the timer
   */
  const start = useCallback(() => {
    if (state === 'running') return;

    setState('running');
    startTimeRef.current = Date.now();
    pausedTimeRef.current = timeRemaining;
  }, [state, timeRemaining]);

  /**
   * Pause the timer
   */
  const pause = useCallback(() => {
    if (state !== 'running') return;

    setState('paused');
    pausedTimeRef.current = timeRemaining;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [state, timeRemaining]);

  /**
   * Resume the timer
   */
  const resume = useCallback(() => {
    if (state !== 'paused') return;

    setState('running');
    startTimeRef.current = Date.now();
  }, [state]);

  /**
   * Reset the timer
   */
  const reset = useCallback(() => {
    setState('idle');
    setTimeRemaining(duration);
    pausedTimeRef.current = duration;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [duration]);

  /**
   * Add time to the timer
   */
  const addTime = useCallback((seconds: number) => {
    setTimeRemaining(prev => {
      const newTime = prev + seconds;
      pausedTimeRef.current = newTime;
      return newTime;
    });
  }, []);

  /**
   * Timer tick logic
   */
  useEffect(() => {
    if (state !== 'running') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Start interval for countdown
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current!) / 1000);
      const remaining = Math.max(0, pausedTimeRef.current - elapsed);

      setTimeRemaining(remaining);

      // Call tick callback
      if (onTick) {
        onTick(remaining);
      }

      // Check if completed
      if (remaining <= 0) {
        setState('completed');

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        if (onComplete) {
          onComplete();
        }
      }
    }, 100); // Update every 100ms for smooth UI

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state, onComplete, onTick]);

  /**
   * Auto-start if specified
   */
  useEffect(() => {
    if (autoStart && state === 'idle') {
      start();
    }
  }, [autoStart, start, state]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeRemaining,
    state,
    progress,
    start,
    pause,
    resume,
    reset,
    addTime,
  };
}

/**
 * Format time remaining for display (MM:SS)
 */
export function formatTimeRemaining(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format time remaining for display with hours (HH:MM:SS)
 */
export function formatTimeRemainingWithHours(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
