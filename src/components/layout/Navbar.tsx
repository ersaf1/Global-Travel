"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/planner", label: "Route Planner" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Travix home"
        >
          <div className="w-8 h-8 bg-[#111827] rounded-xl flex items-center justify-center group-hover:bg-[#1F2937] transition-colors">
            <Globe size={16} className="text-white" aria-hidden="true" />
          </div>
          <span className="font-[family-name:var(--font-poppins)] font-700 text-lg text-[#111827] tracking-tight">
            Travix
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
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "text-[#111827] bg-[#F3F4F6]"
                  : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]"
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="h-10 px-4 inline-flex items-center justify-center rounded-xl text-sm font-medium bg-[#111827] text-white hover:bg-[#1F2937] shadow-sm hover:shadow-md transition-all duration-200"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-[#E5E7EB] overflow-hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-[#111827] bg-[#F3F4F6]"
                      : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#E5E7EB]">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full h-10 inline-flex items-center justify-center rounded-xl text-sm font-medium border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB] transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="w-full h-10 inline-flex items-center justify-center rounded-xl text-sm font-medium bg-[#111827] text-white hover:bg-[#1F2937] transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
