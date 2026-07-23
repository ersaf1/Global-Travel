"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Menu } from "lucide-react";
import { cn } from "@/utils/cn";

const navLinks = [
  { href: "/flights",    label: "Flights"    },
  { href: "/hotels",     label: "Hotels"     },
  { href: "/explore",    label: "Explore"    },
  { href: "/activities", label: "Activities" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass-nav" : "bg-transparent"
        )}
        role="banner"
      >
        <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>
          <nav className="flex items-center justify-between" style={{ height: "72px" }} aria-label="Main navigation">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="NOVA home">
              <Image src="/nova_official_logo.png" alt="NOVA" width={40} height={40}
                className="object-contain transition-all duration-200 group-hover:opacity-80" priority />
              <span className="text-white font-bold tracking-widest text-lg uppercase"
                style={{ fontFamily: "var(--font-sora)" }}>NOVA</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href}
                  className={cn(
                    "px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-200",
                    pathname === l.href
                      ? "text-white bg-white/15"
                      : "text-white/55 hover:text-white hover:bg-white/10"
                  )}>
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => setSearchOpen(v => !v)}
                className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Search">
                {searchOpen ? <X size={16} /> : <Search size={16} />}
              </button>
              <Link href="/login"
                className="text-xs font-semibold tracking-wider uppercase text-white/60 hover:text-white transition-colors px-3 py-2">
                Sign In
              </Link>
              <Link href="/register" className="btn-nova" style={{ height: "38px", padding: "0 1.25rem", fontSize: "12px", borderRadius: "var(--r-sm)" }}>
                Get Started
              </Link>
            </div>

            {/* Mobile */}
            <button className="md:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10">
              <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0.75rem 1.5rem" }}>
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
                  <input autoFocus type="search" placeholder="Search destinations, hotels, flights…"
                    className="w-full h-11 pl-10 pr-4 glass text-white placeholder-white/30 text-sm focus:outline-none focus:glass-md transition-all"
                    style={{ borderRadius: "var(--r-sm)" }} aria-label="Search" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }} transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col pt-[72px] glass-nav"
            role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <div className="flex flex-col px-6 pt-8 pb-8 flex-1">
              <nav className="flex flex-col">
                {navLinks.map((l) => (
                  <Link key={l.href} href={l.href}
                    className={cn(
                      "py-4 text-2xl font-bold border-b border-white/10 transition-colors",
                      pathname === l.href ? "text-white" : "text-white/40 hover:text-white"
                    )}
                    style={{ fontFamily: "var(--font-sora)" }}>
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <Link href="/login" className="h-12 flex items-center justify-center glass text-white text-sm font-semibold tracking-wider uppercase"
                  style={{ borderRadius: "var(--r-sm)" }}>Sign In</Link>
                <Link href="/register" className="h-12 flex items-center justify-center bg-nova text-white text-sm font-bold tracking-wider uppercase"
                  style={{ borderRadius: "var(--r-sm)", background: "var(--nova)" }}>Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
