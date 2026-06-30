"use client";

import { useEffect, useRef } from "react";
import { useSpring, useTransform, motion } from "framer-motion";
import gsap from "gsap";

interface PlaneSceneProps {
  mouseX: number;
  mouseY: number;
}

const particles = [
  { x: -160, y: -60,  size: 3,   color: "#60A5FA", opacity: 0.5, floatY: 10, duration: 5.5, delay: 0,   parallax: 0.03 },
  { x:  130, y: -80,  size: 2,   color: "#6EE7B7", opacity: 0.45, floatY: 8,  duration: 6,   delay: 0.8, parallax: 0.025 },
  { x: -80,  y:  110, size: 4,   color: "#818CF8", opacity: 0.3, floatY: 12, duration: 7,   delay: 1.2, parallax: 0.02 },
  { x:  170, y:  60,  size: 2.5, color: "#60A5FA", opacity: 0.4, floatY: 9,  duration: 5,   delay: 2,   parallax: 0.035 },
  { x: -40,  y: -120, size: 2,   color: "#FDBA74", opacity: 0.4, floatY: 7,  duration: 6.5, delay: 0.5, parallax: 0.022 },
  { x:  80,  y:  130, size: 3,   color: "#6EE7B7", opacity: 0.35, floatY: 11, duration: 8,   delay: 1.5, parallax: 0.018 },
  { x: -130, y:  70,  size: 2,   color: "#93C5FD", opacity: 0.5, floatY: 8,  duration: 5.2, delay: 3,   parallax: 0.04 },
  { x:  50,  y: -140, size: 3.5, color: "#818CF8", opacity: 0.25, floatY: 14, duration: 9,   delay: 0.3, parallax: 0.015 },
];

