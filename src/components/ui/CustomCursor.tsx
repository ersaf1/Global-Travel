"use client";

import { useEffect, useRef, useState } from "react";

/*     Selectors that trigger hover state                 */
const HOVER_SELECTORS = "a, button, [data-cursor='hover'], [role='button'], label, select, summary";
const TEXT_SELECTORS  = "[data-cursor='text'], input, textarea, [contenteditable]";

/*     Component                                          */
export function CustomCursor() {
  const [mounted, setMounted] = useState(false);

  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  /* Live cursor position (no lerp) */
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  /* Ring position (lerped) */
  const ringX = useRef(0);
  const ringY = useRef(0);

  /* State flags stored in refs to avoid re-renders */
  const isHovering  = useRef(false);
  const isTextMode  = useRef(false);
  const isPressed   = useRef(false);

  /* rAF handle */
  const rafId = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    /* Touch / coarse pointer   don't show custom cursor */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    /* Register the html class so CSS suppresses the native cursor */
    document.documentElement.classList.add("custom-cursor-active");

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /*    Mouse move                                     */
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      /* Dot follows instantly */
      dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    };

    /*    Mouse down / up                               */
    const onMouseDown = () => {
      isPressed.current = true;
      applyRingState();
    };
    const onMouseUp = () => {
      isPressed.current = false;
      applyRingState();
    };

    /*    Hover delegation                              */
    const applyRingState = () => {
      if (!ring || !dot) return;

      if (isPressed.current) {
        dot.style.opacity  = "1";
        dot.style.scale    = "0.7";
        ring.style.scale   = "0.8";
        ring.style.opacity = "0.7";
        return;
      }

      if (isTextMode.current) {
        dot.style.opacity  = "1";
        dot.style.scale    = "1";
        ring.style.opacity = "0.5";
        ring.style.scale   = "1";
        ring.style.transform += " scaleX(3) scaleY(0.3)";
        return;
      }

      if (isHovering.current) {
        dot.style.opacity  = "0";
        dot.style.scale    = "0";
        ring.style.scale   = "1.8";
        ring.style.opacity = "0.5";
        return;
      }

      /* Default state */
      dot.style.opacity  = "1";
      dot.style.scale    = "1";
      ring.style.scale   = "1";
      ring.style.opacity = "1";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(TEXT_SELECTORS)) {
        isTextMode.current  = true;
        isHovering.current  = false;
      } else if (target.closest(HOVER_SELECTORS)) {
        isHovering.current  = true;
        isTextMode.current  = false;
      } else {
        isHovering.current  = false;
        isTextMode.current  = false;
      }
      applyRingState();
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      /* Only reset if we're not moving into another interactive element */
      if (!related) {
        isHovering.current = false;
        isTextMode.current = false;
        applyRingState();
      }
    };

    /*    rAF loop for ring lerp                         */
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const LERP_FACTOR = 0.12;

    const tick = () => {
      if (ring) {
        ringX.current = lerp(ringX.current, mouseX.current, LERP_FACTOR);
        ringY.current = lerp(ringY.current, mouseY.current, LERP_FACTOR);

        /* Only write transform if not in a special scale state */
        if (!isHovering.current && !isTextMode.current && !isPressed.current) {
          ring.style.transform = `translate3d(${ringX.current - 16}px, ${ringY.current - 16}px, 0)`;
        } else {
          /* In special states, preserve the translate so scale can combine */
          ring.style.transform = `translate3d(${ringX.current - 16}px, ${ringY.current - 16}px, 0) scale(${
            isPressed.current ? 0.8 : isHovering.current ? 1.8 : 1
          })`;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    /*    Attach listeners                               */
    document.addEventListener("mousemove",  onMouseMove,  { passive: true });
    document.addEventListener("mouseover",  onMouseOver,  { passive: true });
    document.addEventListener("mouseout",   onMouseOut,   { passive: true });
    document.addEventListener("mousedown",  onMouseDown,  { passive: true });
    document.addEventListener("mouseup",    onMouseUp,    { passive: true });

    return () => {
      document.removeEventListener("mousemove",  onMouseMove);
      document.removeEventListener("mouseover",  onMouseOver);
      document.removeEventListener("mouseout",   onMouseOut);
      document.removeEventListener("mousedown",  onMouseDown);
      document.removeEventListener("mouseup",    onMouseUp);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mounted]);

  /* SSR guard   render nothing server-side */
  if (!mounted) return null;

  return (
    <>
      {/* Dot   follows mouse exactly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          width:           "8px",
          height:          "8px",
          borderRadius:    "50%",
          background:      "#ffffff",
          pointerEvents:   "none",
          zIndex:          "var(--z-cursor)",
          transform:       "translate3d(-100px, -100px, 0)",
          willChange:      "transform",
          transition:      "opacity 0.2s, scale 0.2s",
        }}
      />

      {/* Ring   lerped behind the dot */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          width:           "32px",
          height:          "32px",
          borderRadius:    "50%",
          border:          "1.5px solid rgba(255,255,255,0.60)",
          pointerEvents:   "none",
          zIndex:          "var(--z-cursor)",
          transform:       "translate3d(-100px, -100px, 0)",
          willChange:      "transform",
          transition:      "opacity 0.25s, scale 0.25s",
        }}
      />
    </>
  );
}
