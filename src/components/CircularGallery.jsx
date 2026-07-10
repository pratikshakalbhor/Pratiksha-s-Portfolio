/**
 * CircularGallery – Premium 3D Rotating Carousel
 * ──────────────────────────────────────────────
 * Double-click any card → locks rotation on that project (for detail reading)
 * Escape key or click outside → unlocks and resumes auto-rotation
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ─── helpers ──────────────────────────────────────────────────────────────── */
function lerp(a, b, t) { return a + (b - a) * t; }

/* ─── constants ─────────────────────────────────────────────────────────────── */
const AUTO_SPEED       = 0.12;   // degrees / frame at 60fps  (negative = clockwise)
const RESUME_DELAY_MS  = 2000;
const LERP_EASE        = 0.055;
const WHEEL_STEP       = 20;
const DRAG_SENSITIVITY = 0.35;

/* ─── main component ─────────────────────────────────────────────────────────── */
export default function CircularGallery({
  items = [],
  onChange,
  bend, textColor, borderRadius, font, fontUrl,
  scrollSpeed, scrollEase, autoplaySpeed,
}) {
  const count     = items.length;
  const angleStep = count > 0 ? 360 / count : 0;

  /* ── state ── */
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLocked, setIsLocked]   = useState(false);  // ← double-click lock

  /* ── refs ── */
  const rotationRef     = useRef(0);
  const targetRef       = useRef(0);
  const rafRef          = useRef(null);
  const isHoveredRef    = useRef(false);
  const isDraggingRef   = useRef(false);
  const isLockedRef     = useRef(false);               // ← synced with state
  const dragStartXRef   = useRef(0);
  const dragStartRotRef = useRef(0);
  const resumeTimerRef  = useRef(null);
  const containerRef    = useRef(null);
  const sceneRef        = useRef(null);
  const prefersReduced  = useReducedMotion();

  /* keep ref in sync with state */
  useEffect(() => { isLockedRef.current = isLocked; }, [isLocked]);

  /* ═══════════════════════════════════════════════════════
     Snap helpers
  ═══════════════════════════════════════════════════════ */
  const snapToIndex = useCallback((idx, instant = false) => {
    const targetAngle = -idx * angleStep;
    let diff = targetAngle - targetRef.current;
    diff = ((diff + 180) % 360) - 180;
    targetRef.current += diff;
    if (instant) rotationRef.current = targetRef.current;
  }, [angleStep]);

  const getActiveFromRotation = useCallback((rot) => {
    if (count === 0) return 0;
    const normalized = ((-rot % 360) + 360) % 360;
    return Math.round(normalized / angleStep) % count;
  }, [count, angleStep]);

  /* ═══════════════════════════════════════════════════════
     Animation loop
  ═══════════════════════════════════════════════════════ */
  useEffect(() => {
    if (count === 0) return;

    function tick() {
      /* Auto-rotate clockwise ONLY when free (not hovered / dragging / locked) */
      if (!isHoveredRef.current && !isDraggingRef.current && !isLockedRef.current) {
        targetRef.current -= AUTO_SPEED;
      }

      rotationRef.current = lerp(
        rotationRef.current, targetRef.current,
        prefersReduced ? 1 : LERP_EASE
      );

      if (sceneRef.current) {
        sceneRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }

      const computed = getActiveFromRotation(rotationRef.current);
      setActiveIdx(prev => {
        if (prev !== computed) {
          if (typeof onChange === 'function') onChange(computed);
          return computed;
        }
        return prev;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [count, getActiveFromRotation, onChange, prefersReduced]);

  /* ═══════════════════════════════════════════════════════
     Lock / Unlock helpers
  ═══════════════════════════════════════════════════════ */
  const lock = useCallback((idx) => {
    clearTimeout(resumeTimerRef.current);
    isHoveredRef.current = true;       // keep "paused"
    setIsLocked(true);
    snapToIndex(idx);
  }, [snapToIndex]);

  const unlock = useCallback(() => {
    setIsLocked(false);
    isHoveredRef.current = false;
  }, []);

  /* ═══════════════════════════════════════════════════════
     Escape key → unlock
  ═══════════════════════════════════════════════════════ */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isLockedRef.current) unlock();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [unlock]);

  /* Click outside gallery → unlock */
  useEffect(() => {
    const onClickOutside = (e) => {
      if (isLockedRef.current && containerRef.current && !containerRef.current.contains(e.target)) {
        unlock();
      }
    };
    document.addEventListener('pointerdown', onClickOutside);
    return () => document.removeEventListener('pointerdown', onClickOutside);
  }, [unlock]);

  /* ═══════════════════════════════════════════════════════
     Hover (ignored when locked)
  ═══════════════════════════════════════════════════════ */
  const handleMouseEnter = useCallback(() => {
    if (isLockedRef.current) return;
    clearTimeout(resumeTimerRef.current);
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isLockedRef.current) return;
    isDraggingRef.current = false;
    resumeTimerRef.current = setTimeout(() => {
      isHoveredRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  /* ═══════════════════════════════════════════════════════
     Card interactions
  ═══════════════════════════════════════════════════════ */
  const handleCardHover = useCallback((idx) => {
    if (!isLockedRef.current) snapToIndex(idx);
  }, [snapToIndex]);

  /* single click → snap to card */
  const handleCardClick = useCallback((idx) => {
    if (isLockedRef.current) return; // ignore clicks when locked (use dbl-click to unlock)
    snapToIndex(idx);
  }, [snapToIndex]);

  /* DOUBLE CLICK → toggle lock */
  const handleCardDblClick = useCallback((idx) => {
    if (isLockedRef.current) {
      unlock();
    } else {
      lock(idx);
    }
  }, [lock, unlock]);

  /* ═══════════════════════════════════════════════════════
     Pointer drag (disabled when locked)
  ═══════════════════════════════════════════════════════ */
  const handlePointerDown = useCallback((e) => {
    if (isLockedRef.current) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX ?? 0;
    dragStartRotRef.current = targetRef.current;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current || isLockedRef.current) return;
    const delta = (e.clientX - dragStartXRef.current) * DRAG_SENSITIVITY;
    targetRef.current = dragStartRotRef.current + delta;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const nearest = getActiveFromRotation(rotationRef.current);
    snapToIndex(nearest);
  }, [getActiveFromRotation, snapToIndex]);

  /* ═══════════════════════════════════════════════════════
     Mouse wheel (disabled when locked)
  ═══════════════════════════════════════════════════════ */
  const handleWheel = useCallback((e) => {
    if (isLockedRef.current) return;
    e.preventDefault();
    targetRef.current -= Math.sign(e.deltaY) * WHEEL_STEP;
    const nearest = getActiveFromRotation(targetRef.current);
    snapToIndex(nearest);
  }, [getActiveFromRotation, snapToIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  /* ═══════════════════════════════════════════════════════
     Touch swipe (disabled when locked)
  ═══════════════════════════════════════════════════════ */
  const touchStartXRef   = useRef(0);
  const touchStartRotRef = useRef(0);

  const handleTouchStart = useCallback((e) => {
    if (isLockedRef.current) return;
    touchStartXRef.current   = e.touches[0].clientX;
    touchStartRotRef.current = targetRef.current;
    isDraggingRef.current    = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDraggingRef.current || isLockedRef.current) return;
    const delta = (e.touches[0].clientX - touchStartXRef.current) * DRAG_SENSITIVITY;
    targetRef.current = touchStartRotRef.current + delta;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    const nearest = getActiveFromRotation(rotationRef.current);
    snapToIndex(nearest);
  }, [getActiveFromRotation, snapToIndex]);

  /* ─── geometry ── */
  const CARD_W_PX = 220;
  const radius    = count > 1 ? Math.round(CARD_W_PX / (2 * Math.tan(Math.PI / count))) : 0;

  /* ─── render ── */
  return (
    <div
      ref={containerRef}
      className={`cg-root ${isLocked ? 'cg-root--locked' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Circular project gallery – drag or scroll to navigate. Double-click to lock on a project."
      role="region"
    >
      {/* ── perspective wrapper ── */}
      <div className="cg-perspective">
        <div
          ref={sceneRef}
          className="cg-scene"
          style={{ '--cg-radius': `${radius}px` }}
        >
          {items.map((item, idx) => {
            const angle    = idx * angleStep;
            const isActive = idx === activeIdx;
            const isThisLocked = isLocked && isActive;

            return (
              <div
                key={item.text ?? idx}
                className={`cg-card ${isActive ? 'cg-card--active' : ''} ${isThisLocked ? 'cg-card--locked' : ''}`}
                style={{ '--cg-angle': `${angle}deg` }}
                onMouseEnter={() => handleCardHover(idx)}
                onClick={() => handleCardClick(idx)}
                onDoubleClick={() => handleCardDblClick(idx)}
                role="button"
                tabIndex={0}
                aria-label={`${item.text}. Double-click to lock/unlock.`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCardClick(idx);
                  if (e.key === ' ')     handleCardDblClick(idx);
                }}
              >
                <div className="cg-card__img-wrap">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="cg-card__img"
                    draggable={false}
                    loading="lazy"
                  />
                  <div className="cg-card__vignette" />
                  {isActive && <div className="cg-card__glow-ring" />}
                </div>

                <div className="cg-card__label">{item.text}</div>

                {/* Lock indicator badge */}
                <AnimatePresence>
                  {isThisLocked && (
                    <motion.div
                      className="cg-lock-badge"
                      initial={{ opacity: 0, scale: 0.6, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      🔒 Locked · Dbl-click or Esc to resume
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── edge fades ── */}
      <div className="cg-fade-left"  aria-hidden />
      <div className="cg-fade-right" aria-hidden />

      {/* ── locked status hint (top of gallery) ── */}
      <AnimatePresence>
        {isLocked && (
          <motion.div
            className="cg-locked-hint"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <span>⏸</span> Gallery paused — double-click or press <kbd>Esc</kbd> to resume
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ──────── root ──────── */
        .cg-root {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          user-select: none;
          overflow: hidden;
        }
        .cg-root:active         { cursor: grabbing; }
        .cg-root--locked        { cursor: default; }
        .cg-root--locked:active { cursor: default; }

        .cg-perspective {
          perspective: 1100px;
          perspective-origin: center 45%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .cg-scene {
          position: relative;
          transform-style: preserve-3d;
          width: 220px;
          height: 300px;
        }

        /* ──────── card ──────── */
        .cg-card {
          position: absolute;
          top: 0; left: 0;
          width: 220px;
          height: 310px;
          transform: rotateY(var(--cg-angle)) translateZ(var(--cg-radius));
          transform-origin: center center;
          transition: box-shadow 0.4s ease, outline 0.3s ease;
          border-radius: 18px;
          overflow: visible;
          cursor: pointer;
          outline: 1.5px solid rgba(255,255,255,0.07);
          will-change: transform;
        }

        /* active card – cyan glow */
        .cg-card--active {
          outline: 2px solid rgba(0,242,254,0.55);
          box-shadow:
            0 0 28px rgba(0,242,254,0.35),
            0 0 60px rgba(121,40,202,0.25);
          z-index: 20;
        }

        /* locked card – amber/gold glow */
        .cg-card--locked {
          outline: 2.5px solid rgba(251,191,36,0.75) !important;
          box-shadow:
            0 0 32px rgba(251,191,36,0.45),
            0 0 70px rgba(251,191,36,0.18) !important;
        }

        .cg-card__img-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 18px;
          overflow: hidden;
          background: #0d1423;
        }

        .cg-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
          filter: brightness(0.78) saturate(1.1);
        }
        .cg-card--active .cg-card__img {
          filter: brightness(0.95) saturate(1.25);
          transform: scale(1.04);
        }
        .cg-card--locked .cg-card__img {
          filter: brightness(1.0) saturate(1.3);
          transform: scale(1.06);
        }

        .cg-card__vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 55%, rgba(5,8,18,0.75) 100%);
          pointer-events: none;
        }

        /* glow ring */
        .cg-card__glow-ring {
          position: absolute;
          inset: -3px;
          border-radius: 20px;
          border: 2px solid transparent;
          background:
            linear-gradient(#0d1423, #0d1423) padding-box,
            linear-gradient(135deg, #00F2FE 0%, #7928CA 100%) border-box;
          opacity: 0.85;
          pointer-events: none;
          animation: cgPulse 2.2s ease-in-out infinite;
        }
        .cg-card--locked .cg-card__glow-ring {
          background:
            linear-gradient(#0d1423, #0d1423) padding-box,
            linear-gradient(135deg, #fbbf24 0%, #f97316 100%) border-box;
          animation: cgPulseLocked 1.6s ease-in-out infinite;
        }
        @keyframes cgPulse       { 0%,100%{opacity:0.55}  50%{opacity:1} }
        @keyframes cgPulseLocked { 0%,100%{opacity:0.65}  50%{opacity:1} }

        /* label */
        .cg-card__label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 28px 14px 14px;
          background: linear-gradient(to top, rgba(4,6,15,0.92) 0%, transparent 100%);
          color: #fff;
          font-family: 'Figtree', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-align: center;
          text-shadow: 0 0 8px rgba(0,242,254,0.5);
          pointer-events: none;
          border-radius: 0 0 18px 18px;
        }
        .cg-card--active .cg-card__label { color: #00F2FE; text-shadow: 0 0 14px rgba(0,242,254,0.9); }
        .cg-card--locked .cg-card__label { color: #fbbf24; text-shadow: 0 0 14px rgba(251,191,36,0.9); }

        /* lock badge (on card) */
        .cg-lock-badge {
          position: absolute;
          top: -36px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          background: rgba(251,191,36,0.15);
          border: 1px solid rgba(251,191,36,0.4);
          color: #fbbf24;
          font-size: 10px;
          font-family: monospace;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          backdrop-filter: blur(8px);
          pointer-events: none;
          z-index: 30;
          text-align: center;
        }

        /* top hint bar */
        .cg-locked-hint {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(251,191,36,0.10);
          border: 1px solid rgba(251,191,36,0.28);
          color: rgba(251,191,36,0.85);
          font-size: 10px;
          font-family: monospace;
          padding: 5px 14px;
          border-radius: 20px;
          backdrop-filter: blur(12px);
          white-space: nowrap;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cg-locked-hint kbd {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          padding: 1px 5px;
          font-size: 9px;
        }

        /* edge fades */
        .cg-fade-left, .cg-fade-right {
          position: absolute; top: 0; bottom: 0;
          width: 80px; pointer-events: none; z-index: 15;
        }
        .cg-fade-left  { left:  0; background: linear-gradient(to right, #080B11, transparent); }
        .cg-fade-right { right: 0; background: linear-gradient(to left,  #080B11, transparent); }

        /* mobile */
        @media (max-width: 640px) {
          .cg-scene, .cg-card { width: 160px; }
          .cg-card { height: 230px; }
          .cg-card__label { font-size: 11px; }
          .cg-locked-hint { font-size: 9px; padding: 4px 10px; }
          .cg-lock-badge  { font-size: 9px; top: -30px; }
        }
      `}</style>
    </div>
  );
}
