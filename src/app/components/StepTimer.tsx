/**
 * StepTimer Component
 * Visual timer display with countdown and controls
 */

import React from 'react';
import { useTimer, formatTimeRemainingWithHours } from '../hooks/useTimer';
import { TimerInfo } from '../types/recipe-library';

interface StepTimerProps {
  timerInfo: TimerInfo;
  onComplete?: () => void;
  className?: string;
}

export function StepTimer({ timerInfo, onComplete, className = '' }: StepTimerProps) {
  const { duration, label } = timerInfo;

  const timer = useTimer({
    duration,
    onComplete: () => {
      // Play completion sound/notification
      playTimerSound();
      if (onComplete) {
        onComplete();
      }
    },
    autoStart: timerInfo.autoStart || false,
  });

  const { timeRemaining, state, progress, start, pause, resume, reset, addTime } = timer;

  const isRunning = state === 'running';
  const isPaused = state === 'paused';
  const isCompleted = state === 'completed';
  const isIdle = state === 'idle';

  return (
    <div className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 shadow-lg ${className}`}>
      {/* Timer Label */}
      {label && (
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-amber-800">{label} Timer</h3>
        </div>
      )}

      {/* Circular Progress Timer */}
      <div className="relative flex items-center justify-center mb-6">
        <svg className="transform -rotate-90" width="200" height="200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#fef3c7"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={isCompleted ? '#22c55e' : isRunning ? '#f59e0b' : '#d97706'}
            strokeWidth="12"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        {/* Time Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-amber-900 font-mono">
            {formatTimeRemainingWithHours(timeRemaining)}
          </div>
          {isCompleted && (
            <div className="text-green-600 font-bold text-lg mt-2 animate-pulse">
              Time's Up! ✓
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {isIdle && (
          <button
            onClick={start}
            className="px-8 py-3 bg-gradient-to-br from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
          >
            ▶ Start Timer
          </button>
        )}

        {isRunning && (
          <button
            onClick={pause}
            className="px-8 py-3 bg-gradient-to-br from-yellow-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105"
          >
            ⏸ Pause
          </button>
        )}

        {isPaused && (
          <button
            onClick={resume}
            className="px-8 py-3 bg-gradient-to-br from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
          >
            ▶ Resume
          </button>
        )}

        {(isRunning || isPaused || isCompleted) && (
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-br from-gray-500 to-gray-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105"
          >
            ↻ Reset
          </button>
        )}
      </div>

      {/* Quick Add Time Buttons */}
      {(isRunning || isPaused) && (
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-amber-700 font-medium">Add time:</span>
          <button
            onClick={() => addTime(60)}
            className="px-3 py-1 bg-amber-200 text-amber-900 rounded-lg hover:bg-amber-300 transition-colors text-sm font-medium"
          >
            +1 min
          </button>
          <button
            onClick={() => addTime(300)}
            className="px-3 py-1 bg-amber-200 text-amber-900 rounded-lg hover:bg-amber-300 transition-colors text-sm font-medium"
          >
            +5 min
          </button>
          <button
            onClick={() => addTime(600)}
            className="px-3 py-1 bg-amber-200 text-amber-900 rounded-lg hover:bg-amber-300 transition-colors text-sm font-medium"
          >
            +10 min
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Play a sound when timer completes
 */
function playTimerSound() {
  try {
    // Use Web Audio API to generate a pleasant chime sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Pleasant chime frequency
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    // Fade out effect
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);

    // Play multiple chimes
    setTimeout(() => {
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      osc2.frequency.value = 600;
      osc2.type = 'sine';
      gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      osc2.start(audioContext.currentTime);
      osc2.stop(audioContext.currentTime + 1);
    }, 300);
  } catch (error) {
    console.warn('Could not play timer sound:', error);
  }
}
