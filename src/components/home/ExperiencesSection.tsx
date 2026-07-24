"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

//     Types                                                                     

type ExpCategory = "All" | "Adventure" | "Food" | "Wellness";

interface Experience {
  title: string;
  location: string;
  category: string;
  duration: string;
  group: string;
  price: number;
  img: string;
  accent: string;
}

//     Data                                                                      

const EXPERIENCES: Experience[] = [
  {
    title: "Northern Lights Hunt",
    location: "Troms , Norway",
    category: "Adventure",
    duration: "3 nights",
    group: "2 8",
    price: 890,
    img: "https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "#6366F1",
  },
  {
    title: "Street Food Safari",
    location: "Bangkok, Thailand",
    category: "Food",
    duration: "4 hours",
    group: "4 12",
    price: 65,
    img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "#F59E0B",
  },
  {
    title: "Sahara Camel Trek",
    location: "Merzouga, Morocco",
    category: "Adventure",
    duration: "2 days",
    group: "2 6",
    price: 320,
    img: "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "#EF4444",
  },
  {
    title: "Temple Meditation",
    location: "Chiang Mai, Thailand",
    category: "Wellness",
    duration: "1 day",
    group: "1 4",
    price: 85,
    img: "https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "#10B981",
  },
  {
    title: "Vineyard Sunset Tour",
    location: "Tuscany, Italy",
    category: "Food",
    duration: "5 hours",
    group: "2 10",
    price: 180,
    img: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "#8B5CF6",
  },
  {
    title: "Reef Diving Expedition",
    location: "Great Barrier Reef",
    category: "Adventure",
    duration: "Full day",
    group: "2 8",
    price: 240,
    img: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "#0EA5E9",
  },
];

const EXP_CATS: ExpCategory[] = ["All", "Adventure", "Food", "Wellness"];

//     Card                                                                      

