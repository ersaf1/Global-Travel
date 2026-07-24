"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Menu } from "lucide-react";
import { cn } from "@/utils/cn";

/*     Data                                               */
const navLinks = [
  { href: "/flights",    label: "Flights"    },
  { href: "/hotels",     label: "Hotels"     },
  { href: "/explore",    label: "Explore"    },
  { href: "/activities", label: "Activities" },
];

const suggestedDestinations = [
  "Santorini",
  "Kyoto",
  "Bali",
  "Patagonia",
  "Iceland",
];

/*     Component                                          */
export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const searchInputRef                = useRef<HTMLInputElement>(null);
  const pathname                      = usePathname();

  /* scroll detection */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* close overlays on route change */
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  /* lock body scroll when mobile drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* keyboard: Escape closes search and mobile */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  /* focus search input when overlay opens */
  useEffect(() => {
    if (searchOpen) {
      // small delay to let animation start
      const t = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  return (
    <>
      {/*     Main header bar                             */}
      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 transition-all duration-500",
          scrolled ? "glass-nav" : "bg-transparent"
        )}
        style={{ zIndex: "var(--z-navbar)" }}
      >
        <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>
          <nav
            className="flex items-center justify-between"
            style={{ height: "72px" }}
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="NOVA home"
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <Image
                src="/nova_official_logo.png"
                alt="NOVA"
                width={36}
                height={36}
                priority
                className="object-contain transition-opacity duration-200 group-hover:opacity-80"
              />
              <span
                className="font-bold tracking-widest text-base uppercase text-white"
                style={{ fontFamily: "var(--font-head)" }}
              >
                NOVA
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1" role="list">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="listitem"
                    className={cn(
                      "relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200",
                      "rounded-lg group",
                      isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white/90"
                    )}
                    style={{ fontFamily: "var(--font-head)" }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {/* animated underline */}
                    <span
                      className={cn(
                        "absolute bottom-0.5 left-4 right-4 h-px rounded-full transition-transform duration-300 origin-left",
                        "bg-accent",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2.5">
              {/* Search button */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search destinations"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200"
              >
                <Search size={16} aria-hidden="true" />
              </button>

              {/* Sign In   desktop only */}
              <Link
                href="/login"
                className="btn-ghost hidden md:inline-flex h-9 px-4 text-xs rounded-xl"
                style={{ height: "36px", fontSize: "12px", padding: "0 1rem", borderRadius: "10px" }}
              >
                Sign In
              </Link>

              {/* Get Started   desktop only */}
              <Link
                href="/register"
                className="btn-primary hidden md:inline-flex h-9 px-4 text-xs rounded-xl"
                style={{ height: "36px", fontSize: "12px", padding: "0 1rem", borderRadius: "10px" }}
              >
                Get Started
              </Link>

              {/* Hamburger   mobile only */}
              <button
                className="md:hidden w-9 h-9 glass rounded-full flex items-center justify-center text-white"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
              >
                <Menu size={18} aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/*     Search overlay                               */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 flex items-center justify-center"
            style={{
              zIndex: "var(--z-modal)",
              background: "rgba(5,15,28,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Search destinations"
          >
            {/* Close button */}
            <button
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200"
            >
              <X size={18} aria-hidden="true" />
            </button>

            {/* Search content */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-3xl">
              <p
                className="text-label"
                style={{ color: "rgba(240,246,255,0.30)" }}
              >
                Where are you going?
              </p>

              <input
                ref={searchInputRef}
                type="text"
                placeholder="Destinations, experiences, hotels "
                className="text-hero text-white bg-transparent border-none outline-none text-center w-full"
                style={{
                  fontFamily: "var(--font-head)",
                  caretColor: "var(--accent)",
                }}
                aria-label="Search destinations"
              />

              {/* Suggested destinations */}
              <div className="flex gap-3 flex-wrap justify-center" role="list" aria-label="Suggested destinations">
                {suggestedDestinations.map((dest) => (
                  <button
                    key={dest}
                    role="listitem"
                    className="px-4 py-2 glass rounded-full text-sm font-medium text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
                    style={{ fontFamily: "var(--font-body)" }}
                    onClick={() => {
                      if (searchInputRef.current) {
                        searchInputRef.current.value = dest;
                        searchInputRef.current.focus();
                      }
                    }}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*     Mobile drawer                                */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 md:hidden"
              style={{
                zIndex: "calc(var(--z-modal) - 1)",
                background: "rgba(5,15,28,0.60)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-drawer"
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] md:hidden"
              style={{
                zIndex: "var(--z-modal)",
                background: "var(--surface-0)",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex flex-col h-full p-6">
                {/* Drawer header */}
                <div className="flex items-center justify-between mb-10">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 group"
                    aria-label="NOVA home"
                  >
                    <Image
                      src="/nova_official_logo.png"
                      alt="NOVA"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <span
                      className="font-bold tracking-widest text-base uppercase text-white"
                      style={{ fontFamily: "var(--font-head)" }}
                    >
                      NOVA
                    </span>
                  </Link>

                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation menu"
                    className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>

                {/* Nav links   staggered */}
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 + i * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center h-12 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200",
                            isActive
                              ? "text-white bg-white/08 border border-white/10"
                              : "text-white/50 hover:text-white hover:bg-white/05"
                          )}
                          style={{ fontFamily: "var(--font-head)" }}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {link.label}
                          {isActive && (
                            <span
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* CTA buttons at bottom */}
                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="h-12 flex items-center justify-center rounded-xl text-sm font-semibold tracking-wide text-white transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-head)",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary h-12 flex items-center justify-center rounded-xl text-sm"
                    style={{ borderRadius: "12px", height: "48px" }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
