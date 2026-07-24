"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const cities = [
  { name: "New York",  x: 220, y: 185 },
  { name: "London",    x: 460, y: 148 },
  { name: "Paris",     x: 475, y: 158 },
  { name: "Dubai",     x: 590, y: 210 },
  { name: "Singapore", x: 700, y: 270 },
  { name: "Tokyo",     x: 770, y: 185 },
  { name: "Sydney",    x: 780, y: 360 },
];

const routes = [
  [0, 1], [1, 2], [1, 3], [3, 4],
  [4, 5], [0, 5], [4, 6], [2, 3],
];

function cubicBezierPath(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2;
  const midY = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.22;
  return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
}

interface WorldMapCanvasProps {
  mouseX?: number;
  mouseY?: number;
}

export function WorldMapCanvas({ mouseX = 0, mouseY = 0 }: WorldMapCanvasProps) {
  const svgRef        = useRef<SVGSVGElement>(null);
  const routeRefs     = useRef<(SVGPathElement | null)[]>([]);
  const pinRefs       = useRef<(SVGGElement | null)[]>([]);
  const pulseRefs     = useRef<(SVGCircleElement | null)[]>([]);
  const travelerRefs  = useRef<(SVGCircleElement | null)[]>([]);
  const routePaths    = routes.map(([from, to]) =>
    cubicBezierPath(cities[from].x, cities[from].y, cities[to].x, cities[to].y)
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      //    Draw route lines   
      routeRefs.current.forEach((el, i) => {
        if (!el) return;
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        gsap.to(el, {
          strokeDashoffset: 0,
          opacity: 0.45,
          duration: 2.2,
          delay: 0.5 + i * 0.18,
          ease: "power2.inOut",
        });
      });

      //    Animate city pins in   
      pinRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { scale: 0, opacity: 0, transformOrigin: `${cities[i].x}px ${cities[i].y}px` });
        gsap.to(el, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 1.2 + i * 0.1,
          ease: "back.out(1.8)",
        });
      });

      //    Pulse rings   
      pulseRefs.current.forEach((el, i) => {
        if (!el) return;
        const city = cities[i];
        gsap.set(el, { attr: { cx: city.x, cy: city.y, r: 6 }, opacity: 0.4 });
        gsap.to(el, {
          attr: { r: 16 },
          opacity: 0,
          duration: 2.5,
          delay: 1.5 + i * 0.3,
          ease: "power2.out",
          repeat: -1,
          repeatDelay: 1.5,
        });
      });

      //    Traveling dots along routes   
      travelerRefs.current.forEach((el, i) => {
        if (!i || i >= 4) return; // only first 4 routes
        if (!el) return;
        const path = routeRefs.current[i];
        if (!path) return;

        const len = path.getTotalLength();
        const startDelay = 2 + i * 0.8;

        const animateDot = () => {
          gsap.set(el, { opacity: 0 });
          const pt = path.getPointAtLength(0);
          gsap.set(el, { attr: { cx: pt.x, cy: pt.y } });

          gsap.to({ progress: 0 }, {
            progress: 1,
            duration: 4 + i * 1.2,
            ease: "sine.inOut",
            onUpdate: function () {
              const p = path.getPointAtLength(this.targets()[0].progress * len);
              gsap.set(el, { attr: { cx: p.x, cy: p.y } });
            },
            onStart: () => gsap.to(el, { opacity: 0.85, duration: 0.3 }),
            onComplete: () => {
              gsap.to(el, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                  gsap.delayedCall(3, animateDot);
                },
              });
            },
          });
        };

        gsap.delayedCall(startDelay, animateDot);
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  // Smooth mouse parallax via CSS transform
  const tx = mouseX * 0.015;
  const ty = mouseY * 0.01;

  return (
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        style={{
          transform: `translate(${tx}px, ${ty}px)`,
          transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {/* Continent fills */}
        <g opacity="0.04" fill="#111827">
          <path d="M80,120 L180,100 L240,130 L260,180 L230,220 L200,250 L170,270 L140,260 L110,230 L85,190 Z" />
          <path d="M200,270 L240,265 L260,310 L250,370 L220,410 L190,400 L175,360 L180,310 Z" />
          <path d="M430,110 L500,100 L530,120 L520,160 L490,170 L460,165 L435,150 Z" />
          <path d="M450,180 L510,170 L540,190 L550,250 L540,320 L510,370 L480,380 L450,350 L435,290 L440,230 Z" />
          <path d="M530,100 L700,90 L800,110 L820,160 L780,200 L720,210 L660,200 L600,220 L560,200 L530,170 Z" />
          <path d="M720,310 L800,300 L830,330 L820,380 L780,400 L730,390 L710,360 Z" />
        </g>

        {/* Grid dots */}
        {Array.from({ length: 28 }).map((_, row) =>
          Array.from({ length: 50 }).map((_, col) => (
            <circle
              key={`dot-${row}-${col}`}
              cx={col * 20 + 10}
              cy={row * 18 + 10}
              r={0.8}
              fill="#111827"
              opacity={0.055}
            />
          ))
        )}

        {/* Route lines */}
        {routePaths.map((d, i) => (
          <path
            key={`route-${i}`}
            ref={el => { routeRefs.current[i] = el; }}
            d={d}
            stroke="#60A5FA"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="5 5"
          />
        ))}

        {/* Traveling dots */}
        {routes.slice(0, 4).map((_, i) => (
          <circle
            key={`traveler-${i}`}
            ref={el => { travelerRefs.current[i] = el; }}
            r={2.8}
            fill="#60A5FA"
            opacity={0}
          />
        ))}

        {/* Pulse rings */}
        {cities.map((city, i) => (
          <circle
            key={`pulse-${i}`}
            ref={el => { pulseRefs.current[i] = el; }}
            cx={city.x}
            cy={city.y}
            r={6}
            fill="none"
            stroke="#60A5FA"
            strokeWidth="1"
            opacity={0}
          />
        ))}

        {/* City pins */}
        {cities.map((city, i) => (
          <g
            key={city.name}
            ref={el => { pinRefs.current[i] = el; }}
            style={{ opacity: 0 }}
          >
            <circle cx={city.x} cy={city.y} r={3.5} fill="#60A5FA" opacity={0.9} />
            <circle cx={city.x} cy={city.y} r={1.8} fill="white"   opacity={0.9} />
            <text
              x={city.x}
              y={city.y - 9}
              textAnchor="middle"
              fontSize="7"
              fill="#374151"
              opacity={0.7}
              fontFamily="var(--font-inter, sans-serif)"
              fontWeight="500"
            >
              {city.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
