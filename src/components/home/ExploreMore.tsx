"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star, MapPin, Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "Popular" | "Island" | "Mountain" | "Beach" | "Camping" | "Lake" | "City";

const categories: Category[] = ["Popular", "Island", "Mountain", "Beach", "Camping", "Lake", "City"];

const allDestinations = [
  { id: "1", name: "Maldives", slug: "maldives", country: "Maldives", category: "Island", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", rating: 4.9, price: 1299 },
  { id: "2", name: "Banff", slug: "banff", country: "Canada", category: "Mountain", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80", rating: 4.8, price: 899 },
  { id: "3", name: "Phuket", slug: "phuket", country: "Thailand", category: "Beach", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&q=80", rating: 4.7, price: 699 },
  { id: "4", name: "Yosemite", slug: "yosemite", country: "USA", category: "Camping", image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80", rating: 4.9, price: 450 },
  { id: "5", name: "Como Lake", slug: "como-lake", country: "Italy", category: "Lake", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80", rating: 4.8, price: 1199 },
  { id: "6", name: "Tokyo", slug: "tokyo", country: "Japan", category: "City", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", rating: 4.9, price: 1499 },
];

export function ExploreMore() {
  const [active, setActive] = useState<Category>("Popular");
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  const filtered = active === "Popular" ? allDestinations : allDestinations.filter((d) => d.category === active);

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Initial scroll reveal for heading + chips
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
      );
      gsap.fromTo(
        chipsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // GSAP stagger on card grid whenever active changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-explore-card]");
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 36, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: "power3.out" }
    );
  }, [active]);

  return (
    <section ref={sectionRef} className="py-28" style={{ background: "#F8FAFC" }} aria-labelledby="explore-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headingRef} className="text-center max-w-xl mx-auto mb-10" style={{ opacity: 0 }}>
          <h2 id="explore-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Explore More
          </h2>
        </div>

        {/* Category chips */}
        <div
          ref={chipsRef}
          className="flex flex-wrap justify-center gap-3 mb-12"
          style={{ opacity: 0 }}
          role="tablist"
          aria-label="Destination categories"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200"
              style={
                active === cat
                  ? { background: "linear-gradient(135deg, #15C7E8, #2E9BFF)", color: "#fff" }
                  : { background: "#fff", color: "#64748B", border: "1.5px solid #E2E8F0" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filtered.length > 0 ? filtered : allDestinations).map((dest) => (
            <a
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              data-explore-card
              className="group block rounded-[24px] overflow-hidden bg-white cursor-pointer"
              style={{ opacity: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.07)" }}
              aria-label={`${dest.name}, ${dest.country}`}
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}>
                  <Star size={11} className="text-[#FFD84D] fill-[#FFD84D]" aria-hidden="true" />
                  <span className="text-[#0F172A]">{dest.rating}</span>
                </div>
                <button
                  className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}
                  onClick={(e) => { e.preventDefault(); toggleLike(dest.id); }}
                  aria-label={liked.has(dest.id) ? `Unlike ${dest.name}` : `Like ${dest.name}`}
                >
                  <Heart size={14} className={liked.has(dest.id) ? "text-red-500 fill-red-500" : "text-[#64748B]"} />
                </button>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#0F172A] mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>{dest.name}</h3>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-[#15C7E8]" aria-hidden="true" />
                      <span className="text-xs text-[#64748B]">{dest.country}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#64748B]">From</p>
                    <p className="font-bold text-base text-[#15C7E8]" style={{ fontFamily: "Poppins, sans-serif" }}>${dest.price}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
