import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px", background: "var(--bg-warm)" }}>
        <div style={{ background: "linear-gradient(135deg, var(--nova-drench) 0%, var(--nova) 100%)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <h1 className="font-bold text-white mb-3" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Get in Touch
            </h1>
            <p className="text-white/60 text-lg max-w-lg" style={{ fontFamily: "var(--font-nunito)" }}>
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond within 24 hours.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "4rem 1.5rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="flex flex-col gap-5">
              {[
                { icon: "📧", label: "Email",         val: "hello@nova.travel"         },
                { icon: "💬", label: "Live Chat",      val: "Available 24/7 in-app"     },
                { icon: "📍", label: "Headquarters",   val: "Singapore, SG 018960"      },
                { icon: "⏱️", label: "Response Time",  val: "Under 2 minutes avg."      },
              ].map(({ icon, label, val }) => (
                <div key={label} className="flex items-start gap-4 p-5"
                  style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-md)", boxShadow: "var(--sh-sm)" }}>
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text)", fontFamily: "var(--font-nunito)" }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2" style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-xl)", padding: "2.5rem", boxShadow: "var(--sh-lg)" }}>
              <h2 className="font-bold mb-6" style={{ fontFamily: "var(--font-sora)", fontSize: "1.5rem", color: "var(--text)" }}>Send us a message</h2>
              <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {["Your Name", "Email Address"].map(label => (
                    <div key={label}>
                      <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>{label}</label>
                      <input type={label.includes("Email") ? "email" : "text"} placeholder={label === "Your Name" ? "John Doe" : "you@example.com"} required
                        className="w-full h-12 px-4 text-sm focus:outline-none transition-colors"
                        style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-nunito)", color: "var(--text)", background: "var(--nova-pale)" }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>Subject</label>
                  <input type="text" placeholder="How can we help?" required
                    className="w-full h-12 px-4 text-sm focus:outline-none"
                    style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-nunito)", color: "var(--text)", background: "var(--nova-pale)" }} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>Message</label>
                  <textarea placeholder="Tell us more…" required rows={5}
                    className="w-full px-4 py-3 text-sm focus:outline-none resize-none"
                    style={{ border: "1.5px solid var(--line)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-nunito)", color: "var(--text)", background: "var(--nova-pale)" }} />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="btn-nova" style={{ borderRadius: "var(--r-md)" }}>Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
