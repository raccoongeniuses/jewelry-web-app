'use client';

import { useEffect } from 'react';

export default function ModernizrInit() {
  useEffect(() => {
    // This will run only on the client after hydration
    const script = document.createElement('script');
    script.src = '/assets/js/vendor/modernizr-3.6.0.min.js';
    script.async = true;
    document.head.appendChild(script);

    // Remove no-js class and add js class to html element
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('no-js');
    htmlElement.classList.add('js');

    return () => {
      // Cleanup if needed - only run on client side
      if (typeof window !== 'undefined' && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}