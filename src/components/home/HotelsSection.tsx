"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Star,
  MapPin,
  Wifi,
  Waves,
  Dumbbell,
  Utensils,
  ArrowRight,
  Coffee,
  Binoculars,
} from "lucide-react";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

//     Types                                                                     

type HotelCategory = "All" | "Boutique" | "Villa" | "Resort" | "Luxury";

interface Hotel {
  name: string;
  location: string;
  cat: string;
  price: number;
  rating: number;
  img: string;
  tag: string;
  amenities: string[];
}

//     Data                                                                      

const HOTELS: Hotel[] = [
  {
    name: "Amanya Lodge",
    location: "Amboseli, Kenya",
    cat: "Luxury",
    price: 420,
    rating: 4.9,
    img: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Bestseller",
    amenities: ["WiFi", "Pool", "Spa"],
  },
  {
    name: "Frangipani Villa",
    location: "Ubud, Bali",
    cat: "Villa",
    price: 280,
    rating: 4.8,
    img: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "New",
    amenities: ["WiFi", "Pool", "Breakfast"],
  },
  {
    name: "Le Sirenuse",
    location: "Positano, Italy",
    cat: "Boutique",
    price: 850,
    rating: 4.9,
    img: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Iconic",
    amenities: ["WiFi", "Pool", "Restaurant"],
  },
  {
    name: "Singita Grumeti",
    location: "Serengeti, Tanzania",
    cat: "Luxury",
    price: 1200,
    rating: 4.9,
    img: "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Exclusive",
    amenities: ["WiFi", "Safari", "Spa"],
  },
  {
    name: "Aman Tokyo",
    location: "Tokyo, Japan",
    cat: "Luxury",
    price: 1100,
    rating: 4.8,
    img: "https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Award Winner",
    amenities: ["WiFi", "Spa", "Restaurant"],
  },
  {
    name: "Four Seasons Bora Bora",
    location: "Bora Bora, F. Polynesia",
    cat: "Resort",
    price: 2200,
    rating: 5.0,
    img: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Paradise",
    amenities: ["WiFi", "Overwater", "Spa"],
  },
];

const HOTEL_CATS: HotelCategory[] = [
  "All",
  "Boutique",
  "Villa",
  "Resort",
  "Luxury",
];

//     Amenity icon map                                                          

function AmenityIcon({ name }: { name: string }) {
  const iconProps = { size: 11 };
  switch (name) {
    case "WiFi":
      return <Wifi {...iconProps} />;
    case "Pool":
      return <Waves {...iconProps} />;
    case "Spa":
      return <Dumbbell {...iconProps} />;
    case "Restaurant":
      return <Utensils {...iconProps} />;
    case "Breakfast":
      return <Coffee {...iconProps} />;
    case "Safari":
      return <Binoculars {...iconProps} />;
    case "Overwater":
      return <Waves {...iconProps} />;
    default:
      return <Wifi {...iconProps} />;
  }
}

//     Stars renderer                                                            

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < full || (i === full && hasHalf) ? "var(--gold)" : "transparent"}
          style={{
            color: i < full || (i === full && hasHalf) ? "var(--gold)" : "rgba(255,255,255,0.20)",
          }}
        />
      ))}
    </div>
  );
}

