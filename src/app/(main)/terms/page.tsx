import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using NOVA platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services. We may update these terms from time to time — continued use constitutes acceptance of any changes.",
  },
  {
    title: "2. Use of Services",
    body: "You must be at least 18 years old to use NOVA. You agree to provide accurate information when creating an account and making bookings. You are responsible for maintaining the security of your account credentials. Commercial scraping or unauthorized use of our platform is strictly prohibited.",
  },
  {
    title: "3. Bookings and Payments",
    body: "All bookings are subject to availability and confirmation from service providers. Prices displayed include applicable taxes unless otherwise stated. Payment is processed securely at the time of booking. A confirmation email will be sent upon successful payment.",
  },
  {
    title: "4. Cancellations and Refunds",
    body: "Cancellation policies vary by service provider and booking type. Our standard policy allows cancellation up to 48 hours before the service start date for a full refund. Late cancellations may incur fees. Please review the specific policy for each booking.",
  },
  {
    title: "5. Liability",
    body: "NOVA acts as an intermediary between travelers and service providers. We are not liable for actions or omissions of third-party service providers. Our liability is limited to the amount paid for the specific service in question.",
  },
  {
    title: "6. Intellectual Property",
    body: "All content on the NOVA platform, including text, images, logos, and software, is owned by NOVA or its licensors. You may not reproduce, distribute, or create derivative works without explicit written permission.",
  },
  {
    title: "7. Contact",
    body: "For questions about these Terms, contact our legal team at legal@nova.travel or write to NOVA Travel Pte. Ltd., 1 Marina Boulevard, Singapore 018960.",
  },
];

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px", background: "var(--bg-warm)" }}>
        <div style={{ background: "linear-gradient(135deg, var(--nova-drench) 0%, var(--nova) 100%)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <p className="text-white/50 text-sm mb-2" style={{ fontFamily: "var(--font-nunito)" }}>Last updated: July 1, 2026</p>
            <h1 className="font-bold text-white" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
              Terms of Service
            </h1>
          </div>
        </div>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem" }}>
          {sections.map(({ title, body }) => (
            <div key={title} className="mb-10">
              <h2 className="font-bold mb-3" style={{ fontFamily: "var(--font-sora)", fontSize: "1.25rem", color: "var(--text)" }}>
                {title}
              </h2>
              <p style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", lineHeight: 1.8 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
