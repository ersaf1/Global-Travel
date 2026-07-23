import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Careers" };

const roles = [
  { title: "Senior Frontend Engineer",  team: "Engineering",  location: "Remote / Singapore", type: "Full-time" },
  { title: "Product Designer",           team: "Design",       location: "Remote / London",    type: "Full-time" },
  { title: "Backend Engineer (Node.js)", team: "Engineering",  location: "Remote",             type: "Full-time" },
  { title: "Travel Content Writer",      team: "Content",      location: "Remote",             type: "Contract"  },
  { title: "Growth Marketing Manager",   team: "Marketing",    location: "Singapore",          type: "Full-time" },
  { title: "Customer Success Lead",      team: "Support",      location: "Remote / Dubai",     type: "Full-time" },
];

export default function CareersPage() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px" }}>
        <div style={{ background: "linear-gradient(135deg, var(--nova-drench) 0%, var(--nova) 100%)", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <h1 className="font-bold text-white mb-4" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Join the NOVA Team
            </h1>
            <p className="text-white/60 text-xl max-w-xl" style={{ fontFamily: "var(--font-nunito)" }}>
              Help us build the future of travel. We&apos;re a remote-first team with a passion for exploration.
            </p>
          </div>
        </div>

        <div style={{ background: "var(--bg-warm)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              {[
                { icon: "🌍", title: "Remote First",   body: "Work from anywhere in the world. We have team members in 20+ countries." },
                { icon: "✈️", title: "Travel Perks",   body: "Annual travel budget to explore new destinations — we practice what we preach." },
                { icon: "🚀", title: "Fast Growth",    body: "Join a fast-growing startup with real ownership and career acceleration." },
              ].map(({ icon, title, body }) => (
                <div key={title} style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2rem", boxShadow: "var(--sh-sm)" }}>
                  <p className="text-4xl mb-4">{icon}</p>
                  <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-sora)", fontSize: "1.1rem", color: "var(--text)" }}>{title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>

            <h2 className="font-bold mb-8" style={{ fontFamily: "var(--font-sora)", fontSize: "2rem", color: "var(--text)", letterSpacing: "-0.02em" }}>Open Roles</h2>
            <div className="flex flex-col gap-3">
              {roles.map(({ title, team, location, type }) => (
                <div key={title} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 cursor-pointer group transition-all hover:-translate-y-0.5"
                  style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-md)", boxShadow: "var(--sh-sm)" }}>
                  <div>
                    <h3 className="font-bold mb-1 group-hover:text-nova transition-colors" style={{ fontFamily: "var(--font-sora)", fontSize: "1rem", color: "var(--text)" }}>{title}</h3>
                    <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>
                      <span>{team}</span><span>·</span><span>{location}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 shrink-0" style={{ background: "var(--nova-light)", color: "var(--nova-deep)", borderRadius: "var(--r-sm)", fontFamily: "var(--font-sora)" }}>{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