export function PlaneScene({ mouseX, mouseY }: PlaneSceneProps) {
  const planeRef    = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const orbit1Ref   = useRef<HTMLDivElement>(null);
  const orbit2Ref   = useRef<HTMLDivElement>(null);
  const cloud1Ref   = useRef<SVGSVGElement>(null);
  const cloud2Ref   = useRef<SVGSVGElement>(null);
  const cloud3Ref   = useRef<SVGSVGElement>(null);
  const cloud4Ref   = useRef<SVGSVGElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef1    = useRef<SVGPathElement>(null);
  const pathRef2    = useRef<SVGPathElement>(null);
  const tlRef       = useRef<gsap.core.Timeline | null>(null);

  // Framer Motion springs for smooth mouse parallax
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Plane floating ──
      if (planeRef.current) {
        gsap.to(planeRef.current, {
          y: -14,
          rotation: 1.8,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // ── Glow pulse ──
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.7,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // ── Orbit rings ──
      if (orbit1Ref.current) {
        gsap.to(orbit1Ref.current, {
          rotation: 360,
          duration: 60,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      }
      if (orbit2Ref.current) {
        gsap.to(orbit2Ref.current, {
          rotation: -360,
          duration: 45,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      }

      // ── Clouds floating ──
      const cloudRefs = [cloud1Ref, cloud2Ref, cloud3Ref, cloud4Ref];
      const cloudDelays = [0, 1.2, 2.1, 0.7];
      cloudRefs.forEach((ref, i) => {
        if (!ref.current) return;
        gsap.set(ref.current, { opacity: 0 });
        gsap.to(ref.current, {
          opacity: 1,
          duration: 1,
          delay: cloudDelays[i],
        });
        gsap.to(ref.current, {
          y: -8,
          duration: 5.5 + i * 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: cloudDelays[i],
        });
      });

      // ── Particles floating ──
      particleRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = particles[i];
        gsap.set(el, { opacity: 0 });
        gsap.to(el, { opacity: p.opacity, duration: 0.6, delay: p.delay });
        gsap.to(el, {
          y: `-=${p.floatY}`,
          duration: p.duration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: p.delay,
        });
      });

      // ── Flight path draw ──
      if (pathRef1.current) {
        const len1 = pathRef1.current.getTotalLength();
        gsap.set(pathRef1.current, {
          strokeDasharray: len1,
          strokeDashoffset: len1,
          opacity: 0,
        });
        gsap.to(pathRef1.current, {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 2,
          delay: 0.5,
          ease: "power2.inOut",
        });
      }
      if (pathRef2.current) {
        const len2 = pathRef2.current.getTotalLength();
        gsap.set(pathRef2.current, {
          strokeDasharray: len2,
          strokeDashoffset: len2,
          opacity: 0,
        });
        gsap.to(pathRef2.current, {
          strokeDashoffset: 0,
          opacity: 0.3,
          duration: 2.5,
          delay: 0.8,
          ease: "power2.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
      {/* Soft glow behind plane */}
      <div
        ref={glowRef}
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.13) 0%, rgba(110,231,183,0.07) 50%, transparent 70%)",
        }}
      />

      {/* Orbit rings */}
      <div
        ref={orbit1Ref}
        className="absolute w-[380px] h-[380px] rounded-full border border-[#60A5FA]/10 pointer-events-none"
      />
      <div
        ref={orbit2Ref}
        className="absolute w-[260px] h-[260px] rounded-full border border-[#6EE7B7]/10 pointer-events-none"
      />

      {/* Flight path arc SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 480 480" className="w-full h-full" fill="none">
          <path
            ref={pathRef1}
            d="M 60 360 Q 240 80 420 200"
            stroke="url(#flightGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            ref={pathRef2}
            d="M 100 400 Q 280 120 440 260"
            stroke="url(#flightGrad2)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="flightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
              <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="flightGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0" />
              <stop offset="50%" stopColor="#818CF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* The Plane — parallax via Framer Motion spring */}
      <motion.div
        style={{
          x: useTransform(springX, v => v * 0.04),
          y: useTransform(springY, v => v * 0.03),
        }}
        className="relative z-10"
      >
        <div
          ref={planeRef}
          style={{
            filter: "drop-shadow(0 20px 40px rgba(96,165,250,0.18)) drop-shadow(0 4px 16px rgba(17,24,39,0.10))",
          }}
        >
          <svg viewBox="0 0 320 200" width="320" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Fuselage */}
            <ellipse cx="155" cy="100" rx="125" ry="22" fill="url(#fuselageGrad)" />
            <ellipse cx="155" cy="94"  rx="100" ry="10" fill="url(#fuselageHighlight)" opacity="0.7" />
            <path d="M 270 100 Q 310 100 315 102 Q 310 104 270 104 Z" fill="url(#noseGrad)" />
            <path d="M 30 96 Q 10 98 8 100 Q 10 102 30 104 Z" fill="url(#tailBodyGrad)" />
            {/* Windows */}
            {[0,1,2,3,4,5,6].map(i => (
              <ellipse key={i}   cx={200-i*18} cy={93} rx={4.5} ry={5.5} fill="url(#windowGrad)" opacity={0.9} />
            ))}
            {[0,1,2,3,4,5,6].map(i => (
              <ellipse key={`f${i}`} cx={200-i*18} cy={93} rx={4.5} ry={5.5} stroke="#BFDBFE" strokeWidth="0.8" fill="none" opacity={0.5} />
            ))}
            {/* Wings */}
            <path d="M 130 104 L 90 160 L 170 140 L 185 110 Z" fill="url(#wingGrad)" />
            <path d="M 130 104 L 100 148 L 155 135 L 180 108 Z" fill="url(#wingHighlight)" opacity="0.6" />
            <path d="M 135 96 L 95 42 L 172 62 L 185 92 Z" fill="url(#wingTopGrad)" />
            <path d="M 140 95 L 108 50 L 168 66 L 182 92 Z" fill="url(#wingTopHighlight)" opacity="0.55" />
            <path d="M 90 160 L 170 140" stroke="#93C5FD" strokeWidth="0.8" opacity="0.5" />
            <path d="M 95 42 L 172 62"  stroke="#BFDBFE" strokeWidth="0.8" opacity="0.5" />
            {/* Stabilizers */}
            <path d="M 38 98 L 22 118 L 60 112 L 65 104 Z" fill="url(#stabGrad)" />
            <path d="M 38 98 L 22 80  L 60 88  L 65 96  Z" fill="url(#stabTopGrad)" />
            <path d="M 45 98 L 35 60  L 55 65  L 62 98  Z" fill="url(#vertStabGrad)" />
            <path d="M 45 98 L 36 65  L 48 68  L 55 96  Z" fill="url(#vertStabHighlight)" opacity="0.6" />
            {/* Engines */}
            <ellipse cx="148" cy="144" rx="18" ry="9"   fill="url(#engineGrad)" />
            <ellipse cx="148" cy="144" rx="14" ry="6.5" fill="url(#engineInner)" />
            <ellipse cx="152" cy="143" rx="5"  ry="4"   fill="#1E3A5F" opacity="0.8" />
            <ellipse cx="150" cy="141" rx="3"  ry="2"   fill="white"   opacity="0.15" />
            <ellipse cx="152" cy="56"  rx="15" ry="7.5" fill="url(#engineGrad2)" />
            <ellipse cx="152" cy="56"  rx="11" ry="5.5" fill="url(#engineInner2)" />
            <ellipse cx="155" cy="55"  rx="4"  ry="3"   fill="#1E3A5F" opacity="0.8" />
            <path d="M 158 110 L 148 138 L 152 138 L 164 110 Z" fill="#93C5FD" opacity="0.4" />
            <path d="M 160 92  L 152 60  L 156 59  L 165 91  Z" fill="#BFDBFE" opacity="0.4" />
            {/* Livery */}
            <path d="M 30 98 Q 150 95 270 100" stroke="url(#liveryGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
            <defs>
              <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#E8F4FD" />
                <stop offset="35%"  stopColor="#F0F9FF" />
                <stop offset="70%"  stopColor="#DBEAFE" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
              <linearGradient id="fuselageHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="white" stopOpacity="0.9" />
                <stop offset="100%" stopColor="white" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="noseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#DBEAFE" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
              <linearGradient id="tailBodyGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%"   stopColor="#BFDBFE" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </linearGradient>
              <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#BFDBFE" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </linearGradient>
              <linearGradient id="wingHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="white" stopOpacity="0.9" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="wingTopGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </linearGradient>
              <linearGradient id="wingTopHighlight" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="white" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="stabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </linearGradient>
              <linearGradient id="stabTopGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#BFDBFE" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </linearGradient>
              <linearGradient id="vertStabGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
              <linearGradient id="vertStabHighlight" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="white" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="engineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#CBD5E1" />
                <stop offset="50%"  stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
              <linearGradient id="engineInner" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#475569" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
              <linearGradient id="engineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
              <linearGradient id="engineInner2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#475569" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
              <linearGradient id="liveryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#60A5FA" stopOpacity="0.2" />
                <stop offset="40%"  stopColor="#60A5FA" stopOpacity="0.9" />
                <stop offset="70%"  stopColor="#6EE7B7" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Clouds — parallax via Framer Motion, animation via GSAP */}
      {[
        { ref: cloud1Ref, x: -130, y: -70,  scale: 1,    factor: 0.02  },
        { ref: cloud2Ref, x:  110, y:  80,  scale: 0.65, factor: 0.015 },
        { ref: cloud3Ref, x: -60,  y:  90,  scale: 0.5,  factor: 0.025 },
        { ref: cloud4Ref, x:  140, y: -90,  scale: 0.55, factor: 0.018 },
      ].map(({ ref, x, y, scale, factor }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `calc(50% + ${x}px)`,
            top:  `calc(50% + ${y}px)`,
            scale,
            x: useTransform(springX, v => v * factor),
            y: useTransform(springY, v => v * factor),
          }}
        >
          <svg ref={ref} width="100" height="40" viewBox="0 0 100 40" fill="none" style={{ opacity: 0 }}>
            <ellipse cx="50" cy="28" rx="44" ry="10" fill="white" opacity="0.55" />
            <ellipse cx="35" cy="22" rx="22" ry="14" fill="white" opacity="0.55" />
            <ellipse cx="58" cy="20" rx="26" ry="16" fill="white" opacity="0.55" />
            <ellipse cx="72" cy="25" rx="18" ry="11" fill="white" opacity="0.55" />
          </svg>
        </motion.div>
      ))}

      {/* Particles — parallax via Framer Motion, float via GSAP */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  p.size,
            height: p.size,
            left:   `calc(50% + ${p.x}px)`,
            top:    `calc(50% + ${p.y}px)`,
            background: p.color,
            opacity: 0,
            x: useTransform(springX, v => v * p.parallax),
            y: useTransform(springY, v => v * p.parallax),
          }}
          ref={el => { particleRefs.current[i] = el; }}
        />
      ))}
    </div>
  );
}
