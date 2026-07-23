import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "How It Works" };

const steps = [
  { num: "01", icon: "🔍", title: "Search & Discover",  body: "Browse our curated collection of destinations, hotels, flights, and activities. Use smart filters to find exactly what fits your style and budget." },
  { num: "02", icon: "📋", title: "Plan Your Itinerary", body: "Build your perfect day-by-day itinerary using our interactive planner. Add activities, hotels, and transport — all in one timeline view." },
  { num: "03", icon: "💳", title: "Book in Minutes",     body: "Confirm your entire trip with a few clicks. Secure payment, instant confirmation, and all your bookings in one place." },
  { num: "04", icon: "✈️", title: "Travel & Enjoy",      body: "Arrive with confidence. Access your trip details offline, get real-time updates, and reach our 24/7 support anytime." },
];

export default function HowItWorksPage() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px" }}>
        <div style={{ background: "linear-gradient(135deg, var(--nova-drench) 0%, var(--nova) 100%)", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", textAlign: "center" }}>
            <h1 className="font-bold text-white mb-4" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              How NOVA Works
            </h1>
            <p className="text-white/60 text-xl max-w-xl mx-auto" style={{ fontFamily: "var(--font-nunito)" }}>
              From inspiration to boarding pass — in four simple steps.
            </p>
          </div>
        </div>

        <div style={{ background: "var(--bg-warm)", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map(({ num, icon, title, body }) => (
                <div key={num} style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-xl)", padding: "2.5rem", boxShadow: "var(--sh-sm)" }}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center justify-center text-2xl w-14 h-14 shrink-0" style={{ background: "var(--nova-light)", borderRadius: "var(--r-md)" }}>{icon}</div>
                    <span className="font-bold text-sm tracking-widest" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>{num}</span>
                  </div>
                  <h3 className="font-bold mb-3" style={{ fontFamily: "var(--font-sora)", fontSize: "1.35rem", color: "var(--text)", letterSpacing: "-0.02em" }}>{title}</h3>
                  <p style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a href="/register" className="btn-nova" style={{ borderRadius: "var(--r-md)", fontSize: "15px", height: "52px", padding: "0 2rem" }}>
                Get Started — It&apos;s Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
