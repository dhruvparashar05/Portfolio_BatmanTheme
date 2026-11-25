import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updateDevice = () => setEnabled(mediaQuery.matches);
    updateDevice();

    mediaQuery.addEventListener('change', updateDevice);
    return () => mediaQuery.removeEventListener('change', updateDevice);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let targetScale = 1;
    let ringScale = 1;
    let visible = false;
    let rafId = 0;
    let lastTime = 0;

    const setVisible = (nextVisible) => {
      if (visible === nextVisible) return;
      visible = nextVisible;
      const opacity = nextVisible ? '1' : '0';
      ring.style.opacity = opacity;
      dot.style.opacity = opacity;
    };

    const tick = (now) => {
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 90;
      lastTime = now;

      // Frame-rate-independent exponential smoothing (feels identical at 60/90/120/144Hz)
      const followFactor = 1 - Math.exp(-28 * dt);
      const scaleFactor = 1 - Math.exp(-18 * dt);

      ringX += (targetX - ringX) * followFactor;
      ringY += (targetY - ringY) * followFactor;
      ringScale += (targetScale - ringScale) * scaleFactor;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${ringScale})`;

      const settled =
        Math.abs(targetX - ringX) < 0.05 &&
        Math.abs(targetY - ringY) < 0.05 &&
        Math.abs(targetScale - ringScale) < 0.005;

      if (settled) {
        ringX = targetX;
        ringY = targetY;
        ringScale = targetScale;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${ringScale})`;
        rafId = 0;
        lastTime = 0;
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const ensureLoop = () => {
      if (!rafId) {
        lastTime = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!visible) {
        ringX = targetX;
        ringY = targetY;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${ringScale})`;
        setVisible(true);
      }

      // Snap inner dot immediately with zero lag
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      ensureLoop();
    };

    const handlePointerOver = (e) => {
      const interactive = e.target.closest?.('a, button, input, textarea, [role="button"], .cursor-pointer');
      const nextScale = interactive ? 1.45 : 1;
      if (nextScale !== targetScale) {
        targetScale = nextScale;
        ensureLoop();
      }
    };

    const handlePointerLeave = () => {
      setVisible(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Smooth GPU-composited outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-bat-gold/65 pointer-events-none z-[9999]"
        style={{
          opacity: 0,
          willChange: 'transform, opacity',
          transform: 'translate3d(-100px, -100px, 0)',
          boxShadow: '0 0 10px rgba(212, 175, 55, 0.35)',
        }}
      />
      {/* Instant-tracking central yellow dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[5px] -mt-[5px] w-2.5 h-2.5 rounded-full bg-bat-yellow pointer-events-none z-[9999]"
        style={{
          opacity: 0,
          willChange: 'transform, opacity',
          transform: 'translate3d(-100px, -100px, 0)',
          boxShadow: '0 0 8px rgba(247, 211, 84, 0.85)',
        }}
      />
    </>
  );
};

export default CustomCursor;
