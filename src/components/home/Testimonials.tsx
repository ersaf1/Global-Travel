"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen",   country: "Singapore", trip: "Bali & Lombok",        avatar: "SC", text: "NOVA made planning our honeymoon so effortless. The route planner suggested incredible hidden gems we never would have found on our own." },
  { name: "Marco Rossi",  country: "Italy",      trip: "Paris → Amsterdam",    avatar: "MR", text: "I travel for work constantly and NOVA has become indispensable. The multi-transport route planner saves me hours every week." },
  { name: "Amara Osei",   country: "Ghana",      trip: "Cape Town Safari",     avatar: "AO", text: "As a solo traveler, safety and reliability matter most. NOVA delivers on both. The destination guides are incredibly detailed." },
  { name: "Priya Sharma", country: "India",      trip: "Tokyo & Osaka",        avatar: "PS", text: "The flight search and hotel booking in one place is a game changer. Found deals I couldn't find anywhere else." },
];

const avatarColors = [
  { bg: "#EBF5FD", text: "#0E6CBD" },
  { bg: "#E8F5EE", text: "#1A7A4A" },
  { bg: "#FEF3E2", text: "#B85C00" },
  { bg: "#F3E8FF", text: "#7C3AED" },
];

export function Testimonials() {
  return (
    <section style={{ background: "var(--bg-dark)", padding: "var(--sec) 0" }} aria-labelledby="test-heading">
      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
          <h2 id="test-heading" className="font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Real journeys,<br />real stories.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.50)", fontFamily: "var(--font-nunito)", fontSize: "16px", maxWidth: "40ch" }}>
            Over 50,000 travelers trust NOVA to plan their perfect trip.
          </p>
        </motion.div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {testimonials.map(({ name, country, trip, avatar, text }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-5"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "var(--r-lg)",
                padding: "2rem",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}>
              {/* Quote icon */}
              <Quote size={20} style={{ color: "var(--nova)", opacity: 0.7 }} aria-hidden="true" />

              {/* Text */}
              <p style={{ color: "rgba(255,255,255,0.80)", fontFamily: "var(--font-nunito)", fontSize: "15px", lineHeight: 1.75, flex: 1 }}>
                &ldquo;{text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: avatarColors[i].bg, color: avatarColors[i].text, fontFamily: "var(--font-sora)" }}>
                  {avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm" style={{ fontFamily: "var(--font-sora)" }}>{name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.40)", fontFamily: "var(--font-nunito)" }}>
                    {country} · {trip}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
