"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  { id: "1", name: "Bali",         country: "Indonesia", slug: "bali",         image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=3840&q=95", tag: "Most Visited" },
  { id: "2", name: "Santorini",    country: "Greece",    slug: "santorini",    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=3840&q=95", tag: "Editor's Pick" },
  { id: "3", name: "Kyoto",        country: "Japan",     slug: "kyoto",        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=3840&q=95", tag: "Hidden Gem" },
  { id: "4", name: "Machu Picchu", country: "Peru",      slug: "machu-picchu", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=3840&q=95", tag: "Adventure" },
];

export function PopularDestinations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-pop]", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "white", padding: "0 0 6rem" }}>
      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div data-pop className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pt-16">
          <div>
            <h2 style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Popular Destinations
            </h2>
            <p className="mt-3 text-base" style={{ color: "var(--text-2)", fontFamily: "var(--font-nunito)" }}>
              Hand-picked escapes loved by our community.
            </p>
          </div>
          <a href="/explore" className="flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all shrink-0"
            style={{ color: "var(--nova)", fontFamily: "var(--font-sora)" }}>
            View All <ArrowRight size={15} />
          </a>
        </div>

        {/* Asymmetric grid   70% photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4"
          style={{ gridTemplateRows: "auto" }}>

          {/* Large featured   7 cols, full height */}
          <div data-pop className="lg:col-span-7 relative overflow-hidden group cursor-pointer"
            style={{ minHeight: "600px", position: "relative", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-lg)" }}>
            <a href={`/destinations/${destinations[0].slug}`} className="absolute inset-0 w-full h-full block"
              aria-label={`${destinations[0].name}, ${destinations[0].country}`}>
              <Image src={destinations[0].image} alt={destinations[0].name} fill priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw" />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(7,30,53,0.90) 0%, rgba(7,30,53,0.20) 50%, transparent 100%)",
              }} />
              {/* Tag */}
              <span className="absolute top-5 left-5 text-xs font-bold px-3 py-1.5 glass"
                style={{ borderRadius: "var(--r-sm)", color: "white", fontFamily: "var(--font-sora)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {destinations[0].tag}
              </span>
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-white/50 text-sm font-medium mb-1" style={{ fontFamily: "var(--font-nunito)" }}>
                  {destinations[0].country}
                </p>
                <h3 style={{ fontFamily: "var(--font-sora)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                  {destinations[0].name}
                </h3>
              </div>
            </a>
          </div>

          {/* 3 right cards stacked   5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {destinations.slice(1).map((d) => (
              <div key={d.id} data-pop className="relative overflow-hidden group cursor-pointer flex-1"
                style={{ minHeight: "188px", position: "relative", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-sm)" }}>
                <a href={`/destinations/${d.slug}`} className="absolute inset-0 block"
                  aria-label={`${d.name}, ${d.country}`}>
                  <Image src={d.image} alt={d.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 42vw" />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(105deg, rgba(7,30,53,0.80) 0%, rgba(7,30,53,0.15) 60%)",
                  }} />
                  {/* Tag */}
                  <span className="absolute top-4 left-4 text-white/60 font-semibold tracking-widest"
                    style={{ fontSize: "10px", textTransform: "uppercase", fontFamily: "var(--font-sora)" }}>
                    {d.tag}
                  </span>
                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between">
                      <h3 style={{ fontFamily: "var(--font-sora)", fontSize: "1.35rem", fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                        {d.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-white/55">
                        <MapPin size={12} />
                        <span style={{ fontSize: "12px", fontFamily: "var(--font-nunito)" }}>{d.country}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
