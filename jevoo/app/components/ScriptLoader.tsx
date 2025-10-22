'use client';

import { useEffect } from 'react';

// Type declarations for jQuery
declare global {
  interface Window {
    jQuery: typeof import('jquery');
    $: typeof import('jquery');
  }
}

interface ScriptLoaderProps {
  onScriptsLoaded: () => void;
}

export default function ScriptLoader({ onScriptsLoaded }: ScriptLoaderProps) {
  useEffect(() => {
    const loadScripts = async () => {
      // Check if scripts are already loaded
      if (window.jQuery && window.jQuery.fn.slick) {
        onScriptsLoaded();
        return;
      }

      // Wait for scripts to be loaded
      const checkScripts = () => {
        if (window.jQuery && window.jQuery.fn.slick) {
          onScriptsLoaded();
        } else {
          setTimeout(checkScripts, 100);
        }
      };

      // Start checking after a short delay
      setTimeout(checkScripts, 500);
    };

    loadScripts();
  }, [onScriptsLoaded]);

  return null;
}