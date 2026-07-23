"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Heart, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Cat = "All" | "Island" | "Mountain" | "Beach" | "Camping" | "Lake" | "City";
const cats: Cat[] = ["All", "Island", "Mountain", "Beach", "Camping", "Lake", "City"];

const all = [
  { id: "1", name: "Maldives",  slug: "maldives",  country: "Maldives", cat: "Island",   img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=3840&q=95", price: 1299 },
  { id: "2", name: "Banff",     slug: "banff",      country: "Canada",   cat: "Mountain", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=3840&q=95", price: 899  },
  { id: "3", name: "Phuket",    slug: "phuket",     country: "Thailand", cat: "Beach",    img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=3840&q=95", price: 699  },
  { id: "4", name: "Yosemite",  slug: "yosemite",   country: "USA",      cat: "Camping",  img: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=3840&q=95", price: 450  },
  { id: "5", name: "Como Lake", slug: "como-lake",  country: "Italy",    cat: "Lake",     img: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=3840&q=95", price: 1199 },
  { id: "6", name: "Tokyo",     slug: "tokyo",      country: "Japan",    cat: "City",     img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=3840&q=95", price: 1499 },
];

export function ExploreMore() {
  const [active, setActive] = useState<Cat>("All");
  const [liked, setLiked]   = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = active === "All" ? all : all.filter(d => d.cat === active);

  const toggleLike = (id: string) => setLiked(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-exp-hd]", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "var(--bg-warm)", padding: "6rem 0" }}>
      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div data-exp-hd className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Find Your Adventure
            </h2>
            <p className="mt-3 text-base" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>
              Filter by vibe, discover your next escape.
            </p>
          </div>
          <a href="/explore" className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all shrink-0"
            style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>
            All Destinations <ArrowRight size={14} />
          </a>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-2 flex-wrap mb-8" role="group">
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} aria-pressed={active === c}
              className="px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                borderRadius: "var(--r-sm)",
                border: "2px solid",
                borderColor: active === c ? "var(--nova)" : "var(--line)",
                background: active === c ? "var(--nova)" : "white",
                color: active === c ? "white" : "var(--text-2)",
                fontFamily: "var(--font-sora)",
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid — tall cards, 70% photo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(d => (
              <motion.div key={d.id} layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden group"
                style={{ height: "360px", position: "relative", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-md)" }}>
                <a href={`/destinations/${d.slug}`} className="absolute inset-0 block"
                  aria-label={`${d.name}, ${d.country} from $${d.price}`}>
                  <Image src={d.img} alt={d.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,30,53,0.88) 0%, rgba(7,30,53,0.05) 55%)" }} />

                  {/* Like button */}
                  <button type="button"
                    onClick={e => { e.preventDefault(); toggleLike(d.id); }}
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center glass hover:glass-md transition-all"
                    style={{ borderRadius: "var(--r-sm)" }}
                    aria-label={liked.has(d.id) ? `Unlike ${d.name}` : `Like ${d.name}`}>
                    <Heart size={14} className={liked.has(d.id) ? "fill-white text-white" : "text-white"} />
                  </button>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 style={{ fontFamily: "var(--font-sora)", fontSize: "1.25rem", fontWeight: 800, color: "white", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.35rem" }}>
                          {d.name}
                        </h3>
                        <div className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                          <MapPin size={12} />
                          <span style={{ fontSize: "12px", fontFamily: "var(--font-nunito)" }}>{d.country}</span>
                        </div>
                      </div>
                      <div className="text-right glass px-3 py-2" style={{ borderRadius: "var(--r-sm)" }}>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "10px", fontFamily: "var(--font-sora)", letterSpacing: "0.08em" }}>FROM</p>
                        <p style={{ fontFamily: "var(--font-sora)", fontSize: "1.1rem", fontWeight: 800, color: "white", lineHeight: 1 }}>
                          ${d.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
