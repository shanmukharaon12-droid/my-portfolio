import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [hasMouse, setHasMouse] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Position references for physics-based trailing
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    // Only activate custom cursor if device has fine pointer / mouse
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setHasMouse(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, [role="button"], .interactive');
        setIsHovering(Boolean(interactive));
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth trailing ring physics loop
    const renderRing = () => {
      // Lerp ring towards mouse position
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(renderRing);
    };

    animationFrameId.current = requestAnimationFrame(renderRing);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (!hasMouse) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Central Glowing Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white transition-opacity duration-150 shadow-[0_0_12px_rgba(255,255,255,0.9)] ${
          isClicking ? 'scale-75' : isHovering ? 'scale-125' : 'scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Soft Glowing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-white/50 transition-all duration-200 ease-out backdrop-blur-[1px] ${
          isHovering
            ? '-ml-6 -mt-6 w-12 h-12 bg-white/15 border-white shadow-[0_0_24px_rgba(255,180,150,0.5)] scale-110'
            : isClicking
            ? '-ml-4 -mt-4 w-8 h-8 bg-white/20 border-white/80 scale-90'
            : '-ml-4 -mt-4 w-8 h-8 bg-transparent shadow-[0_0_14px_rgba(255,255,255,0.25)]'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