function ExperienceCard({ exp }: { exp: Experience }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden cursor-pointer"
      style={{
        borderRadius: "var(--r-lg)",
        aspectRatio: "3/4",
        borderLeft: hovered ? `2px solid ${exp.accent}` : "2px solid transparent",
        transition: "border-color 0.3s ease",
        flexShrink: 0,
        minWidth: "260px",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      aria-label={`${exp.title}   ${exp.location}`}
    >
      {/*    Background image    */}
      <Image
        src={exp.img}
        alt={`${exp.title} in ${exp.location}`}
        fill
        sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        style={{
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/*    Gradient overlay    */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: hovered
            ? "linear-gradient(to top, rgba(5,15,28,0.97) 0%, rgba(5,15,28,0.60) 45%, rgba(5,15,28,0.15) 100%)"
            : "linear-gradient(to top, rgba(5,15,28,0.95) 0%, rgba(5,15,28,0.45) 45%, transparent 100%)",
        }}
        transition={{ duration: 0.35 }}
      />

      {/*    Top badges    */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
        {/* Category badge   tinted with accent */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 10px",
            borderRadius: "99px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: exp.accent,
            background: `${exp.accent}22`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${exp.accent}44`,
            fontFamily: "var(--font-head)",
          }}
        >
          {exp.category}
        </span>

        {/* Duration + group pill */}
        <span
          className="glass"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            borderRadius: "99px",
            fontSize: "10px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.70)",
            fontFamily: "var(--font-body)",
            flexShrink: 0,
          }}
        >
          <Clock size={10} />
          {exp.duration}
          <span style={{ color: "rgba(255,255,255,0.25)" }}> </span>
          <Users size={10} />
          {exp.group}
        </span>
      </div>

      {/*    Bottom content    */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ padding: "1.25rem" }}
      >
        {/* Title */}
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "var(--font-head)",
            lineHeight: 1.2,
            marginBottom: "6px",
          }}
        >
          {exp.title}
        </h3>

        {/* Location */}
        <div
          className="flex items-center gap-1"
          style={{ marginBottom: "10px" }}
        >
          <MapPin size={11} style={{ color: "rgba(255,255,255,0.55)", flexShrink: 0 }} />
          <span
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-body)",
            }}
          >
            {exp.location}
          </span>
        </div>

        {/* Price */}
        <p
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#fff",
            fontFamily: "var(--font-head)",
            lineHeight: 1,
          }}
        >
          From ${exp.price.toLocaleString()}
        </p>

        {/* Hover CTA */}
        <motion.div
          initial={false}
          animate={
            hovered
              ? { opacity: 1, y: 0, height: "auto" }
              : { opacity: 0, y: 10, height: 0 }
          }
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            overflow: "hidden",
            marginTop: hovered ? "14px" : "0",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <button
            type="button"
            className="btn-primary"
            style={{ height: "38px", padding: "0 18px", fontSize: "12px", width: "100%" }}
            aria-label={`Book ${exp.title}`}
          >
            Book Experience <ArrowRight size={13} />
          </button>
        </motion.div>
      </div>
    </motion.article>
  );
}

//     Section                                                                   

export function ExperiencesSection() {
  const [activeCategory, setActiveCategory] = useState<ExpCategory>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.category === activeCategory);

  // GSAP scroll-triggered stagger
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll("article");
      if (!cards || cards.length === 0) return;
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      style={{
        background:
          "linear-gradient(180deg, var(--surface-0) 0%, var(--surface-1) 100%)",
        padding: "var(--sec) 0",
      }}
    >
      <div style={{ width: "var(--wrap)", margin: "0 auto" }}>

        {/*    Section header    */}
        <div
          className="flex items-end justify-between"
          style={{ marginBottom: "2.5rem", gap: "1.5rem", flexWrap: "wrap" }}
        >
          <div>
            <p
              className="text-label"
              style={{ color: "var(--accent)", marginBottom: "10px" }}
            >
              Curated Experiences
            </p>
            <h2
              className="text-section"
              style={{ color: "#fff", marginBottom: "8px" }}
            >
              Moments that define a journey
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-inv2)",
                fontFamily: "var(--font-body)",
                maxWidth: "460px",
                lineHeight: 1.6,
              }}
            >
              Local guides, rare access, and memories that outlast any itinerary.
              Every experience is designed to feel unrepeatable.
            </p>
          </div>

          <a
            href="/activities"
            className="btn-secondary"
            style={{ height: "42px", padding: "0 20px", fontSize: "13px", flexShrink: 0 }}
            aria-label="View all experiences"
          >
            View All <ArrowRight size={14} />
          </a>
        </div>

        {/*    Category filter tabs    */}
        <div
          className="flex items-center gap-2"
          style={{ marginBottom: "2rem", flexWrap: "wrap" }}
          role="tablist"
          aria-label="Filter experiences by category"
        >
          {EXP_CATS.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cn("glass")}
              style={{
                padding: "7px 16px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "var(--font-head)",
                letterSpacing: "0.03em",
                cursor: "pointer",
                border: "none",
                transition: "background 0.22s, color 0.22s, box-shadow 0.22s",
                background:
                  activeCategory === cat
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.06)",
                color:
                  activeCategory === cat ? "#fff" : "rgba(255,255,255,0.55)",
                boxShadow:
                  activeCategory === cat
                    ? "0 4px 16px rgba(30,142,232,0.40)"
                    : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/*    Card layout   horizontal scroll on mobile, 3-col grid on desktop    */}
        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {/* Mobile: horizontal scroll container */}
              <div
                className="flex lg:hidden gap-4 overflow-x-auto pb-4"
                style={{
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                {filtered.map((exp) => (
                  <div
                    key={exp.title}
                    style={{ scrollSnapAlign: "start", flexShrink: 0, width: "272px" }}
                  >
                    <ExperienceCard exp={exp} />
                  </div>
                ))}
              </div>

              {/* Desktop: 3-column grid */}
              <div
                className="hidden lg:grid grid-cols-3"
                style={{ gap: "1.25rem" }}
              >
                {filtered.map((exp) => (
                  <ExperienceCard key={exp.title} exp={exp} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
