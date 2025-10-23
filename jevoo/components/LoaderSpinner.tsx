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

// Enhanced jewelry-themed loader with premium design
export function JewelryLoader({ 
  size = 'medium', 
  className = '',
  fullScreen = false,
  message = 'Loading beautiful jewelry...'
}: Omit<LoaderSpinnerProps, 'color'>) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32'
  };

  const containerSize = sizeClasses[size];

  const jewelrySpinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${containerSize} relative`}>
        {/* Outer diamond ring */}
        <div 
          className="absolute inset-0 border-2 border-transparent border-t-yellow-400 rounded-full animate-spin"
          style={{ 
            animationDuration: '3s',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
          }}
        ></div>
        
        {/* Middle ring with gradient */}
        <div 
          className="absolute inset-1 border-2 border-transparent border-r-yellow-500 rounded-full animate-spin"
          style={{ 
            animationDuration: '2s', 
            animationDirection: 'reverse',
            boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
          }}
        ></div>
        
        {/* Inner ring */}
        <div 
          className="absolute inset-2 border-2 border-transparent border-b-yellow-600 rounded-full animate-spin"
          style={{ 
            animationDuration: '1.5s',
            boxShadow: '0 0 10px rgba(184, 134, 11, 0.5)'
          }}
        ></div>
        
        {/* Center diamond/gem with premium effect */}
        <div className="absolute inset-4 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-full animate-pulse shadow-lg">
          <div className="absolute inset-1 bg-gradient-to-tr from-white to-transparent rounded-full opacity-60"></div>
          <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80 animate-ping"></div>
        </div>
        
        {/* Sparkle effects */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1 -left-2 w-1 h-1 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {message && (
        <div className="mt-8 text-center">
          <p className="text-gray-700 text-lg font-semibold mb-2 animate-pulse">
            {message}
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-yellow-50 bg-opacity-95 flex items-center justify-center z-50">
        <div className="text-center">
          {jewelrySpinner}
        </div>
      </div>
    );
  }

  return jewelrySpinner;
}

// Premium luxury jewelry loader with intricate design
export function LuxuryJewelryLoader({ 
  size = 'medium', 
  className = '',
  fullScreen = false,
  message = 'Loading exquisite jewelry...'
}: Omit<LoaderSpinnerProps, 'color'>) {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-36 h-36'
  };

  const containerSize = sizeClasses[size];

  const luxurySpinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${containerSize} relative`}>
        {/* Outer luxury ring with multiple segments */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 border-2 border-transparent border-t-yellow-400 rounded-full animate-spin"
            style={{ animationDuration: '4s' }}
          ></div>
          <div 
            className="absolute inset-0 border-2 border-transparent border-r-yellow-500 rounded-full animate-spin"
            style={{ animationDuration: '4s', animationDelay: '1s' }}
          ></div>
          <div 
            className="absolute inset-0 border-2 border-transparent border-b-yellow-600 rounded-full animate-spin"
            style={{ animationDuration: '4s', animationDelay: '2s' }}
          ></div>
          <div 
            className="absolute inset-0 border-2 border-transparent border-l-yellow-700 rounded-full animate-spin"
            style={{ animationDuration: '4s', animationDelay: '3s' }}
          ></div>
        </div>
        
        {/* Middle ornate ring */}
        <div className="absolute inset-2">
          <div 
            className="absolute inset-0 border-2 border-transparent border-t-yellow-300 rounded-full animate-spin"
            style={{ animationDuration: '3s', animationDirection: 'reverse' }}
          ></div>
          <div 
            className="absolute inset-0 border-2 border-transparent border-b-yellow-500 rounded-full animate-spin"
            style={{ animationDuration: '3s', animationDirection: 'reverse', animationDelay: '1.5s' }}
          ></div>
        </div>
        
        {/* Inner gem ring */}
        <div 
          className="absolute inset-4 border-2 border-transparent border-l-yellow-400 rounded-full animate-spin"
          style={{ animationDuration: '2s' }}
        ></div>
        
        {/* Center luxury gem with multiple facets */}
        <div className="absolute inset-6 bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-600 rounded-full shadow-2xl">
          {/* Gem facets */}
          <div className="absolute inset-1 bg-gradient-to-tr from-white to-transparent rounded-full opacity-70"></div>
          <div className="absolute inset-2 bg-gradient-to-bl from-yellow-200 to-transparent rounded-full opacity-50"></div>
          
          {/* Central highlight */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-90 animate-ping"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-200 rounded-full opacity-80 animate-pulse"></div>
        </div>
        
        {/* Floating sparkles around the gem */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-300 rounded-full animate-ping shadow-lg" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping shadow-lg" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-0 -left-3 w-2 h-2 bg-yellow-500 rounded-full animate-ping shadow-lg" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute -top-1 left-0 w-1.5 h-1.5 bg-yellow-600 rounded-full animate-ping shadow-lg" style={{ animationDelay: '1.8s' }}></div>
        <div className="absolute bottom-0 -right-3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping shadow-lg" style={{ animationDelay: '2.1s' }}></div>
      </div>
      
      {message && (
        <div className="mt-10 text-center">
          <p className="text-gray-800 text-xl font-bold mb-3 animate-pulse">
            {message}
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce shadow-md" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce shadow-md" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce shadow-md" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-3 h-3 bg-yellow-700 rounded-full animate-bounce shadow-md" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-yellow-50 to-yellow-100 bg-opacity-98 flex items-center justify-center z-50">
        <div className="text-center">
          {luxurySpinner}
        </div>
      </div>
    );
  }

  return luxurySpinner;
}
