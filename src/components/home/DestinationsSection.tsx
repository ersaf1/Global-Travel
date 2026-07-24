"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Star,
  Thermometer,
  Sparkles,
  MapPin,
} from "lucide-react";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

//     Types                                                                     

type FilterTab = "All" | "Beach" | "City" | "Adventure" | "Luxury" | "Nature";

interface Destination {
  name: string;
  country: string;
  desc: string;
  tag: string;
  rating: number;
  price: string;
  duration: string;
  img: string;
  weather: string;
  aiPick: boolean;
  filter: FilterTab[];
}

//     Data                                                                      

const DESTINATIONS: Destination[] = [
  {
    name: "Santorini",
    country: "Greece",
    desc: "Whitewashed villages and volcanic sunsets over the Aegean.",
    tag: "Trending",
    rating: 4.9,
    price: "From $890",
    duration: "5 7 days",
    img: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1200",
    weather: "26 C",
    aiPick: true,
    filter: ["Beach", "Luxury"],
  },
  {
    name: "Kyoto",
    country: "Japan",
    desc: "Ancient temples and cherry blossoms through every season.",
    tag: "AI Pick",
    rating: 4.8,
    price: "From $1,200",
    duration: "7 10 days",
    img: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1200",
    weather: "22 C",
    aiPick: true,
    filter: ["City", "Nature"],
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    desc: "Sheer cliffs, turquoise water, and fresh limoncello.",
    tag: "Popular",
    rating: 4.9,
    price: "From $1,100",
    duration: "5 8 days",
    img: "https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg?auto=compress&cs=tinysrgb&w=1200",
    weather: "28 C",
    aiPick: false,
    filter: ["Beach", "Luxury"],
  },
  {
    name: "Patagonia",
    country: "Argentina",
    desc: "Raw wilderness, granite towers, and endless sky.",
    tag: "Adventure",
    rating: 4.7,
    price: "From $1,800",
    duration: "10 14 days",
    img: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1200",
    weather: "12 C",
    aiPick: false,
    filter: ["Adventure", "Nature"],
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    desc: "Crystal lagoons, overwater villas, and coral reefs.",
    tag: "Luxury",
    rating: 4.9,
    price: "From $2,400",
    duration: "7 10 days",
    img: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    weather: "30 C",
    aiPick: true,
    filter: ["Beach", "Luxury"],
  },
  {
    name: "Iceland",
    country: "North Atlantic",
    desc: "Glaciers, geysers, and the aurora borealis.",
    tag: "Bucket List",
    rating: 4.8,
    price: "From $1,500",
    duration: "8 10 days",
    img: "https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=1200",
    weather: "8 C",
    aiPick: false,
    filter: ["Adventure", "Nature"],
  },
];

const FILTER_TABS: FilterTab[] = [
  "All",
  "Beach",
  "City",
  "Adventure",
  "Luxury",
  "Nature",
];

//     Card                                                                      

