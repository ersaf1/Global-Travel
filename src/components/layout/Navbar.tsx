"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe2, Menu, X, Plane, Hotel, Bus, Car } from "lucide-react";
import { cn } from "@/utils/cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/flights", label: "Flights" },
  { href: "/hotels", label: "Hotels" },
  { href: "/explore", label: "Explore" },
  { href: "/activities", label: "Activities" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Global Travel home">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(21,199,232,0.35)]"
            style={{ background: "linear-gradient(135deg, #15C7E8, #2E9BFF)" }}
          >
            <Globe2 size={18} className="text-white" aria-hidden="true" />
          </div>
          <span
            className="font-bold text-xl tracking-tight"
            style={{
              fontFamily: "Poppins, sans-serif",
              background: "linear-gradient(135deg, #15C7E8, #2E9BFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            TravixGo
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="listitem"
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "text-[#0F172A] bg-[#F0FBFF]"
                  : scrolled
                  ? "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                  : "text-white/90 hover:text-white hover:bg-white/15"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
              scrolled
                ? "text-[#64748B] hover:text-[#0F172A]"
                : "text-white/90 hover:text-white"
            )}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #15C7E8, #2E9BFF)" }}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "md:hidden p-2 rounded-xl transition-colors",
            scrolled ? "text-[#0F172A] hover:bg-[#F8FAFC]" : "text-white hover:bg-white/15"
          )}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-b border-[#E2E8F0] shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-[#0F172A] bg-[#F0FBFF]"
                      : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-[#E2E8F0]">
                <Link
                  href="/login"
                  className="w-full h-11 inline-flex items-center justify-center rounded-xl text-sm font-medium border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="w-full h-11 inline-flex items-center justify-center rounded-xl text-sm font-semibold text-white shadow-[0_4px_16px_rgba(21,199,232,0.35)] transition-all"
                  style={{ background: "linear-gradient(135deg, #15C7E8, #2E9BFF)" }}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
