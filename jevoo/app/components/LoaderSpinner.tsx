'use client';

import React from 'react';

interface LoaderSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  fullScreen?: boolean;
  message?: string;
}

export default function LoaderSpinner({ 
  size = 'medium', 
  color = '#d4af37', 
  className = '',
  fullScreen = false,
  message = 'Loading...'
}: LoaderSpinnerProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const spinnerSize = sizeClasses[size];

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`${spinnerSize} border-4 border-gray-200 border-t-transparent rounded-full animate-spin`}
        style={{ borderTopColor: color }}
      ></div>
      {message && (
        <p className="mt-4 text-gray-600 text-sm font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
        <div className="text-center">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
}

// Alternative jewelry-themed loader with multiple rings
export function JewelryLoader({ 
  size = 'medium', 
  className = '',
  fullScreen = false,
  message = 'Loading beautiful jewelry...'
}: Omit<LoaderSpinnerProps, 'color'>) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const containerSize = sizeClasses[size];

  const jewelrySpinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${containerSize} relative`}>
        {/* Outer ring */}
        <div 
          className="absolute inset-0 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"
          style={{ animationDuration: '2s' }}
        ></div>
        {/* Middle ring */}
        <div 
          className="absolute inset-2 border-3 border-transparent border-b-yellow-600 rounded-full animate-spin"
          style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
        ></div>
        {/* Inner ring */}
        <div 
          className="absolute inset-4 border-2 border-transparent border-l-yellow-500 rounded-full animate-spin"
          style={{ animationDuration: '1s' }}
        ></div>
        {/* Center gem */}
        <div className="absolute inset-6 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full animate-pulse"></div>
      </div>
      {message && (
        <p className="mt-6 text-gray-600 text-sm font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
        <div className="text-center">
          {jewelrySpinner}
        </div>
      </div>
    );
  }

  return jewelrySpinner;
}
