import Link from "next/link";
import { Globe, Send, Rss, MessageCircle, Share2, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Destinations", href: "/destinations" },
    { label: "Route Planner", href: "/planner" },
    { label: "Book a Trip", href: "/booking" },
    { label: "Flight Search", href: "/planner?mode=FLIGHT" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { icon: Share2, href: "#", label: "Twitter / X" },
  { icon: MessageCircle, href: "#", label: "Instagram" },
  { icon: Send, href: "#", label: "Facebook" },
  { icon: Rss, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-[#111827] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group" aria-label="Travix home">
              <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Globe size={16} className="text-white" aria-hidden="true" />
              </div>
              <span className="font-[family-name:var(--font-poppins)] font-bold text-lg tracking-tight">
                Travix
              </span>
            </Link>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs">
              Plan routes, discover destinations, and book your perfect trip — all in one place.
              Trusted by 50,000+ travelers worldwide.
            </p>
            <div className="flex items-center gap-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7280]">
            © {new Date().getFullYear()} Travix. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-[#6B7280]">
            <Mail size={12} aria-hidden="true" />
            <span>hello@travix.app</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
