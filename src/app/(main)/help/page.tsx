import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Help Center" };

const faqs = [
  { q: "How do I book a trip on NOVA?",              a: "Browse destinations, select your dates, add to your itinerary, and confirm with payment. The whole process takes under 5 minutes." },
  { q: "Can I cancel or modify my booking?",         a: "Yes. Most bookings can be cancelled or modified up to 24–48 hours before the start date. Check each booking's policy for specific terms." },
  { q: "Is my payment information secure?",          a: "Absolutely. We use 256-bit SSL encryption and are PCI DSS compliant. We never store your full card details." },
  { q: "What happens if my flight is cancelled?",    a: "We monitor all bookings in real-time. If your flight is cancelled, we'll notify you immediately and help arrange alternatives at no extra cost." },
  { q: "Do you offer travel insurance?",             a: "Yes, we partner with leading insurers to offer comprehensive travel insurance. You can add it during the booking process." },
  { q: "How do I contact customer support?",         a: "Our 24/7 support team is available via live chat, email (support@nova.travel), or phone. Average response time is under 2 minutes." },
];

export default function HelpPage() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px", background: "var(--bg-warm)" }}>
        <div style={{ background: "linear-gradient(135deg, var(--nova-drench) 0%, var(--nova) 100%)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", textAlign: "center" }}>
            <h1 className="font-bold text-white mb-4" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              How can we help?
            </h1>
            <div style={{ maxWidth: "480px", margin: "0 auto" }}>
              <input type="search" placeholder="Search for answers…"
                className="w-full h-14 px-5 text-base focus:outline-none"
                style={{ background: "white", border: "none", borderRadius: "var(--r-md)", fontFamily: "var(--font-nunito)", color: "var(--text)", boxShadow: "var(--sh-md)" }} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "4rem 1.5rem" }}>
          <h2 className="font-bold mb-8" style={{ fontFamily: "var(--font-sora)", fontSize: "1.75rem", color: "var(--text)", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-md)", padding: "1.75rem", boxShadow: "var(--sh-sm)" }}>
                <h3 className="font-bold mb-3" style={{ fontFamily: "var(--font-sora)", fontSize: "1rem", color: "var(--text)" }}>{q}</h3>
                <p className="text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", lineHeight: 1.75 }}>{a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8" style={{ background: "var(--nova-light)", borderRadius: "var(--r-xl)", border: "1.5px solid var(--line)" }}>
            <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-sora)", fontSize: "1.25rem", color: "var(--text)" }}>Still need help?</h3>
            <p className="mb-5 text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>Our support team is available 24/7.</p>
            <a href="/contact" className="btn-nova" style={{ borderRadius: "var(--r-md)" }}>Contact Support</a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
