"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Play, Volume2, VolumeX, Globe, Users, Star, Clock } from "lucide-react";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

/*    Typing prompts                                             */
const PROMPTS = [
  "Bali for 7 days under $2000",
  "Northern Lights in Iceland",
  "Tokyo street food tour",
  "Amalfi Coast villa escape",
];

/*    Particle seed   stable across renders                      */
type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

const PARTICLES: Particle[] = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left:     `${8 + ((i * 73 + 17) % 84)}%`,
  top:      `${5 + ((i * 47 + 31) % 80)}%`,
  size:     2 + (i % 3),
  opacity:  0.15 + ((i * 0.023) % 0.25),
  duration: 3.5 + ((i * 1.3) % 4),
  delay:    (i * 0.41) % 3,
}));

/*    Stats                                                      */
const STATS = [
  { value: "190+", label: "Countries",  Icon: Globe  },
  { value: "50K+", label: "Travelers",  Icon: Users  },
  { value: "4.9",  label: "Rating",     Icon: Star   },
  { value: "12+",  label: "Years",      Icon: Clock  },
];

export function HeroSection() {
  /*    Refs                                                    */
  const sectionRef   = useRef<HTMLElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLDivElement>(null);
  const h1Ref        = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const hintRef      = useRef<HTMLDivElement>(null);

  /*    State                                                   */
  const [muted, setMuted]               = useState(true);
  const [typedText, setTypedText]       = useState("");
  const [promptIndex, setPromptIndex]   = useState(0);
  const [hintVisible, setHintVisible]   = useState(true);

  /*    Typewriter effect                                       */
  useEffect(() => {
    let charIndex  = 0;
    let isDeleting = false;
    let holdTimer:  ReturnType<typeof setTimeout> | null = null;
    let typeTimer:  ReturnType<typeof setTimeout> | null = null;
    let pIdx       = 0;

    const type = () => {
      const current = PROMPTS[pIdx];

      if (!isDeleting) {
        charIndex++;
        setTypedText(current.slice(0, charIndex));
        setHintVisible(true);

        if (charIndex === current.length) {
          /* Hold 2s then start deleting */
          isDeleting = true;
          holdTimer = setTimeout(() => {
            typeTimer = setTimeout(type, 60);
          }, 2000);
          return;
        }
      } else {
        charIndex--;
        setTypedText(current.slice(0, charIndex));

        if (charIndex === 0) {
          isDeleting = false;
          pIdx = (pIdx + 1) % PROMPTS.length;
          setPromptIndex(pIdx);
        }
      }

      typeTimer = setTimeout(type, isDeleting ? 35 : 52);
    };

    typeTimer = setTimeout(type, 900);

    return () => {
      if (holdTimer) clearTimeout(holdTimer);
      if (typeTimer) clearTimeout(typeTimer);
    };
  }, []);

  /*    Toggle mute                                             */
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(v => !v);
  }, []);

  /*    GSAP                                                    */
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      /* 1   Video parallax */
      gsap.to(wrapRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end:   "bottom top",
          scrub: 1.8,
        },
      });

      /* 2   Overlay darkens on scroll */
      gsap.fromTo(overlayRef.current,
        { opacity: 0.5 },
        {
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end:   "60% top",
            scrub: 1.2,
          },
        }
      );

      /* 3   Content fades + rises on scroll */
      gsap.to(
        [h1Ref.current, subRef.current, ctaRef.current, statsRef.current, hintRef.current],
        {
          y: -40,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "20% top",
            end:   "70% top",
            scrub: 1.5,
          },
        }
      );

      /* 4   Entrance timeline */
      const enter = gsap.timeline({ delay: 0.15 });

      enter
        .fromTo(labelRef.current,
          { opacity: 0, y: 14, filter: "blur(4px)" },
          { opacity: 1, y: 0,  filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
        )
        .fromTo(h1Ref.current,
          { opacity: 0, y: 70, filter: "blur(10px)" },
          { opacity: 1, y: 0,  filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
          "-=0.1"
        )
        .fromTo(subRef.current,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          { opacity: 1, y: 0,  filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
          "-=0.62"
        )
        .fromTo(
          ctaRef.current ? Array.from(ctaRef.current.children) : [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0,  duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(hintRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0,  duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          statsRef.current ? Array.from(statsRef.current.children) : [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0,  duration: 0.5, stagger: 0.07, ease: "power3.out" },
          "-=0.3"
        );

      /* 5   Particle float oscillations */
      if (particlesRef.current) {
        const dots = Array.from(particlesRef.current.children) as HTMLElement[];
        dots.forEach((dot, i) => {
          const amplitude = 6 + (i % 5) * 3;
          const dur       = 3.5 + (i % 4) * 0.8;
          gsap.to(dot, {
            y:        `-=${amplitude}`,
            duration: dur,
            repeat:   -1,
            yoyo:     true,
            ease:     "sine.inOut",
            delay:    (i * 0.41) % 3,
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /*    JSX                                                     */
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100dvh", maxHeight: "1080px" }}
      aria-label="NOVA   Discover the World"
    >

      {/*    VIDEO WRAP (parallax target)                        */}
      <div
        ref={wrapRef}
        className="absolute inset-0"
        style={{ scale: "1.18", willChange: "transform" }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "transform" }}
        >
          <source
            src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/*    GRADIENT OVERLAYS                                   */}
      {/* Radial deep-navy from center-bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 120% 80% at 50% 110%, rgba(5,15,28,0.92) 0%, rgba(5,15,28,0.60) 40%, transparent 70%)",
        }}
      />
      {/* Linear scrim bottom-up */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.5,
          background: "linear-gradient(to top, rgba(5,15,28,1) 0%, rgba(5,15,28,0.65) 30%, rgba(5,15,28,0.20) 60%, transparent 100%)",
        }}
      />
      {/* Top vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(5,15,28,0.55) 0%, transparent 35%)",
        }}
      />

      {/*    SUN RAYS (top-center, decorative)                   */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ opacity: 0.04 }}
      >
        {Array.from({ length: 8 }, (_, i) => {
          const angle = -70 + i * 20;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                top: 0,
                left: "50%",
                width: "2px",
                height: "100%",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, transparent 60%)",
                transformOrigin: "top center",
                transform: `rotate(${angle}deg)`,
              }}
            />
          );
        })}
      </div>

      {/*    FLOATING PARTICLES                                  */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left:    p.left,
              top:     p.top,
              width:   `${p.size}px`,
              height:  `${p.size}px`,
              background: "rgba(255,255,255,0.85)",
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/*    ACCENT GLOW ORBS                                    */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "25%", right: "18%",
          width: "420px", height: "420px",
          background: "radial-gradient(circle, rgba(30,142,232,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
          borderRadius: "50%",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "30%", left: "12%",
          width: "300px", height: "300px",
          background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
          borderRadius: "50%",
        }}
        aria-hidden="true"
      />

      {/*    MUTE BUTTON                                         */}
      <button
        onClick={toggleMute}
        className="glass absolute z-20 flex items-center justify-center transition-all hover:opacity-80"
        style={{
          bottom: "calc(140px + 1.5rem)",
          right:  "1.5rem",
          width:  "38px",
          height: "38px",
          borderRadius: "var(--r-sm)",
        }}
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted
          ? <VolumeX size={14} style={{ color: "rgba(255,255,255,0.65)" }} />
          : <Volume2 size={14} style={{ color: "#ffffff" }} />
        }
      </button>

      {/*    CONTENT                                             */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center"
        style={{ minHeight: "100dvh", padding: "0 1.5rem", paddingBottom: "8rem" }}
      >

        {/* Badge */}
        <div
          ref={labelRef}
          className="glass inline-flex items-center gap-2 mb-7"
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "999px",
            border: "1px solid rgba(30,142,232,0.35)",
            background: "rgba(30,142,232,0.10)",
            boxShadow: "0 0 0 1px rgba(30,142,232,0.15), inset 0 0 20px rgba(30,142,232,0.08)",
            opacity: 0,
          }}
        >
          <Sparkles
            size={13}
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          />
          <span
            className="text-label"
            style={{ color: "var(--accent)", fontSize: "10px", letterSpacing: "0.12em" }}
          >
            AI-Powered Travel
          </span>
          {/* Animated border ring */}
          <span
            className="animate-pulse-ring absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: "1px solid rgba(30,142,232,0.4)",
              borderRadius: "999px",
            }}
            aria-hidden="true"
          />
        </div>

        {/* H1 */}
        <h1
          ref={h1Ref}
          className="text-display text-white mb-5"
          style={{
            maxWidth: "16ch",
            lineHeight: 1.0,
            opacity: 0,
          }}
        >
          Discover the{" "}
          <span
            style={{
              display: "inline-block",
              textShadow: "0 0 40px rgba(245,166,35,0.55), 0 2px 0 rgba(245,166,35,0.18)",
              WebkitTextStroke: "0px",
            }}
          >
            World
          </span>
          <br />
          On Your Terms
        </h1>

        {/* Subtext */}
        <p
          ref={subRef}
          className="leading-relaxed mb-8"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.6vw, 1.125rem)",
            color: "var(--text-inv2)",
            maxWidth: "480px",
            opacity: 0,
          }}
        >
          NOVA plans your perfect journey   destination to door.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
          style={{ opacity: 0 }}
        >
          <a
            href="/explore"
            className="btn-primary"
            style={{ height: "52px", fontSize: "14px", borderRadius: "var(--r-md)" }}
          >
            Explore Destinations
          </a>
          <a
            href="/how-it-works"
            className="btn-ghost"
            style={{ height: "52px", fontSize: "14px", borderRadius: "var(--r-md)" }}
          >
            <Play size={15} aria-hidden="true" />
            Watch the Story
          </a>
        </div>

        {/* Typing search hint */}
        <div
          ref={hintRef}
          className="glass inline-flex items-center gap-2 mb-10"
          style={{
            padding: "0.6rem 1.1rem",
            borderRadius: "999px",
            opacity: 0,
            maxWidth: "340px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "10px",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--text-inv3)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Try:
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--text-inv2)",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {typedText}
          </span>
          {/* Blinking cursor */}
          <span
            className="animate-typing-blink"
            style={{
              display: "inline-block",
              width: "1px",
              height: "14px",
              background: "var(--accent)",
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="flex flex-wrap items-center justify-center gap-3"
          style={{ opacity: 0 }}
        >
          {STATS.map(({ value, label, Icon }) => (
            <div
              key={label}
              className="glass flex items-center gap-2.5 text-center"
              style={{
                borderRadius: "var(--r-md)",
                padding: "0.7rem 1.25rem",
                minWidth: "100px",
              }}
            >
              <Icon size={14} style={{ color: "var(--accent)", flexShrink: 0 }} aria-hidden="true" />
              <div>
                <p
                  className="text-white font-bold leading-none mb-0.5"
                  style={{ fontFamily: "var(--font-head)", fontSize: "1.1rem" }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.09em",
                    color: "rgba(255,255,255,0.40)",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-head)",
                  }}
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/*    BOTTOM FADE into surface-0                           */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "140px",
          background: "linear-gradient(to bottom, transparent, var(--surface-0))",
          zIndex: 11,
        }}
        aria-hidden="true"
      />

    </section>
  );
}
