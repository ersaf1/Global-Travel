"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowRight } from "lucide-react";

export function VideoBanner() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-28 bg-white" aria-label="Video section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden" style={{ height: "480px" }}>
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=85"
            alt="Travel adventure — watch our story"
            fill
            className="object-cover"
            sizes="100vw"
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.45) 100%)" }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Play button */}
              <motion.button
                className="w-20 h-20 rounded-full flex items-center justify-center text-white relative"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  border: "2px solid rgba(255,255,255,0.5)",
                }}
                onClick={() => setPlaying(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Play video"
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ border: "2px solid rgba(255,255,255,0.3)" }}
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <Play size={28} className="ml-1" fill="white" />
              </motion.button>

              {/* CTA */}
              <motion.a
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Video modal */}
        <AnimatePresence>
          {playing && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPlaying(false)}
            >
              <motion.div
                className="relative w-full max-w-4xl rounded-[24px] overflow-hidden bg-black"
                style={{ aspectRatio: "16/9" }}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Travel story video"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  onClick={() => setPlaying(false)}
                  aria-label="Close video"
                >
                  <X size={18} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
