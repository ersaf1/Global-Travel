"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/*     Types                                              */
interface LoadingScreenProps {
  onComplete: () => void;
}

/*     Component                                          */
export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    /* Respect reduced-motion preference   skip animation entirely */
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      onComplete();
      return;
    }

    /* Normal flow:
     * - Progress bar animates over ~1.0s (CSS/framer)
     * - After 1.4s we trigger the slide-up exit
     * - onComplete fires once the exit animation finishes (0.6s later)
     */
    const exitTimer = setTimeout(() => {
      setVisible(false);
    }, 1400);

    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 flex flex-col items-center justify-center gap-6"
          style={{
            background: "var(--surface-0)",
            zIndex: "var(--z-modal)",
          }}
          aria-live="polite"
          aria-label="Loading NOVA"
          role="status"
        >
          {/* Wordmark */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-white text-4xl font-bold tracking-widest uppercase select-none"
            style={{ fontFamily: "var(--font-head)" }}
            aria-hidden="true"
          >
            NOVA
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="relative overflow-hidden"
            style={{
              width: "192px",   /* w-48 */
              height: "1px",
              background: "var(--surface-3)",
              borderRadius: "99px",
            }}
            aria-hidden="true"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--accent)",
                borderRadius: "99px",
              }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-label select-none"
            style={{ color: "rgba(240,246,255,0.30)" }}
            aria-hidden="true"
          >
            Discover the world
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
