"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cities = [
  { id: "1", city: "Paris",      country: "France",       image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=3840&q=95" },
  { id: "2", city: "New York",   country: "USA",          image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=3840&q=95" },
  { id: "3", city: "Dubai",      country: "UAE",          image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=3840&q=95" },
  { id: "4", city: "Singapore",  country: "Singapore",    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=3840&q=95" },
  { id: "5", city: "Barcelona",  country: "Spain",        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=3840&q=95" },
  { id: "6", city: "Sydney",     country: "Australia",    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=3840&q=95" },
  { id: "7", city: "Istanbul",   country: "Turkey",       image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=3840&q=95" },
  { id: "8", city: "Cape Town",  country: "South Africa", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=3840&q=95" },
];

export function DestinationCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "var(--bg)", padding: "6rem 0", overflow: "hidden" }}>
      {/* Header */}
      <div ref={headRef} style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem", marginBottom: "2rem" }}>
        <div className="flex items-end justify-between">
          <div>
            <h2 style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Cities to Explore
            </h2>
            <p className="mt-3" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", fontSize: "16px" }}>
              Iconic cities, endless adventures.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} className="w-11 h-11 flex items-center justify-center transition-all hover:scale-105"
              style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", background: "white", cursor: "pointer", color: "var(--text-2)" }}
              aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll("right")} className="w-11 h-11 flex items-center justify-center transition-all hover:scale-105"
              style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", background: "white", cursor: "pointer", color: "var(--text-2)" }}
              aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable track — edge-to-edge */}
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto hide-scrollbar"
        style={{ paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2))", paddingRight: "max(1.5rem, calc((100vw - 1280px) / 2))" }}
        role="list">
        {cities.map(c => (
          <a key={c.id} href={`/destinations/${c.city.toLowerCase().replace(" ", "-")}`}
            role="listitem"
            className="relative shrink-0 overflow-hidden group"
            style={{ width: "260px", height: "360px", position: "relative", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-md)", display: "block" }}
            aria-label={`${c.city}, ${c.country}`}>
            <Image src={c.image} alt={c.city} fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="260px" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,30,53,0.85) 0%, transparent 55%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p style={{ fontFamily: "var(--font-sora)", fontWeight: 800, fontSize: "1.2rem", color: "white", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.35rem" }}>
                {c.city}
              </p>
              <div className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                <MapPin size={11} />
                <span style={{ fontSize: "12px", fontFamily: "var(--font-nunito)" }}>{c.country}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
