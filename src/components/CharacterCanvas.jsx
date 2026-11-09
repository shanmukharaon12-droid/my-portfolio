import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 64;
// Source video dimensions: 1280x720
const SOURCE_WIDTH = 1280;
const SOURCE_HEIGHT = 720;
// Character's face center in original 1280x720 video
const FACE_NORM_X = 620 / SOURCE_WIDTH;  // ~0.484
const FACE_NORM_Y = 220 / SOURCE_HEIGHT; // ~0.306

// Compass keypoints: [Angle in radians from UP (clockwise), target frame index]
// UP: -PI/2 in screen math -> 0 rad from UP -> Frame 4
// UP-RIGHT: Frame 18
// RIGHT: Frame 29
// DOWN-RIGHT: Frame 35
// DOWN: Frame 40
// DOWN-LEFT: Frame 48
// LEFT: Frame 55
// UP-LEFT: Frame 60
// Back to UP: Frame 68 (wrapped: 64 + 4)
const COMPASS_POINTS = [
  { angle: 0, frame: 4 },
  { angle: Math.PI * 0.25, frame: 18 },
  { angle: Math.PI * 0.5, frame: 29 },
  { angle: Math.PI * 0.75, frame: 35 },
  { angle: Math.PI * 1.0, frame: 40 },
  { angle: Math.PI * 1.25, frame: 48 },
  { angle: Math.PI * 1.5, frame: 55 },
  { angle: Math.PI * 1.75, frame: 60 },
  { angle: Math.PI * 2.0, frame: 68 },
];

function getFrameFromClockwiseAngle(phi) {
  // Normalize phi to [0, 2*PI)
  let normPhi = ((phi % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);

  // Find segment
  for (let i = 0; i < COMPASS_POINTS.length - 1; i++) {
    const p1 = COMPASS_POINTS[i];
    const p2 = COMPASS_POINTS[i + 1];
    if (normPhi >= p1.angle && normPhi <= p2.angle) {
      const t = (normPhi - p1.angle) / (p2.angle - p1.angle);
      const continuousFrame = p1.frame + t * (p2.frame - p1.frame);
      const index = Math.round(continuousFrame) % TOTAL_FRAMES;
      return (index + TOTAL_FRAMES) % TOTAL_FRAMES;
    }
  }
  return 4;
}

export default function CharacterCanvas({ onLoaded }) {
  const canvasRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // References to keep state across animation frames without re-rendering
  const imagesRef = useRef([]);
  const centerImageRef = useRef(null);
  const mouseRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    isInside: false,
    isNearFace: false,
    lastMoveTime: Date.now()
  });

  // Current interpolated angle (starts looking forward / UP)
  const currentAngleRef = useRef(-Math.PI / 2);
  const animationFrameId = useRef(null);

  // 1. Preload all 64 frames and center.webp
  useEffect(() => {
    let active = true;
    const loadedImages = [];
    let count = 0;

    const checkComplete = () => {
      count++;
      if (active) {
        setLoadedCount(count);
        if (count === TOTAL_FRAMES + 1) {
          setIsReady(true);
          if (onLoaded) onLoaded();
        }
      }
    };

    // Preload center image
    const centerImg = new Image();
    centerImg.src = '/center.webp';
    centerImg.onload = () => {
      centerImageRef.current = centerImg;
      checkComplete();
    };
    centerImg.onerror = () => {
      console.warn('Failed to load /center.webp, fallback to frame_0');
      checkComplete();
    };

    // Preload 64 frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${i}.webp`;
      img.onload = () => {
        checkComplete();
      };
      img.onerror = () => {
        console.warn(`Failed to load frame_${i}.webp`);
        checkComplete();
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    return () => {
      active = false;
    };
  }, [onLoaded]);

  // 2. Mouse and Touch Event Listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isInside = true;
      mouseRef.current.lastMoveTime = Date.now();
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.isInside = true;
        mouseRef.current.lastMoveTime = Date.now();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 3. Canvas Render Loop with requestAnimationFrame
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    let running = true;

    const render = () => {
      if (!running) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Match canvas resolution with high DPI displays (capped to 2 for performance)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.round(width * dpr);
      const displayHeight = Math.round(height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Maintain aspect ratio and cover the viewport
      const scale = Math.max(width / SOURCE_WIDTH, height / SOURCE_HEIGHT);
      const drawWidth = SOURCE_WIDTH * scale;
      const drawHeight = SOURCE_HEIGHT * scale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;

      // Exact pixel coordinates of character's face on screen
      const faceX = offsetX + drawWidth * FACE_NORM_X;
      const faceY = offsetY + drawHeight * FACE_NORM_Y;

      // Handle idle motion if no mouse activity for 3s
      const now = Date.now();
      const timeSinceMove = now - mouseRef.current.lastMoveTime;
      let targetX = mouseRef.current.x;
      let targetY = mouseRef.current.y;

      if (!mouseRef.current.isInside || timeSinceMove > 3000) {
        // Natural gentle idle breathing motion
        const t = now * 0.001;
        targetX = faceX + Math.cos(t * 0.7) * 240;
        targetY = faceY + Math.sin(t * 1.0) * 150;
      }

      const dx = targetX - faceX;
      const dy = targetY - faceY;
      const distance = Math.hypot(dx, dy);

      // Proximity threshold: when cursor is near the face, show neutral center frame
      const nearThreshold = Math.max(90, 115 * scale);
      const isNear = distance < nearThreshold;
      mouseRef.current.isNearFace = isNear;

      // Screen angle: atan2(dy, dx) in [-PI, PI]
      const targetAngle = Math.atan2(dy, dx);

      // Smooth circular angle interpolation (shortest angular path)
      let angleDiff = ((targetAngle - currentAngleRef.current + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      const lerpSpeed = 0.12; // Snappy yet fluid damping
      currentAngleRef.current += angleDiff * lerpSpeed;

      // Select active frame (exactly one frame rendered per frame to prevent ghosting)
      let imageToDraw = null;

      if (isNear && centerImageRef.current) {
        imageToDraw = centerImageRef.current;
      } else {
        // Angle in radians clockwise from UP (-PI/2)
        const phi = currentAngleRef.current + Math.PI / 2;
        const frameIndex = getFrameFromClockwiseAngle(phi);
        imageToDraw = imagesRef.current[frameIndex] || centerImageRef.current;
      }

      // Draw active image
      if (imageToDraw && imageToDraw.complete && imageToDraw.naturalWidth > 0) {
        ctx.drawImage(imageToDraw, offsetX, offsetY, drawWidth, drawHeight);
      }

      ctx.restore();

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isReady]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Loading Screen */}
      {!isReady && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#9a1611] text-white">
          <div className="flex flex-col items-center space-y-4 max-w-xs w-full px-6 text-center">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin mb-2" />
            <span className="font-cursive-signature text-4xl text-orange-200">[SHANNU]</span>
            <p className="text-xs uppercase tracking-widest text-white/60">Crafting Experience</p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-red-400 transition-all duration-150 rounded-full"
                style={{ width: `${Math.round((loadedCount / (TOTAL_FRAMES + 1)) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-white/40 tracking-wider">
              {Math.round((loadedCount / (TOTAL_FRAMES + 1)) * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Main Full-Screen Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover'
        }}
      />

      {/* Subtle edge vignette gradient for seamless blending on ultra-wide viewports */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#7e0e07]/60 via-transparent to-[#9a1611]/30" />
    </div>
  );
}
