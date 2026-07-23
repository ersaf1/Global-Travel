"use client";

import { useRef, useEffect } from "react";
import { Globe2, Map, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Globe2, number: "01", title: "Discover",  body: "Browse thousands of curated destinations worldwide — from iconic landmarks to hidden local gems." },
  { icon: Map,    number: "02", title: "Plan",       body: "Build day-by-day itineraries with activities, hotels, and transport — all in one seamless flow." },
  { icon: Zap,    number: "03", title: "Book & Go",  body: "Confirm your entire trip in minutes with instant booking and 24/7 traveler support." },
];

const stats = [
  { value: "50K+", label: "Travelers" },
  { value: "190+", label: "Countries" },
  { value: "4.9★", label: "Rating"    },
  { value: "12+",  label: "Years"     },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-why]", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: "linear-gradient(160deg, #0A4A82 0%, #1E8EE8 55%, #3DAAF5 100%)",
      padding: "6rem 0",
    }} aria-labelledby="why-heading">
      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Heading */}
        <div data-why className="mb-14">
          <h2 id="why-heading" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2.25rem, 5vw, 4rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Travel made simple.
          </h2>
          <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-nunito)", maxWidth: "44ch", lineHeight: 1.65 }}>
            Everything you need to discover, plan, and book your perfect trip — beautifully.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {steps.map(({ icon: Icon, number, title, body }) => (
            <div data-why key={number} className="group hover:scale-[1.02] transition-transform duration-300"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: "var(--r-xl)",
                padding: "2.5rem",
              }}>
              <div className="flex items-start justify-between mb-8">
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-sora)" }}>{number}</span>
                <div className="w-10 h-10 flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)", borderRadius: "var(--r-sm)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Icon size={18} style={{ color: "rgba(255,255,255,0.85)" }} aria-hidden="true" />
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-sora)", fontSize: "1.4rem", fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                {title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.75, fontFamily: "var(--font-nunito)" }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div data-why className="grid grid-cols-2 sm:grid-cols-4 gap-0"
          style={{
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "var(--r-xl)",
            overflow: "hidden",
          }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} className="text-center py-8 px-4"
              style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
              <p style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 800, color: "white", lineHeight: 1, marginBottom: "0.4rem" }}>
                {value}
              </p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-sora)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