//     Card                                                                      

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, boxShadow: "var(--sh-xl)" }}
      whileTap={{ scale: 0.985 }}
      className="glass-card"
      style={{
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
      aria-label={`${hotel.name} in ${hotel.location}`}
    >
      {/*    Image    */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/3", flexShrink: 0 }}
      >
        <Image
          src={hotel.img}
          alt={`${hotel.name}   ${hotel.location}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          style={{ transition: "transform 0.5s ease" }}
        />

        {/* Hover scale via parent group */}
        <motion.div
          className="absolute inset-0"
          whileHover={{}}
          style={{
            background:
              "linear-gradient(to top, rgba(5,15,28,0.60) 0%, transparent 60%)",
          }}
        />

        {/* Tag badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "4px 10px",
              borderRadius: "99px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontFamily: "var(--font-head)",
            }}
          >
            {hotel.tag}
          </span>
        </div>
      </div>

      {/*    Body    */}
      <div
        style={{
          padding: "1.1rem 1.25rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
        }}
      >
        {/* Name */}
        <h3
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "var(--font-head)",
            lineHeight: 1.2,
          }}
        >
          {hotel.name}
        </h3>

        {/* Location */}
        <div
          className="flex items-center gap-1"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          <MapPin size={12} />
          <span
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-body)",
              lineHeight: 1,
            }}
          >
            {hotel.location}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={hotel.rating} />
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--gold)",
              fontFamily: "var(--font-head)",
            }}
          >
            {hotel.rating.toFixed(1)}
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "var(--font-body)",
            }}
          >
            ({hotel.cat})
          </span>
        </div>

        {/* Amenity chips */}
        <div className="flex flex-wrap gap-1.5">
          {hotel.amenities.map((amenity) => (
            <span
              key={amenity}
              className="glass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 9px",
                borderRadius: "99px",
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.65)",
                fontFamily: "var(--font-body)",
              }}
            >
              <AmenityIcon name={amenity} />
              {amenity}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: "auto", paddingTop: "10px" }}
        >
          <div>
            <span
              style={{
                display: "block",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                fontFamily: "var(--font-head)",
                marginBottom: "2px",
              }}
            >
              from
            </span>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#fff",
                fontFamily: "var(--font-head)",
                lineHeight: 1,
              }}
            >
              ${hotel.price.toLocaleString()}
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.40)",
                  marginLeft: "3px",
                }}
              >
                /night
              </span>
            </span>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ height: "38px", padding: "0 18px", fontSize: "12px" }}
            aria-label={`Book ${hotel.name}`}
          >
            Book Now <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

//     Section                                                                   

export function HotelsSection() {
  const [activeCategory, setActiveCategory] = useState<HotelCategory>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? HOTELS
      : HOTELS.filter((h) => h.cat === activeCategory);

  // GSAP scroll-triggered stagger on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll("article");
      if (!cards || cards.length === 0) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hotels"
      ref={sectionRef}
      style={{
        background: "var(--surface-0)",
        padding: "var(--sec) 0",
      }}
    >
      <div style={{ width: "var(--wrap)", margin: "0 auto" }}>

        {/*    Section header    */}
        <div
          className="flex items-end justify-between"
          style={{ marginBottom: "2.5rem", gap: "1.5rem", flexWrap: "wrap" }}
        >
          <div>
            <p
              className="text-label"
              style={{ color: "var(--accent)", marginBottom: "10px" }}
            >
              Handpicked Stays
            </p>
            <h2
              className="text-section"
              style={{ color: "#fff", marginBottom: "8px" }}
            >
              Where to stay
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-inv2)",
                fontFamily: "var(--font-body)",
                maxWidth: "460px",
                lineHeight: 1.6,
              }}
            >
              From secluded safari lodges to iconic cliff-side boutiques   every
              property is vetted for character, comfort, and craft.
            </p>
          </div>

          <a
            href="/hotels"
            className="btn-secondary"
            style={{ height: "42px", padding: "0 20px", fontSize: "13px", flexShrink: 0 }}
            aria-label="View all hotels"
          >
            View All <ArrowRight size={14} />
          </a>
        </div>

        {/*    Category filter    */}
        <div
          className="relative flex items-center gap-2"
          style={{ marginBottom: "2rem", flexWrap: "wrap" }}
          role="tablist"
          aria-label="Filter hotels by category"
        >
          {HOTEL_CATS.map((cat) => (
            <motion.button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="glass"
              style={{
                position: "relative",
                padding: "7px 16px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "var(--font-head)",
                letterSpacing: "0.03em",
                cursor: "pointer",
                border: "none",
                color:
                  activeCategory === cat ? "#fff" : "rgba(255,255,255,0.55)",
                background:
                  activeCategory === cat
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.06)",
                boxShadow:
                  activeCategory === cat
                    ? "0 4px 16px rgba(30,142,232,0.40)"
                    : "none",
                transition: "background 0.25s, color 0.25s, box-shadow 0.25s",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/*    Card grid    */}
        <div ref={gridRef}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "grid gap-5",
                "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              )}
            >
              {filtered.map((hotel) => (
                <HotelCard key={hotel.name} hotel={hotel} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
