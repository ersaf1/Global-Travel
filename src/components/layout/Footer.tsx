"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe2, Send, MessageCircle, Share2, Rss, Mail, ArrowRight } from "lucide-react";

const footerLinks = {
  About: [
    { label: "Our Story", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  Company: [
    { label: "Press", href: "/press" },
    { label: "Partners", href: "/partners" },
    { label: "Investors", href: "/investors" },
    { label: "Affiliate", href: "/affiliate" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { icon: Share2, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "Instagram" },
  { icon: Send, href: "#", label: "Facebook" },
  { icon: Rss, href: "#", label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0F172A] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit" aria-label="TravixGo home">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #15C7E8, #2E9BFF)" }}
              >
                <Globe2 size={18} className="text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                TravixGo
              </span>
            </Link>

            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs">
              Discover breathtaking destinations, plan seamlessly, and book your perfect adventure — all in one premium platform. Trusted by 50K+ travelers.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, #15C7E8, #2E9BFF)";
                    (e.currentTarget as HTMLAnchorElement).style.border = "1px solid transparent";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLAnchorElement).style.border = "1px solid rgba(255,255,255,0.08)";
                  }}
                >
                  <Icon size={15} className="text-[#94A3B8] group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3
                className="text-sm font-semibold text-white mb-5 uppercase tracking-wider"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {title}
              </h3>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter col */}
          <div className="lg:col-span-1 md:col-span-2">
            <h3
              className="text-sm font-semibold text-white mb-2 uppercase tracking-wider"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Newsletter
            </h3>
            <p className="text-sm text-[#94A3B8] mb-5 leading-relaxed">
              Get travel inspiration and exclusive deals delivered to your inbox.
            </p>

            {subscribed ? (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm"
                style={{
                  background: "rgba(21,199,232,0.12)",
                  border: "1px solid rgba(21,199,232,0.25)",
                  color: "#15C7E8",
                }}
              >
                <Mail size={15} />
                Thanks! You&apos;re subscribed.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" aria-hidden="true" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-11 pl-10 pr-4 rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid #15C7E8";
                      e.target.style.boxShadow = "0 0 0 3px rgba(21,199,232,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                    aria-label="Email address for newsletter"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #15C7E8, #2E9BFF)",
                    boxShadow: "0 4px 16px rgba(21,199,232,0.35)",
                  }}
                >
                  Subscribe
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs text-[#475569]">
            &copy; {new Date().getFullYear()} TravixGo. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-[#475569]">
            <Mail size={12} aria-hidden="true" />
            <span>hello@travixgo.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
