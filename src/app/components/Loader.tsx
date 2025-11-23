'use client';

import React from 'react';

interface LoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Loader Component
 * Displays an animated refrigerator/fridge loader
 */
export default function Loader({ message = 'Loading...', size = 'medium' }: LoaderProps) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Refrigerator Animation */}
      <div className={`${sizeClasses[size]} relative animate-bounce`}>
        <img
          src="/fridge-loader.gif"
          alt="Loading"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Loading Message */}
      {message && (
        <div className="text-center">
          <p className="font-poppins font-medium text-amber-900 text-lg animate-pulse">
            {message}
          </p>
          <div className="flex gap-1 justify-center mt-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      )}
    </div>
  );
}
