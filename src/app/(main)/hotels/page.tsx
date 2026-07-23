import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hotels" };

export default function HotelsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px", background: "var(--bg-warm)" }}>
        <div style={{ background: "linear-gradient(135deg, #0A4A82 0%, #2B7FCC 100%)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-sora)" }}>Find Your Stay</p>
            <h1 className="font-bold text-white mb-4" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Hotels &amp;<br />Stays.
            </h1>
            <p className="text-white/60 text-lg max-w-lg" style={{ fontFamily: "var(--font-nunito)" }}>
              From boutique hideaways to luxury resorts — find the perfect place to rest.
            </p>
          </div>
        </div>
        <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "3rem 1.5rem" }}>
          <div style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2.5rem", boxShadow: "var(--sh-lg)" }}>
            <h2 className="font-bold mb-6" style={{ fontFamily: "var(--font-sora)", fontSize: "1.5rem", color: "var(--text)" }}>Search Hotels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Destination", type: "text",   ph: "City or area" },
                { label: "Check-in",    type: "date",   ph: "" },
                { label: "Check-out",   type: "date",   ph: "" },
                { label: "Guests",      type: "number", ph: "2" },
              ].map(({ label, type, ph }) => (
                <div key={label}>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>{label}</label>
                  <input type={type as "text" | "date" | "number"} placeholder={ph} min={type === "number" ? 1 : undefined}
                    className="w-full h-12 px-4 text-sm focus:outline-none"
                    style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-nunito)", color: "var(--text)", background: "var(--nova-pale)" }} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn-nova" style={{ borderRadius: "var(--r-md)" }}>Search Hotels</button>
            </div>
          </div>
          <div className="mt-12 text-center py-16" style={{ border: "1.5px dashed var(--line)", borderRadius: "var(--r-lg)" }}>
            <p className="text-5xl mb-4">🏨</p>
            <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-sora)", fontSize: "1.5rem", color: "var(--text)" }}>Hotel Listings Coming Soon</h3>
            <p style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>We&apos;re partnering with hotels worldwide to bring you the best rates.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
