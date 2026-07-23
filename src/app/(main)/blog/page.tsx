import { MainLayout } from "@/components/layout/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

const posts = [
  { slug: "top-10-beaches", tag: "Beaches",    title: "Top 10 Beaches to Visit in 2026",             date: "July 15, 2026",   read: "6 min", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
  { slug: "japan-guide",    tag: "Culture",    title: "The Ultimate Japan Travel Guide",               date: "July 8, 2026",    read: "12 min",img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" },
  { slug: "budget-europe",  tag: "Tips",       title: "How to Travel Europe on a Budget",             date: "June 30, 2026",   read: "8 min", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { slug: "bali-hidden",    tag: "Destinations", title: "Hidden Gems: Bali Beyond the Tourist Trail",  date: "June 22, 2026",   read: "7 min", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" },
  { slug: "solo-travel",    tag: "Solo Travel", title: "Solo Travel Safety Tips for 2026",            date: "June 14, 2026",   read: "5 min", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80" },
  { slug: "maldives",       tag: "Luxury",     title: "Maldives: Is It Worth the Splurge?",           date: "June 5, 2026",    read: "9 min", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80" },
];

export default function BlogPage() {
  return (
    <MainLayout>
      <div className="min-h-screen" style={{ paddingTop: "72px", background: "var(--bg-warm)" }}>
        <div style={{ background: "linear-gradient(135deg, var(--nova-drench) 0%, var(--nova) 100%)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "var(--wrap)", margin: "0 auto" }}>
            <h1 className="font-bold text-white mb-3" style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Travel Stories &amp; Tips
            </h1>
            <p className="text-white/60 text-lg max-w-lg" style={{ fontFamily: "var(--font-nunito)" }}>
              Inspiration, guides, and insider knowledge from our community of travelers.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "4rem 1.5rem" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(({ slug, tag, title, date, read, img }) => (
              <a key={slug} href={`/blog/${slug}`}
                className="group block overflow-hidden transition-all hover:-translate-y-1"
                style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-sm)" }}>
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold px-3 py-1" style={{ background: "var(--nova)", color: "white", borderRadius: "var(--r-sm)", fontFamily: "var(--font-sora)" }}>{tag}</span>
                  </div>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h2 className="font-bold mb-3 group-hover:text-nova transition-colors" style={{ fontFamily: "var(--font-sora)", fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.4, letterSpacing: "-0.01em" }}>
                    {title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-3)", fontFamily: "var(--font-nunito)" }}>
                    <span>{date}</span>
                    <span>·</span>
                    <span>{read} read</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
