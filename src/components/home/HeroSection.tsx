"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSearchCard } from "./HeroSearchCard";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // GSAP parallax on image + text reveal on load
  useEffect(() => {
    if (!sectionRef.current || !imgRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Image parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero text stagger reveal on load
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.5"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "700px" }}
      aria-label="Hero section"
    >
      {/* Parallax background image */}
      <div ref={imgRef} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=85"
          alt="Tropical beach destination"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.5) 60%, rgba(15,23,42,0.7) 100%)",
          }}
        />
      </div>

      {/* Floating clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute top-16 left-[8%] w-32 h-10 bg-white/25 rounded-full blur-md"
          animate={{ x: [0, 18, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-24 left-[20%] w-20 h-6 bg-white/20 rounded-full blur-md"
          animate={{ x: [0, -12, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute top-12 right-[15%] w-28 h-8 bg-white/20 rounded-full blur-md"
          animate={{ x: [0, 14, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-32 right-[28%] w-16 h-5 bg-white/15 rounded-full blur-sm"
          animate={{ x: [0, -10, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
      </div>

      {/* Animated airplane on dotted curved path */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 700"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 100 550 Q 400 150 800 300 Q 1100 420 1380 180"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            fill="none"
          />
        </svg>
        <motion.div
          className="absolute text-xl"
          initial={{ left: "7%", top: "78%" }}
          animate={{
            left: ["7%", "25%", "55%", "76%", "95%"],
            top: ["78%", "32%", "46%", "64%", "28%"],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
        >
          ✈️
        </motion.div>
      </div>

      {/* Hero content */}
      <div
        className="relative z-10 flex flex-col items-center justify-end h-full px-4 text-center"
        style={{ paddingBottom: "180px" }}
      >
        <div ref={textRef} style={{ opacity: 0 }}>
          <h1
            className="font-bold text-white leading-tight mb-3"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              textShadow: "0 2px 24px rgba(0,0,0,0.25)",
              letterSpacing: "-0.02em",
            }}
          >
            Explore the World
            <br />
            and enjoy its beauty
          </h1>
          <p
            ref={subtitleRef}
            className="text-sm sm:text-base text-white/75 max-w-sm mx-auto"
            style={{ opacity: 0 }}
          >
            Discover breathtaking destinations, book seamlessly.
          </p>
        </div>
      </div>

      {/* Search card overlapping the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center px-4 translate-y-1/2">
        <HeroSearchCard />
      </div>
    </section>
  );
}
