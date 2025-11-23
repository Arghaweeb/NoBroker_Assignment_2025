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
        {/*
          TO ADD YOUR GIF:
          1. Save your refrigerator GIF to /public/fridge-loader.gif
          2. Uncomment the img tag below
          3. Comment out or remove the SVG below
        */}
        {/* <img
          src="/fridge-loader.gif"
          alt="Loading"
          className="w-full h-full object-contain"
        /> */}

        {/* Refrigerator SVG Illustration (placeholder until GIF is added) */}
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Refrigerator Body */}
          <rect
            x="30"
            y="20"
            width="140"
            height="260"
            rx="10"
            fill="#4A9ECC"
            stroke="#2C5F7F"
            strokeWidth="3"
          />

          {/* Top Freezer Section */}
          <rect
            x="30"
            y="20"
            width="140"
            height="100"
            rx="10"
            fill="#5DADE2"
            stroke="#2C5F7F"
            strokeWidth="3"
          />

          {/* Divider Line */}
          <line
            x1="30"
            y1="120"
            x2="170"
            y2="120"
            stroke="#2C5F7F"
            strokeWidth="3"
          />

          {/* Top Handle */}
          <rect
            x="150"
            y="50"
            width="8"
            height="40"
            rx="4"
            fill="#1C3D5A"
          />

          {/* Bottom Handle */}
          <rect
            x="150"
            y="170"
            width="8"
            height="60"
            rx="4"
            fill="#1C3D5A"
          />

          {/* Door Details - Top Freezer */}
          <circle cx="50" cy="60" r="3" fill="#85C1E9" />
          <circle cx="70" cy="60" r="3" fill="#85C1E9" />
          <circle cx="50" cy="80" r="3" fill="#85C1E9" />
          <circle cx="70" cy="80" r="3" fill="#85C1E9" />

          {/* Door Details - Bottom Fridge */}
          <rect x="45" y="150" width="30" height="8" rx="4" fill="#85C1E9" />
          <rect x="45" y="170" width="45" height="8" rx="4" fill="#85C1E9" />
          <rect x="45" y="190" width="35" height="8" rx="4" fill="#85C1E9" />
          <rect x="45" y="210" width="40" height="8" rx="4" fill="#85C1E9" />

          {/* Sparkle Effect */}
          <g className="animate-pulse">
            <circle cx="140" cy="40" r="2" fill="#FFD700" />
            <circle cx="145" cy="45" r="1.5" fill="#FFD700" />
            <circle cx="135" cy="45" r="1.5" fill="#FFD700" />
          </g>
        </svg>
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