function DestinationCard({
  dest,
  large,
}: {
  dest: Destination;
  large: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={cn(
        "relative overflow-hidden cursor-pointer group",
        large ? "lg:col-span-2 lg:row-span-2" : ""
      )}
      style={{ borderRadius: "var(--r-lg)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${dest.name}, ${dest.country}`}
    >
      {/*    Image    */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: large ? "16/10" : "4/3",
          height: large ? "100%" : "auto",
        }}
      >
        <Image
          src={dest.img}
          alt={`${dest.name}, ${dest.country}`}
          fill
          sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {/*    Gradient overlay    */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(5,15,28,0.98) 0%, rgba(5,15,28,0.55) 50%, rgba(5,15,28,0.10) 100%)"
              : "linear-gradient(to top, rgba(5,15,28,0.95) 0%, rgba(5,15,28,0.40) 50%, transparent 100%)",
            transition: "background 0.4s ease",
          }}
        />

        {/*    Top badges    */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          {/* Tag + AI Pick */}
          <div className="flex flex-col gap-1.5">
            <span
              className="glass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 10px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: dest.aiPick ? "var(--accent)" : "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-head)",
                borderRadius: "99px",
              }}
            >
              {dest.tag}
            </span>
            {dest.aiPick && (
              <span
                className="glass"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontFamily: "var(--font-head)",
                  borderRadius: "99px",
                }}
              >
                <Sparkles size={10} />
                AI Pick
              </span>
            )}
          </div>

          {/* Weather pill */}
          <span
            className="glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              fontSize: "11px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-body)",
              borderRadius: "99px",
              flexShrink: 0,
            }}
          >
            <Thermometer size={11} style={{ color: "var(--accent)" }} />
            {dest.weather}
          </span>
        </div>

        {/*    Bottom content (always visible)    */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          {/* Country */}
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.50)",
              fontFamily: "var(--font-head)",
              marginBottom: "4px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <MapPin size={10} />
            {dest.country}
          </p>

          {/* Name */}
          <h3
            style={{
              fontSize: large ? "28px" : "20px",
              fontWeight: 800,
              color: "#fff",
              fontFamily: "var(--font-head)",
              lineHeight: 1.1,
              marginBottom: "8px",
            }}
          >
            {dest.name}
          </h3>

          {/* Price + duration row */}
          <div className="flex items-center gap-3" style={{ marginBottom: "6px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
                fontFamily: "var(--font-body)",
              }}
            >
              {dest.price}
            </span>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}> </span>
            <span
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.50)",
                fontFamily: "var(--font-body)",
              }}
            >
              {dest.duration}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star
              size={13}
              fill="var(--gold)"
              style={{ color: "var(--gold)" }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--gold)",
                fontFamily: "var(--font-head)",
              }}
            >
              {dest.rating}
            </span>
          </div>

          {/* Hover reveal */}
          <motion.div
            initial={false}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ marginTop: "12px", pointerEvents: hovered ? "auto" : "none" }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-body)",
                lineHeight: 1.55,
                marginBottom: "14px",
              }}
            >
              {dest.desc}
            </p>
            <button
              type="button"
              className="btn-primary"
              style={{ height: "38px", padding: "0 18px", fontSize: "12px" }}
              aria-label={`Explore ${dest.name}`}
            >
              Explore <ArrowRight size={13} />
            </button>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

//     Section                                                                   

export function DestinationsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered =
    activeFilter === "All"
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.filter.includes(activeFilter));

  // GSAP scroll-triggered stagger
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll("article");
      if (!cards || cards.length === 0) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  // Re-run stagger when filter changes
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll("article");
    if (!cards || cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }
    );
  }, [activeFilter]);

  return (
    <section
      id="destinations"
      ref={sectionRef}
      style={{
        background: "var(--surface-1)",
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
              style={{
                color: "var(--accent)",
                marginBottom: "10px",
              }}
            >
              Explore Destinations
            </p>
            <h2
              className="text-section"
              style={{ color: "#fff", marginBottom: "8px" }}
            >
              The world&apos;s most remarkable places
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-inv2)",
                fontFamily: "var(--font-body)",
                maxWidth: "480px",
                lineHeight: 1.6,
              }}
            >
              Handpicked by our travel experts and refined by AI   every
              destination a story worth telling.
            </p>
          </div>

          <a
            href="/destinations"
            className="btn-secondary"
            style={{ height: "42px", padding: "0 20px", fontSize: "13px", flexShrink: 0 }}
            aria-label="View all destinations"
          >
            View All <ArrowRight size={14} />
          </a>
        </div>

        {/*    Filter tabs    */}
        <div
          className="flex items-center gap-2"
          style={{ marginBottom: "2rem", flexWrap: "wrap" }}
          role="tablist"
          aria-label="Filter destinations by category"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab}
              onClick={() => setActiveFilter(tab)}
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
                transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                background:
                  activeFilter === tab
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.06)",
                color:
                  activeFilter === tab ? "#fff" : "rgba(255,255,255,0.60)",
                boxShadow:
                  activeFilter === tab
                    ? "0 4px 16px rgba(30,142,232,0.40)"
                    : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/*    Card grid    */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "1.25rem" }}
          >
            {filtered.map((dest, i) => (
              <DestinationCard
                key={dest.name}
                dest={dest}
                large={i === 0 && activeFilter === "All"}
              />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
