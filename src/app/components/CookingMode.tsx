/**
 * CookingMode Component
 * Step-by-step cooking interface with integrated timers
 */

import React, { useState, useEffect } from 'react';
import { SavedRecipe, RecipeStep } from '../types/recipe-library';
import { StepTimer } from './StepTimer';
import { enhanceInstructionsWithTimers } from '../utils/timer-extraction';
import { markAsCooked } from '../utils/recipe-library-storage';

interface CookingModeProps {
  recipe: SavedRecipe;
  onClose: () => void;
}

export function CookingMode({ recipe, onClose }: CookingModeProps) {
  // Convert legacy instructions to steps if needed
  const steps: RecipeStep[] = recipe.steps || enhanceInstructionsWithTimers(recipe.instructions);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [hasMarkedAsCooked, setHasMarkedAsCooked] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const allStepsComplete = completedSteps.size === steps.length;

  /**
   * Navigate to next step
   */
  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  /**
   * Navigate to previous step
   */
  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  /**
   * Mark current step as complete
   */
  const handleMarkComplete = () => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      newSet.add(currentStepIndex);
      return newSet;
    });

    // Auto-advance to next step
    if (!isLastStep) {
      setTimeout(() => handleNext(), 500);
    }
  };

  /**
   * Unmark current step as complete
   */
  const handleMarkIncomplete = () => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentStepIndex);
      return newSet;
    });
  };

  /**
   * Jump to specific step
   */
  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  /**
   * Keyboard navigation
   */
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isLastStep) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && !isFirstStep) {
        handlePrevious();
      } else if (e.key === ' ') {
        e.preventDefault();
        const isComplete = completedSteps.has(currentStepIndex);
        if (isComplete) {
          handleMarkIncomplete();
        } else {
          handleMarkComplete();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStepIndex, isLastStep, isFirstStep, completedSteps]);

  /**
   * Mark recipe as cooked when all steps are completed
   */
  useEffect(() => {
    if (allStepsComplete && !hasMarkedAsCooked) {
      markAsCooked(recipe.id);
      setHasMarkedAsCooked(true);
    }
  }, [allStepsComplete, hasMarkedAsCooked, recipe.id]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-y-auto z-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b-4 border-amber-300 shadow-lg z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
                title="Exit Cooking Mode"
              >
                <svg className="w-6 h-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-amber-900">{recipe.title}</h1>
                <p className="text-sm text-amber-700">Cooking Mode</p>
              </div>
            </div>

            {/* Progress */}
            <div className="text-right">
              <div className="text-sm text-amber-700 font-medium">
                Step {currentStepIndex + 1} of {steps.length}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-48 h-2 bg-amber-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-amber-700 font-bold">
                  {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Step List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-amber-200 shadow-lg p-6 sticky top-28">
              <h2 className="text-lg font-bold text-amber-900 mb-4">All Steps</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {steps.map((step, index) => {
                  const isComplete = completedSteps.has(index);
                  const isCurrent = index === currentStepIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => handleJumpToStep(index)}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-md'
                          : isComplete
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          isCurrent ? 'bg-white/20' : isComplete ? 'bg-green-500 text-white' : 'bg-amber-200 text-amber-900'
                        }`}>
                          {isComplete ? '✓' : index + 1}
                        </div>
                        <div className="flex-1 text-sm line-clamp-2">
                          {step.text}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Current Step */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Current Step Card */}
              <div className="bg-white rounded-2xl border-4 border-amber-300 shadow-xl p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                      {currentStepIndex + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl text-amber-900 leading-relaxed font-medium">
                      {currentStep.text}
                    </p>
                    {currentStep.notes && (
                      <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                        <p className="text-sm text-blue-800">
                          <span className="font-bold">💡 Tip: </span>
                          {currentStep.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step Complete Toggle */}
                <div className="flex items-center justify-center mb-6">
                  {completedSteps.has(currentStepIndex) ? (
                    <button
                      onClick={handleMarkIncomplete}
                      className="px-8 py-4 bg-gradient-to-br from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Step Complete
                    </button>
                  ) : (
                    <button
                      onClick={handleMarkComplete}
                      className="px-8 py-4 bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all"
                    >
                      Mark Step Complete
                    </button>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={handlePrevious}
                    disabled={isFirstStep}
                    className={`px-6 py-3 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 ${
                      isFirstStep
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-br from-amber-500 to-orange-500 text-white hover:shadow-xl hover:from-amber-600 hover:to-orange-600'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Previous
                  </button>

                  <div className="text-sm text-amber-700">
                    Use ← → arrow keys to navigate
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={isLastStep}
                    className={`px-6 py-3 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 ${
                      isLastStep
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-br from-amber-500 to-orange-500 text-white hover:shadow-xl hover:from-amber-600 hover:to-orange-600'
                    }`}
                  >
                    Next
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Timer (if step has one) */}
              {currentStep.suggestedTimer && (
                <StepTimer
                  timerInfo={currentStep.suggestedTimer}
                  onComplete={() => {
                    // Show notification
                    if ('Notification' in window && Notification.permission === 'granted') {
                      new Notification(`${recipe.title} - Timer Complete`, {
                        body: `Step ${currentStepIndex + 1}: ${currentStep.text.substring(0, 100)}...`,
                        icon: '/cooking-companion-icon.png',
                      });
                    }
                  }}
                />
              )}

              {/* Completion Celebration */}
              {allStepsComplete && (
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-8 text-center text-white shadow-2xl animate-pulse">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold mb-2">Recipe Complete!</h2>
                  <p className="text-lg mb-6">Great job! Your {recipe.title} is ready!</p>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-white text-green-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Exit Cooking Mode
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Request notification permission on mount
 */
if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}
