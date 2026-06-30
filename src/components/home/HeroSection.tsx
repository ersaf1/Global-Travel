"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe2, Sparkles } from "lucide-react";
import { WorldMapCanvas } from "./WorldMapCanvas";
import { PlaneScene } from "./PlaneScene";

const floatingStats = [
  { value: "190+", label: "Countries" },
  { value: "50K+", label: "Travelers" },
  { value: "4.9",  label: "Rating" },
];

export function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMouse({
        x: (e.clientX - cx) * 0.5,
        y: (e.clientY - cy) * 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-[#F6F7F9] overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Ambient light blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(96,165,250,0.09) 0%, transparent 70%)",
            x: mouse.x * 0.02,
            y: mouse.y * 0.015,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(110,231,183,0.08) 0%, transparent 70%)",
            x: mouse.x * -0.018,
            y: mouse.y * -0.012,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(253,186,116,0.04) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ── World map background ── */}
      <WorldMapCanvas mouseX={mouse.x} mouseY={mouse.y} />

      {/* ── Main content grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">

          {/* ── Left — Copy ── */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#E5E7EB] rounded-full px-4 py-2 text-sm text-[#6B7280] shadow-sm mb-6 w-fit"
              role="status"
            >
              <Sparkles size={13} className="text-[#FDBA74]" aria-hidden="true" />
              Trusted by 50,000+ travelers worldwide
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-[family-name:var(--font-poppins)] text-5xl sm:text-6xl lg:text-[64px] font-bold text-[#111827] leading-[1.05] mb-6"
            >
              Explore the{" "}
              <span className="relative inline-block">
                World,
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#60A5FA] to-[#6EE7B7]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                  aria-hidden="true"
                />
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#6EE7B7]">
                Your Way
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[#6B7280] leading-relaxed max-w-md mb-8"
            >
              Plan routes, discover destinations, and book your perfect trip —
              all in one beautifully designed place.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link
                href="/planner"
                className="h-12 px-6 inline-flex items-center gap-2 rounded-xl text-base font-semibold bg-[#111827] text-white hover:bg-[#1F2937] shadow-sm hover:shadow-lg transition-all duration-200 group"
              >
                Start Planning
                <ArrowRight
                  size={17}
                  className="group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/destinations"
                className="h-12 px-6 inline-flex items-center gap-2 rounded-xl text-base font-medium border border-[#E5E7EB] bg-white/80 backdrop-blur-sm text-[#111827] hover:bg-white hover:border-[#D1D5DB] hover:shadow-md transition-all duration-200"
              >
                <Globe2 size={17} aria-hidden="true" />
                Explore Destinations
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex items-center gap-8"
              aria-label="Key statistics"
            >
              {floatingStats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                >
                  <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#111827]">
                    {value}
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">{label}</p>
                </motion.div>
              ))}

              {/* Divider */}
              <div className="w-px h-8 bg-[#E5E7EB]" aria-hidden="true" />

              {/* Live indicator */}
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#6EE7B7]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                />
                <span className="text-xs text-[#9CA3AF]">Live tracking</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right — Plane Scene ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[440px] lg:h-[520px] flex items-center justify-center"
            aria-hidden="true"
          >
            <PlaneScene mouseX={mouse.x} mouseY={mouse.y} />
          </motion.div>

        </div>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F6F7F9] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-5 h-8 border-2 border-[#D1D5DB] rounded-full flex items-start justify-center pt-1.5"
        >
          <motion.div
            className="w-1 h-1.5 bg-[#9CA3AF] rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
