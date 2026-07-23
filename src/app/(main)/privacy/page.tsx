import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", body: "We collect information you provide directly (name, email, payment details), information from your use of our services (search queries, booking history, location data with permission), and information from third-party partners (airlines, hotels) to fulfill bookings." },
    { title: "How We Use Your Information", body: "We use your data to process bookings, personalize your experience, send booking confirmations and updates, improve our platform, and send marketing communications (with your consent). We never sell your personal data to third parties." },
    { title: "Data Sharing", body: "We share data with service providers (hotels, airlines) to fulfill bookings, payment processors to handle transactions, and technology partners who help us operate our platform. All partners are bound by strict data protection agreements." },
    { title: "Data Security", body: "We use industry-standard encryption (TLS 1.3, AES-256) to protect your data in transit and at rest. We are PCI DSS compliant and undergo regular third-party security audits." },
    { title: "Your Rights", body: "You have the right to access, correct, or delete your personal data. You can opt out of marketing communications at any time. EU/UK residents have additional rights under GDPR. Contact privacy@nova.travel to exercise your rights." },
    { title: "Cookies", body: "We use essential cookies for platform functionality, analytics cookies (with consent) to improve our services, and marketing cookies (with consent) to show relevant offers. You can manage cookie preferences in your browser settings." },
    { title: "Contact", body: "For privacy-related queries, contact our Data Protection Officer at privacy@nova.travel or write to NOVA Travel Pte. Ltd., 1 Marina Boulevard, Singapore 018960." },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px", background: "var(--bg-warm)" }}>
        <div style={{ background: "linear-gradient(135deg, var(--nova-drench) 0%, var(--nova) 100%)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <p className="text-white/50 text-sm mb-2" style={{ fontFamily: "var(--font-nunito)" }}>Last updated: July 1, 2026</p>
            <h1 className="font-bold text-white" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}>Privacy Policy</h1>
          </div>
        </div>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem" }}>
          {sections.map(({ title, body }) => (
            <div key={title} className="mb-10">
              <h2 className="font-bold mb-3" style={{ fontFamily: "var(--font-sora)", fontSize: "1.25rem", color: "var(--text)" }}>{title}</h2>
              <p style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", lineHeight: 1.8 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
