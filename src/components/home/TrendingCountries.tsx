"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const countries = [
  {
    name: "Japan",     code: "JP", flag: "🇯🇵", count: 124,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=90",
    desc: "Ancient temples, neon cities, and cherry blossoms.",
  },
  {
    name: "France",    code: "FR", flag: "🇫🇷", count: 98,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=90",
    desc: "Romantic boulevards, world-class cuisine, and art.",
  },
  {
    name: "Indonesia", code: "ID", flag: "🇮🇩", count: 156,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=90",
    desc: "Tropical islands, rice paddies, and vibrant culture.",
  },
  {
    name: "Italy",     code: "IT", flag: "🇮🇹", count: 112,
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=90",
    desc: "Renaissance art, coastal cliffs, and timeless food.",
  },
  {
    name: "Thailand",  code: "TH", flag: "🇹🇭", count: 89,
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=90",
    desc: "White-sand beaches, Buddhist temples, street food.",
  },
  {
    name: "Australia", code: "AU", flag: "🇦🇺", count: 78,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=90",
    desc: "Dramatic outback, coral reefs, and iconic harbours.",
  },
  {
    name: "Brazil",    code: "BR", flag: "🇧🇷", count: 67,
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=90",
    desc: "Amazon rainforest, Carnival, and golden beaches.",
  },
  {
    name: "Morocco",   code: "MA", flag: "🇲🇦", count: 45,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=90",
    desc: "Medinas, sahara dunes, and spice-filled souks.",
  },
];

export function TrendingCountries() {
  return (
    <section style={{ background: "var(--bg-tint)", padding: "6rem 0" }} aria-labelledby="trend-heading">
      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 id="trend-heading" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Trending Right Now
            </h2>
            <p className="mt-3" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", fontSize: "16px" }}>
              The hottest destinations our travelers are booking.
            </p>
          </div>
          <a href="/explore" className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all shrink-0"
            style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>
            Browse All <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {countries.map(({ name, code, flag, count, image, desc }, i) => (
            <motion.a
              key={name}
              href={`/destinations?country=${name}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{
                borderRadius: "var(--r-lg)",
                background: "white",
                border: "1.5px solid var(--line)",
                boxShadow: "var(--sh-sm)",
                aspectRatio: "3/4",
                display: "block",
              }}
              aria-label={`${name} — ${count} destinations`}
            >
              {/* Background photo — hidden by default, revealed on hover */}
              <div
                className="absolute inset-0 transition-opacity duration-500 ease-out opacity-0 group-hover:opacity-100"
                style={{ zIndex: 0 }}
              >
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                />
                {/* Dark overlay on photo */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(7,20,45,0.90) 0%, rgba(7,20,45,0.30) 60%, transparent 100%)" }} />
              </div>

              {/* Default state — white card */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 transition-opacity duration-300 group-hover:opacity-0"
                style={{ zIndex: 1 }}
              >
                {/* Flag circle */}
                <div
                  className="w-11 h-11 flex items-center justify-center text-2xl mb-1"
                  style={{ borderRadius: "50%", background: "var(--nova-light)", border: "2px solid var(--line)" }}
                  aria-hidden="true"
                >
                  {flag}
                </div>
                <p className="font-bold text-center text-sm" style={{ fontFamily: "var(--font-sora)", color: "var(--text)", lineHeight: 1.2 }}>
                  {name}
                </p>
                <p className="text-xs text-center" style={{ color: "var(--text-3)", fontFamily: "var(--font-nunito)" }}>
                  {count} places
                </p>
              </div>

              {/* Hover state — photo + info */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                style={{ zIndex: 2 }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-lg" aria-hidden="true">{flag}</span>
                  <p className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-sora)", lineHeight: 1.2 }}>
                    {name}
                  </p>
                </div>
                <p className="text-white/65" style={{ fontSize: "11px", fontFamily: "var(--font-nunito)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
                  {desc}
                </p>
                <p className="font-semibold" style={{ fontSize: "10px", color: "rgba(120,200,255,0.85)", fontFamily: "var(--font-sora)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {count} places →
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
