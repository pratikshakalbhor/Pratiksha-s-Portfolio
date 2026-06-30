import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Use MotionValues for absolute position tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Add spring physics for smooth trailing lag
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorRingX = useSpring(cursorX, springConfig);
  const cursorRingY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile/tablet screen sizes or mouse absence
    const checkPointerDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouch || window.innerWidth < 1024);
    };

    checkPointerDevice();
    window.addEventListener('resize', checkPointerDevice);

    if (isMobile) return;

    // Listeners to offset coordinates
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    // Body custom cursor class flag
    document.body.classList.add('custom-cursor-active');

    window.addEventListener('mousemove', moveCursor);

    // Pointer hover triggers
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT';

      setIsHovered(isClickable);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('resize', checkPointerDevice);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner Dot: Snaps to coordinates */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full z-50 pointer-events-none mix-blend-screen shadow-[0_0_8px_#00F2FE]"
        animate={{
          scale: clicked ? 0.8 : isHovered ? 1.5 : 1,
        }}
      />
      {/* Outer Ring: Spring lags behind */}
      <motion.div
        style={{
          x: cursorRingX,
          y: cursorRingY,
          transformTranslate: '-50%, -50%',
        }}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 z-50 pointer-events-none mix-blend-screen -ml-2.5 -mt-2.5 transition-colors duration-300 ${
          isHovered 
            ? 'border-secondary bg-secondary/10 shadow-[0_0_15px_rgba(121,40,202,0.4)]' 
            : 'border-primary/50'
        }`}
        animate={{
          scale: clicked ? 1.4 : isHovered ? 2.0 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
