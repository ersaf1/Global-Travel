"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowRight } from "lucide-react";

export function VideoBanner() {
  const [playing, setPlaying] = useState(false);

  return (
    <section style={{ background: "var(--bg-warm)", padding: "6rem 0" }}>
      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Our Story
            </h2>
            <p className="mt-3" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", fontSize: "16px" }}>
              Born from a love of exploration.
            </p>
          </div>
          <a href="/about" className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all shrink-0"
            style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>
            About NOVA <ArrowRight size={14} />
          </a>
        </div>

        {/* Video block */}
        <div className="relative overflow-hidden group cursor-pointer" style={{ height: "520px", borderRadius: "var(--r-xl)", boxShadow: "var(--sh-xl)" }}
          onClick={() => setPlaying(true)} role="button" aria-label="Play NOVA story video" tabIndex={0}
          onKeyDown={e => e.key === "Enter" && setPlaying(true)}>
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=3840&q=95"
            alt="NOVA story"
            fill priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "rgba(7,30,53,0.42)" }} />

          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center glass-md"
              style={{ width: "80px", height: "80px", borderRadius: "50%", cursor: "pointer" }}>
              <Play size={28} className="text-white ml-1" fill="white" />
            </motion.div>
            <div className="text-center">
              <p style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                Watch Our Story
              </p>
              <p className="mt-2" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-nunito)", fontSize: "15px" }}>
                2 min · How NOVA was born from a love of exploration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(7,20,40,0.90)" }}
            onClick={() => setPlaying(false)}
            role="dialog" aria-modal="true">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl aspect-video bg-black"
              style={{ borderRadius: "var(--r-lg)" }}
              onClick={e => e.stopPropagation()}>
              <iframe className="w-full h-full" style={{ borderRadius: "var(--r-lg)" }}
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="NOVA story" allow="autoplay; fullscreen" allowFullScreen />
              <button className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                style={{ background: "rgba(0,0,0,0.6)", borderRadius: "var(--r-sm)" }}
                onClick={() => setPlaying(false)} aria-label="Close video">
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
