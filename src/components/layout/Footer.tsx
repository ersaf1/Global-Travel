"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Mail } from "lucide-react";
import { useState } from "react";

const cols = {
  Explore: [
    { label: "Destinations", href: "/explore" },
    { label: "Flights",      href: "/flights"  },
    { label: "Hotels",       href: "/hotels"   },
    { label: "Activities",   href: "/activities"},
  ],
  Company: [
    { label: "About NOVA",   href: "/about"         },
    { label: "How It Works", href: "/how-it-works"  },
    { label: "Blog",         href: "/blog"          },
    { label: "Careers",      href: "/careers"       },
  ],
  Support: [
    { label: "Help Center",    href: "/help"    },
    { label: "Contact Us",     href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms",          href: "/terms"   },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer style={{ background: "var(--bg-dark)" }} role="contentinfo">
      {/* Top accent line */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, var(--nova-drench), var(--nova), #7AC8FF, var(--nova), var(--nova-drench))" }} />

      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "5rem 1.5rem 2.5rem" }}>

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">

          {/* Brand + newsletter */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit group" aria-label="NOVA home">
              <Image src="/nova_official_logo.png" alt="NOVA" width={42} height={42}
                className="object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="font-bold text-white tracking-widest text-lg uppercase"
                style={{ fontFamily: "var(--font-sora)" }}>NOVA</span>
            </Link>
            <p className="text-base mb-8 max-w-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-nunito)", lineHeight: 1.7 }}>
              Discover breathtaking destinations and book your perfect adventure — all in one place.
            </p>

            {/* Newsletter */}
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>
              Stay Inspired
            </p>
            {done ? (
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>You&apos;re subscribed. ✓</p>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email.trim()) setDone(true); }} className="flex gap-0">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required aria-label="Email for newsletter"
                  className="flex-1 h-12 px-4 text-sm focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRight: "none", borderRadius: "var(--r-sm) 0 0 var(--r-sm)", color: "white", fontFamily: "var(--font-nunito)" }} />
                <button type="submit" className="h-12 px-5 flex items-center gap-2 text-white text-xs font-bold tracking-wider"
                  style={{ background: "var(--nova)", borderRadius: "0 var(--r-sm) var(--r-sm) 0", fontFamily: "var(--font-sora)" }}>
                  Subscribe <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-3 gap-8">
            {Object.entries(cols).map(([cat, links]) => (
              <div key={cat}>
                <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "rgba(255,255,255,0.30)", fontFamily: "var(--font-sora)" }}>
                  {cat}
                </p>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="text-sm hover:text-white transition-colors"
                        style={{ color: "rgba(255,255,255,0.50)", fontFamily: "var(--font-nunito)" }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-nunito)" }}>
            &copy; {new Date().getFullYear()} NOVA Travel. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-nunito)" }}>
            <Mail size={12} aria-hidden="true" />
            <span>hello@nova.travel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
