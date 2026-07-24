"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Globe, Camera, Share2, Link2, Mail, CheckCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/utils/cn";

/* --- Link columns --- */
const COLS = [
  {
    heading: "Explore",
    links: [
      { label: "Destinations", href: "/explore" },
      { label: "Flights",      href: "/flights"  },
      { label: "Hotels",       href: "/hotels"   },
      { label: "Activities",   href: "/activities"},
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About NOVA",   href: "/about"        },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Blog",         href: "/blog"         },
      { label: "Careers",      href: "/careers"      },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center",    href: "/help"    },
      { label: "Contact Us",     href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms",          href: "/terms"   },
    ],
  },
] as const;

/* --- Social buttons --- */
const SOCIALS = [
  { Icon: Globe,    label: "Web / Twitter" },
  { Icon: Camera,   label: "Instagram"     },
  { Icon: Share2,   label: "Facebook"      },
  { Icon: Link2,    label: "LinkedIn"      },
] as const;

/* --- Trust badges --- */
const BADGES = ["256-bit SSL", "IATA Member", "ATOL Protected"] as const;

/* --- Component --- */
export function Footer() {
  const [email,      setEmail]      = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <footer role="contentinfo" style={{ background: "var(--surface-0)" }}>

      {/* Top accent line */}
      <div
        aria-hidden="true"
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, var(--surface-0) 0%, var(--accent) 25%, #7AC8FF 50%, var(--accent) 75%, var(--surface-0) 100%)",
        }}
      />

      {/* Inner wrapper */}
      <div
        style={{
          maxWidth: "var(--wrap)",
          margin:   "0 auto",
          padding:  "5rem 1.5rem 2.5rem",
        }}
      >
        {/* TOP: 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 mb-16">

          {/* LEFT: Brand column */}
          <div className="flex flex-col gap-8">

            {/* Logo + wordmark */}
            <Link
              href="/"
              className="flex items-center gap-3 w-fit group"
              aria-label="NOVA home"
            >
              <Image
                src="/nova_official_logo.png"
                alt="NOVA logo"
                width={40}
                height={40}
                className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              />
              <span
                className="font-bold text-white tracking-widest text-lg uppercase"
                style={{ fontFamily: "var(--font-head)" }}
              >
                NOVA
              </span>
            </Link>

            {/* Tagline */}
            <p
              style={{
                color:      "rgba(255,255,255,0.45)",
                fontSize:   "15px",
                fontFamily: "var(--font-body)",
                lineHeight: 1.7,
                maxWidth:   "20rem",
                margin:     0,
              }}
            >
              Discover breathtaking destinations and book your perfect
              adventure &mdash; all in one place.
            </p>

            {/* Social row */}
            <div
              className="flex items-center gap-2"
              role="list"
              aria-label="NOVA on social media"
            >
              {SOCIALS.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  role="listitem"
                  className={cn(
                    "glass flex items-center justify-center transition-all duration-200",
                    "hover:border-white/20 hover:bg-white/10"
                  )}
                  style={{
                    width:        "36px",
                    height:       "36px",
                    borderRadius: "999px",
                    flexShrink:   0,
                  }}
                >
                  <Icon
                    size={15}
                    aria-hidden="true"
                    style={{ color: "rgba(255,255,255,0.50)" }}
                  />
                </button>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p
                className="text-label mb-3"
                style={{ color: "var(--accent)" }}
              >
                Stay Inspired
              </p>

              {subscribed ? (
                <div
                  className="flex items-center gap-2"
                  style={{
                    color:      "rgba(255,255,255,0.65)",
                    fontSize:   "14px",
                    fontFamily: "var(--font-body)",
                  }}
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle
                    size={16}
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  />
                  <span>You&apos;re on the list</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex" noValidate>
                  <label htmlFor="footer-email" className="sr-only">
                    Email address for newsletter
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-1 h-11 px-4 text-sm focus:outline-none"
                    style={{
                      background:   "rgba(255,255,255,0.06)",
                      border:       "1px solid rgba(255,255,255,0.10)",
                      borderRight:  "none",
                      borderRadius: "var(--r-sm) 0 0 var(--r-sm)",
                      color:        "white",
                      fontFamily:   "var(--font-body)",
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-primary h-11 px-5 text-sm"
                    style={{
                      borderRadius: "0 var(--r-sm) var(--r-sm) 0",
                      whiteSpace:   "nowrap",
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: Link columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {COLS.map(({ heading, links }) => (
              <div key={heading}>
                <p
                  className="text-label mb-5"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {heading}
                </p>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="relative inline-block group"
                        style={{
                          color:      "rgba(255,255,255,0.40)",
                          fontSize:   "14px",
                          fontFamily: "var(--font-body)",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "rgba(255,255,255,0.80)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "rgba(255,255,255,0.40)";
                        }}
                      >
                        {/* Animated underline */}
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 h-px bg-white/40 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                        />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Copyright */}
          <p
            style={{
              color:      "rgba(255,255,255,0.25)",
              fontSize:   "12px",
              fontFamily: "var(--font-body)",
            }}
          >
            &copy; 2026 NOVA Travel. All rights reserved.
          </p>

          {/* Trust badges */}
          <div className="flex items-center gap-2" aria-label="Trust certifications">
            {BADGES.map(badge => (
              <div
                key={badge}
                className="glass flex items-center gap-1.5 px-2.5 py-1"
                style={{
                  borderRadius: "999px",
                  fontSize:     "10px",
                  color:        "rgba(255,255,255,0.40)",
                  fontFamily:   "var(--font-body)",
                  whiteSpace:   "nowrap",
                }}
              >
                <ShieldCheck
                  size={10}
                  aria-hidden="true"
                  style={{ color: "var(--accent)", flexShrink: 0 }}
                />
                {badge}
              </div>
            ))}
          </div>

          {/* Email */}
          <div
            className="flex items-center gap-1.5"
            style={{
              color:      "rgba(255,255,255,0.25)",
              fontSize:   "12px",
              fontFamily: "var(--font-body)",
            }}
          >
            <Mail size={12} aria-hidden="true" />
            <span>hello@nova.travel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
