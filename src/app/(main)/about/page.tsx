import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About NOVA" };

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px" }}>
        {/* Hero */}
        <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--nova-drench) 0%, var(--nova) 100%)", padding: "7rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <h1 className="font-bold text-white mb-6" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}>
              We believe travel<br />changes everything.
            </h1>
            <p className="text-white/65 text-xl max-w-2xl" style={{ fontFamily: "var(--font-nunito)", lineHeight: 1.7 }}>
              NOVA was built by travelers, for travelers. We combine cutting-edge technology with deep travel expertise to help you discover the world on your terms.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div style={{ background: "var(--bg-warm)", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>Our Mission</p>
                <h2 className="font-bold mb-6" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                  Making world-class travel accessible to everyone.
                </h2>
                <p className="text-lg mb-4" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", lineHeight: 1.75 }}>
                  From solo backpackers to luxury families — we build tools that turn dreaming into doing. Our platform connects travelers with authentic experiences, trusted accommodations, and seamless transport.
                </p>
                <p style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", lineHeight: 1.75 }}>
                  Founded in 2014, NOVA has helped over 50,000 travelers explore 190+ countries. We&apos;re headquartered in Singapore with teams across the globe.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: "50K+", label: "Happy Travelers",   icon: "🌍" },
                  { value: "190+", label: "Countries Covered", icon: "🗺️" },
                  { value: "12+",  label: "Years Experience",  icon: "⭐" },
                  { value: "4.9★", label: "Average Rating",    icon: "💫" },
                ].map(({ value, label, icon }) => (
                  <div key={label} className="text-center" style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2rem", boxShadow: "var(--sh-sm)" }}>
                    <p className="text-3xl mb-2">{icon}</p>
                    <p className="font-bold text-2xl mb-1" style={{ fontFamily: "var(--font-sora)", color: "var(--nova)" }}>{value}</p>
                    <p className="text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div style={{ background: "var(--bg-dark)", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", textAlign: "center" }}>
            <h2 className="font-bold text-white mb-4" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
              Built by a team of passionate travelers
            </h2>
            <p className="text-lg mb-12" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-nunito)", maxWidth: "48ch", margin: "0 auto 3rem" }}>
              Our team has visited 150+ countries combined. We know travel because we live it.
            </p>
            <a href="/careers" className="btn-nova" style={{ borderRadius: "var(--r-md)" }}>Join Our Team</a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
