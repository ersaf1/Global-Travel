"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);   // video wrapper for parallax
  const overlayRef  = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const h1Ref       = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      /* ── 1. VIDEO PARALLAX — smooth scrub ──────────────────── */
      gsap.to(wrapRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,          // higher = more damped, silkier
        },
      });

      /* ── 2. OVERLAY DARKENS AS YOU SCROLL ──────────────────── */
      gsap.to(overlayRef.current, {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1.2,
        },
      });

      /* ── 3. CONTENT FADES + RISES AS YOU SCROLL ───────────── */
      gsap.to([h1Ref.current, subRef.current, ctaRef.current, statsRef.current], {
        y: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "70% top",
          scrub: 1.5,
        },
      });

      /* ── 4. ENTRANCE ANIMATION ─────────────────────────────── */
      const enter = gsap.timeline({ delay: 0.15 });

      enter
        .fromTo(labelRef.current,
          { opacity: 0, y: 14, filter: "blur(4px)" },
          { opacity: 1, y: 0,  filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
        )
        .fromTo(h1Ref.current,
          { opacity: 0, y: 70, filter: "blur(10px)" },
          { opacity: 1, y: 0,  filter: "blur(0px)", duration: 1.1, ease: "power4.out" },
          "-=0.3"
        )
        .fromTo(subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0,  duration: 0.7, ease: "power3.out" },
          "-=0.55"
        )
        .fromTo(ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0,  duration: 0.6, ease: "power3.out" },
          "-=0.45"
        )
        .fromTo(statsRef.current?.children ?? [],
          { opacity: 0, y: 16, scale: 0.92 },
          { opacity: 1, y: 0,  scale: 1, duration: 0.5, stagger: 0.09, ease: "back.out(1.4)" },
          "-=0.35"
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Toggle mute on video */
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(v => !v);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "640px", maxHeight: "1000px" }}
      aria-label="NOVA — Hero"
    >
      {/* ── VIDEO BACKGROUND ─────────────────────────────────── */}
      <div ref={wrapRef} className="absolute inset-0 scale-[1.15]" style={{ willChange: "transform" }}>
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
            src="https://videos.pexels.com/video-files/1580487/1580487-uhd_2560_1440_24fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            opacity: 0.42,
            background: "linear-gradient(170deg, rgba(7,30,53,0.25) 0%, rgba(10,74,130,0.45) 45%, rgba(7,20,45,0.88) 100%)",
          }}
        />
      </div>

      {/* ── AMBIENT GLOW ─────────────────────────────────────── */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(30,142,232,0.14) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* ── MUTE TOGGLE — above fade ─────────────────────────── */}
      <button
        onClick={toggleMute}
        className="absolute z-20 flex items-center justify-center glass hover:glass-md transition-all"
        style={{ bottom: "calc(5rem + 24px)", right: "1.5rem", width: "40px", height: "40px", borderRadius: "var(--r-sm)" }}
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted
          ? <VolumeX size={15} className="text-white/70" />
          : <Volume2 size={15} className="text-white" />
        }
      </button>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <div
        className="relative z-10 h-full flex flex-col justify-end"
        style={{
          maxWidth: "var(--wrap)",
          margin: "0 auto",
          padding: "0 1.5rem",
          paddingBottom: "5rem",
        }}
      >
        {/* Label */}
        <p
          ref={labelRef}
          className="font-semibold tracking-[0.18em] uppercase mb-4"
          style={{ fontFamily: "var(--font-sora)", fontSize: "11px", color: "rgba(255,255,255,0.55)", opacity: 0 }}
        >
          ✦ Discover the World
        </p>

        {/* Heading */}
        <h1
          ref={h1Ref}
          className="text-white font-bold mb-5"
          style={{
            fontFamily: "var(--font-sora)",
            fontSize: "clamp(3rem, 9vw, 8rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.035em",
            maxWidth: "12ch",
            opacity: 0,
          }}
        >
          Explore.<br />
          <span style={{ color: "rgba(100,190,255,0.92)" }}>Dream.</span><br />
          Arrive.
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="leading-relaxed mb-7"
          style={{ fontFamily: "var(--font-nunito)", fontSize: "clamp(1rem, 1.8vw, 1.15rem)", maxWidth: "40ch", color: "rgba(255,255,255,0.55)", opacity: 0 }}
        >
          Curated destinations, seamless booking, and experiences that stay with you forever.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-3 mb-8" style={{ opacity: 0 }}>
          <a href="/explore" className="btn-nova" style={{ borderRadius: "var(--r-md)", fontSize: "14px" }}>
            Start Exploring <ArrowRight size={16} />
          </a>
          <a
            href="/how-it-works"
            className="glass-md flex items-center gap-2 text-white font-semibold px-6 h-12 text-sm hover:glass-strong transition-all"
            style={{ borderRadius: "var(--r-md)", fontFamily: "var(--font-sora)" }}
          >
            How it works
          </a>
        </div>

        {/* Stats — horizontal row */}
        <div ref={statsRef} className="flex flex-wrap gap-3">
          {[
            { value: "50K+", label: "Travelers" },
            { value: "190+", label: "Countries" },
            { value: "4.9★", label: "Rating"    },
          ].map((s) => (
            <div
              key={s.label}
              className="glass text-center"
              style={{ borderRadius: "var(--r-md)", opacity: 0, padding: "0.75rem 1.25rem", minWidth: "80px" }}
            >
              <p className="text-white font-bold leading-none mb-1" style={{ fontFamily: "var(--font-sora)", fontSize: "1.25rem" }}>
                {s.value}
              </p>
              <p style={{ fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", fontFamily: "var(--font-sora)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fade into SearchSection — shorter so overlap works */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "80px", background: "linear-gradient(to bottom, transparent, #ffffff)" }}
      />
    </section>
  );
}
