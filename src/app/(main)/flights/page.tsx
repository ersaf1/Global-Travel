import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Flights" };

export default function FlightsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px", background: "var(--bg-warm)" }}>
        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, var(--nova-drench) 0%, var(--nova) 100%)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-sora)" }}>Book a Flight</p>
            <h1 className="font-bold text-white mb-4" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Fly Anywhere,<br />Anytime.
            </h1>
            <p className="text-white/60 text-lg max-w-lg" style={{ fontFamily: "var(--font-nunito)" }}>
              Search thousands of routes and find the best fares for your next journey.
            </p>
          </div>
        </div>

        {/* Search form */}
        <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "3rem 1.5rem" }}>
          <div style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2.5rem", boxShadow: "var(--sh-lg)" }}>
            <h2 className="font-bold mb-6" style={{ fontFamily: "var(--font-sora)", fontSize: "1.5rem", color: "var(--text)" }}>Search Flights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {["From", "To", "Departure", "Return"].map((label) => (
                <div key={label}>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>{label}</label>
                  <input
                    type={label.includes("ure") || label === "Return" ? "date" : "text"}
                    placeholder={label === "From" ? "City or airport" : label === "To" ? "Destination" : ""}
                    className="w-full h-12 px-4 text-sm focus:outline-none transition-colors"
                    style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-nunito)", color: "var(--text)", background: "var(--nova-pale)" }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn-nova" style={{ borderRadius: "var(--r-md)" }}>Search Flights</button>
            </div>
          </div>

          {/* Coming soon notice */}
          <div className="mt-12 text-center py-16" style={{ border: "1.5px dashed var(--line)", borderRadius: "var(--r-lg)" }}>
            <p className="text-5xl mb-4">✈️</p>
            <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-sora)", fontSize: "1.5rem", color: "var(--text)" }}>Live Flight Search Coming Soon</h3>
            <p style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>We&apos;re integrating with top airlines worldwide. Stay tuned.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
