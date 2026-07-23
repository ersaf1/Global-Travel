import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Activities" };

const activities = [
  { icon: "🤿", name: "Scuba Diving",    desc: "Explore vibrant coral reefs and marine life.",           count: "320+ experiences" },
  { icon: "🧗", name: "Rock Climbing",   desc: "Challenge yourself on world-class climbing routes.",     count: "180+ experiences" },
  { icon: "🏄", name: "Surfing",         desc: "Ride the waves at iconic surf destinations.",            count: "260+ experiences" },
  { icon: "🥾", name: "Hiking",          desc: "Trek through breathtaking landscapes and trails.",       count: "450+ experiences" },
  { icon: "🧘", name: "Wellness",        desc: "Rejuvenate with yoga retreats and spa experiences.",    count: "210+ experiences" },
  { icon: "🍽️", name: "Food Tours",      desc: "Discover local cuisine and culinary traditions.",        count: "390+ experiences" },
  { icon: "📸", name: "Photography",     desc: "Capture stunning moments at iconic locations.",          count: "140+ experiences" },
  { icon: "🚴", name: "Cycling",         desc: "Pedal through scenic countryside and city streets.",    count: "170+ experiences" },
];

export default function ActivitiesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px", background: "var(--bg-warm)" }}>
        <div style={{ background: "linear-gradient(135deg, #0A3A6A 0%, var(--nova) 100%)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-sora)" }}>Things To Do</p>
            <h1 className="font-bold text-white mb-4" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Unforgettable<br />Experiences.
            </h1>
            <p className="text-white/60 text-lg max-w-lg" style={{ fontFamily: "var(--font-nunito)" }}>
              From adventure sports to cultural tours — discover activities that make every trip remarkable.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "4rem 1.5rem" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {activities.map(({ icon, name, desc, count }) => (
              <div key={name} className="group cursor-pointer transition-all hover:-translate-y-1"
                style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-lg)", padding: "2rem", boxShadow: "var(--sh-sm)" }}>
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-sora)", fontSize: "1.1rem", color: "var(--text)" }}>{name}</h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)", lineHeight: 1.6 }}>{desc}</p>
                <p className="text-xs font-bold" style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>{count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
