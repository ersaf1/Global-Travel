"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MapPin, Tag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    id: "1",
    name: "Bali",
    slug: "bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    discount: "20% OFF",
    badge: "bg-[#FFD84D] text-[#0F172A]",
  },
  {
    id: "2",
    name: "Santorini",
    slug: "santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
    discount: "15% OFF",
    badge: "bg-[#15C7E8] text-white",
  },
  {
    id: "3",
    name: "Kyoto",
    slug: "kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    discount: "10% OFF",
    badge: "bg-[#2E9BFF] text-white",
  },
  {
    id: "4",
    name: "Machu Picchu",
    slug: "machu-picchu",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80",
    discount: "25% OFF",
    badge: "bg-[#FFD84D] text-[#0F172A]",
  },
];

export function PopularDestinations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        "[data-pop-title]",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );

      // Cards stagger
      gsap.fromTo(
        "[data-pop-card]",
        { opacity: 0, y: 48, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 mt-32"
      style={{ background: "#F8FAFC" }}
      aria-labelledby="popular-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12" data-pop-title style={{ opacity: 0 }}>
          <h2
            id="popular-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0F172A]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Popular Places
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <a
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              data-pop-card
              className="group block rounded-[24px] overflow-hidden cursor-pointer"
              style={{ opacity: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", background: "#fff" }}
              aria-label={`${dest.name}, ${dest.country}`}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span
                  className={`absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold ${dest.badge}`}
                >
                  <Tag size={11} aria-hidden="true" />
                  {dest.discount}
                </span>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs font-medium text-[#64748B] mb-1">{dest.country}</p>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#15C7E8] shrink-0" aria-hidden="true" />
                  <span className="font-semibold text-[#0F172A]">{dest.name}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
