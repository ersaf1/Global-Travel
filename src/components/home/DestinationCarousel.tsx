"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const carouselDestinations = [
  { id: "1", city: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80" },
  { id: "2", city: "New York", country: "USA", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80" },
  { id: "3", city: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { id: "4", city: "Singapore", country: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80" },
  { id: "5", city: "Barcelona", country: "Spain", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80" },
  { id: "6", city: "Sydney", country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80" },
  { id: "7", city: "Istanbul", country: "Turkey", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80" },
  { id: "8", city: "Cape Town", country: "South Africa", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80" },
];

export function DestinationCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );

      // Cards stagger from right
      const cards = trackRef.current?.querySelectorAll("[data-carousel-card]");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 48 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.07, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-white" aria-labelledby="carousel-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headingRef} className="flex items-end justify-between mb-10" style={{ opacity: 0 }}>
          <h2
            id="carousel-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0F172A]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Top City Destinations
          </h2>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:border-[#15C7E8] hover:text-[#15C7E8] transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:border-[#15C7E8] hover:text-[#15C7E8] transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto hide-scrollbar pb-4">
          <div ref={trackRef} className="flex gap-5">
            {carouselDestinations.map((dest) => (
              <a
                key={dest.id}
                href={`/destinations/${dest.city.toLowerCase().replace(" ", "-")}`}
                data-carousel-card
                className="group flex-none w-52 rounded-[24px] overflow-hidden bg-white cursor-pointer"
                style={{ opacity: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
                aria-label={`${dest.city}, ${dest.country}`}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.city}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="208px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.1) 50%, transparent 100%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-bold text-white text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {dest.city}
                    </p>
                    <div className="flex items-center gap-1">
                      <MapPin size={11} className="text-[#15C7E8]" aria-hidden="true" />
                      <p className="text-xs text-white/80">{dest.country}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
