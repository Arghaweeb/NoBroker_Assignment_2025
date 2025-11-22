'use client';

import React, { useState } from 'react';
import {
  BookOpenIcon,
  SparklesIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import FridgeApp from './FridgeApp';
import RecipeLibrary from './RecipeLibrary';

type AppScreen = 'scanner' | 'library';

export default function CookingCompanionApp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('scanner');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-xl border-b-4 border-orange-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="text-3xl">🍳</div>
              <div>
                <h1 className="text-xl font-bold text-white font-serif">
                  Cooking Companion
                </h1>
                <p className="text-xs text-orange-100 hidden sm:block">
                  Your personal kitchen assistant
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setCurrentScreen('scanner')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all ${
                  currentScreen === 'scanner'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <SparklesIcon className="w-5 h-5" />
                Smart Scanner
              </button>

              <button
                onClick={() => setCurrentScreen('library')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all ${
                  currentScreen === 'library'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <BookOpenIcon className="w-5 h-5" />
                Recipe Library
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button
                onClick={() => {
                  setCurrentScreen('scanner');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  currentScreen === 'scanner'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <SparklesIcon className="w-5 h-5" />
                Smart Scanner
              </button>

              <button
                onClick={() => {
                  setCurrentScreen('library');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  currentScreen === 'library'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <BookOpenIcon className="w-5 h-5" />
                Recipe Library
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentScreen === 'scanner' ? (
          <FridgeApp onNavigateToLibrary={() => setCurrentScreen('library')} />
        ) : (
          <RecipeLibrary />
        )}
      </main>
    </div>
  );
}
