"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, X, Shield, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: string;
  numericTarget: number;
  suffix: string;
  label: string;
  isRating: boolean;
}

const STATS: StatItem[] = [
  { value: "190+", numericTarget: 190, suffix: "+", label: "Countries",  isRating: false },
  { value: "50K+", numericTarget: 50,  suffix: "K+", label: "Travelers", isRating: false },
  { value: "4.9",  numericTarget: 4.9, suffix: " ",  label: "Rating",    isRating: true  },
  { value: "12+",  numericTarget: 12,  suffix: "+",  label: "Years",     isRating: false },
];

function useCountUp(target: number, isDecimal: boolean, active: boolean): string {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      current = Math.min(increment * step, target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [active, target]);

  if (!active) return "0";
  if (isDecimal) return count.toFixed(1);
  return Math.round(count).toString();
}

interface StatCardProps {
  stat: StatItem;
  active: boolean;
}

function StatCard({ stat, active }: StatCardProps) {
  const display = useCountUp(stat.numericTarget, stat.isRating, active);

  return (
    <div
      data-stat
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        padding: "1.5rem",
        borderRadius: "var(--r-lg)",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-head)",
          fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        {active ? display : "0"}
        <span style={{ color: "var(--accent)" }}>{stat.suffix}</span>
      </p>
      <p
        style={{
          fontFamily: "var(--font-head)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-inv3)",
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const [playing, setPlaying]   = useState(false);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-stat]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
            onEnter: () => setStatsActive(true),
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* lock body scroll when modal is open */
  useEffect(() => {
    if (playing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [playing]);

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/*    Background video    */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
        src="https://videos.pexels.com/video-files/1717026/1717026-uhd_2560_1440_25fps.mp4"
      />

      {/*    Dark scrim    */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(5,15,28,0.94) 0%, rgba(5,15,28,0.55) 50%, rgba(5,15,28,0.88) 100%)",
        }}
      />

      {/*    Content    */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "var(--wrap)",
          margin: "0 auto",
          padding: "clamp(5rem, 10vw, 8rem) 1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="story-grid"
        >
          {/*    Left column   text    */}
          <div ref={headRef} style={{ maxWidth: "640px" }}>
            {/* label */}
            <p
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "1rem",
              }}
            >
              Our Story
            </p>

            {/* headline */}
            <h2
              style={{
                fontFamily: "var(--font-head)",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
                color: "#fff",
                marginBottom: "1.5rem",
              }}
            >
              We believe every journey
              <br />
              <span style={{ color: "var(--accent)" }}>changes</span> you.
            </h2>

            {/* body */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                lineHeight: 1.75,
                color: "var(--text-inv2)",
                maxWidth: "46ch",
                marginBottom: "2rem",
              }}
            >
              NOVA was built by travelers for travelers. After years of stitching
              together bookings across dozens of sites, we decided to build
              something better   a single intelligent platform that handles
              everything, so you can focus on the adventure.
            </p>

            {/* play button row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <motion.button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Watch our story video"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="glass-strong"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.18)",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                {/* pulse ring */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: -4,
                    borderRadius: "50%",
                    border: "2px solid rgba(30,142,232,0.4)",
                    animation: "pulse-ring 1.8s ease-out infinite",
                  }}
                />
                <Play size={22} style={{ marginLeft: 3 }} />
              </motion.button>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "var(--text-inv2)",
                  lineHeight: 1.5,
                }}
              >
                Watch our story
              </p>
            </div>

            {/* trust badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
              <div
                className="glass"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "7px 14px",
                  borderRadius: "99px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-head)",
                }}
              >
                <Shield size={13} style={{ color: "var(--accent)" }} />
                SSL Secured
              </div>

              <div
                className="glass"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "7px 14px",
                  borderRadius: "99px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-head)",
                }}
              >
                <Award size={13} style={{ color: "var(--gold)" }} />
                IATA Certified
              </div>
            </div>
          </div>

          {/*    Right column   2x2 stats    */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              width: "100%",
              maxWidth: "440px",
            }}
          >
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} active={statsActive} />
            ))}
          </div>
        </div>
      </div>

      {/*    Responsive grid override    */}
      <style>{`
        @media (min-width: 900px) {
          .story-grid {
            grid-template-columns: 3fr 2fr !important;
          }
        }
      `}</style>

      {/*    Video modal    */}
      <AnimatePresence>
        {playing && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setPlaying(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 500,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "960px",
                aspectRatio: "16/9",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                boxShadow: "var(--sh-xl)",
              }}
            >
              <video
                autoPlay
                controls
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                src="https://videos.pexels.com/video-files/1717026/1717026-uhd_2560_1440_25fps.mp4"
              />

              {/* close button */}
              <button
                type="button"
                onClick={() => setPlaying(false)}
                aria-label="Close video"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.65)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  zIndex: 10,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255,255,255,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(0,0,0,0.65)";
                }}
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
