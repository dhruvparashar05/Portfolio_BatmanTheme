import { useEffect } from 'react';

/**
 * Updates global --mouse-x / --mouse-y CSS variables for the background spotlight
 * at most once per animation frame without triggering React re-renders.
 */
export const useMousePosition = () => {
  useEffect(() => {
    let rafId = 0;
    let latestX = 0;
    let latestY = 0;
    let dirty = false;

    const flush = () => {
      rafId = 0;
      if (!dirty) return;
      dirty = false;
      document.documentElement.style.setProperty('--mouse-x', `${latestX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${latestY}px`);
    };

    const handlePointerMove = (e) => {
      latestX = e.clientX;
      latestY = e.clientY;
      dirty = true;
      if (!rafId) {
        rafId = window.requestAnimationFrame(flush);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);
};
