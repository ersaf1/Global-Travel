"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plane, Calendar } from "lucide-react";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

interface Flight {
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  airline: string;
  duration: string;
  price: number;
  date: string;
  stops: string;
  img: string;
}

const FLIGHTS: Flight[] = [
  {
    from: "JKT",
    to: "NRT",
    fromCity: "Jakarta",
    toCity: "Tokyo",
    airline: "Garuda Indonesia",
    duration: "7h 20m",
    price: 480,
    date: "Aug 12",
    stops: "Direct",
    img: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    from: "CGK",
    to: "CDG",
    fromCity: "Jakarta",
    toCity: "Paris",
    airline: "Air France",
    duration: "16h 40m",
    price: 890,
    date: "Aug 15",
    stops: "1 stop",
    img: "https://images.pexels.com/photos/1634278/pexels-photo-1634278.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    from: "DPS",
    to: "SYD",
    fromCity: "Bali",
    toCity: "Sydney",
    airline: "Qantas",
    duration: "5h 10m",
    price: 320,
    date: "Aug 18",
    stops: "Direct",
    img: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    from: "SIN",
    to: "LHR",
    fromCity: "Singapore",
    toCity: "London",
    airline: "Singapore Airlines",
    duration: "13h 20m",
    price: 750,
    date: "Aug 22",
    stops: "Direct",
    img: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    from: "BKK",
    to: "FCO",
    fromCity: "Bangkok",
    toCity: "Rome",
    airline: "Thai Airways",
    duration: "12h 05m",
    price: 620,
    date: "Aug 25",
    stops: "1 stop",
    img: "https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    from: "KUL",
    to: "DXB",
    fromCity: "Kuala Lumpur",
    toCity: "Dubai",
    airline: "Malaysia Airlines",
    duration: "7h 45m",
    price: 390,
    date: "Sep 01",
    stops: "Direct",
    img: "https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export function FlightsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;
    const ctx = gsap.context(() => {
      const cards = cardsRef.current!.querySelectorAll<HTMLElement>("[data-flight-card]");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <section
      id="flights"
      ref={sectionRef}
      style={{
        background: "var(--surface-2)",
        padding: "var(--sec) 0",
        overflow: "hidden",
      }}
    >
      {/*    Header    */}
      <div
        style={{
          maxWidth: "var(--wrap)",
          margin: "0 auto",
          padding: "0 1.5rem",
          marginBottom: "2.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* left text */}
          <div>
            <p
              className="text-label"
              style={{
                color: "var(--accent)",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-head)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Flight Deals
            </p>
            <h2
              className="text-section"
              style={{
                color: "#fff",
                fontFamily: "var(--font-head)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: "0.5rem",
              }}
            >
              Fly anywhere, from anywhere
            </h2>
            <p
              style={{
                color: "var(--text-inv2)",
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                lineHeight: 1.6,
              }}
            >
              Curated flight deals updated daily
            </p>
          </div>

          {/* right arrow controls */}
          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll flights left"
              className="glass"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.12)",
                transition: "background 0.2s, border-color 0.2s",
                background: "rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.28)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.12)";
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll flights right"
              className="glass"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.12)",
                transition: "background 0.2s, border-color 0.2s",
                background: "rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.28)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.12)";
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/*    Horizontal scroll track    */}
      <div
        style={{
          maxWidth: "var(--wrap)",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            paddingBottom: "8px",
            WebkitOverflowScrolling: "touch",
          }}
          /* hide webkit scrollbar via inline workaround   full rule in globals */
          className="flights-scroll-track"
        >
          <div
            ref={cardsRef}
            style={{ display: "contents" }}
          >
            {FLIGHTS.map((flight) => (
              <FlightCard key={`${flight.from}-${flight.to}-${flight.date}`} flight={flight} />
            ))}
          </div>
        </div>
      </div>

      {/* hide scrollbar for webkit   injected inline to avoid extra CSS file */}
      <style>{`
        .flights-scroll-track::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

/*    Individual card    */
function FlightCard({ flight }: { flight: Flight }) {
  const isDirect = flight.stops === "Direct";

  return (
    <motion.article
      data-flight-card
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      style={{
        scrollSnapAlign: "start",
        flexShrink: 0,
        width: "clamp(300px, 80vw, 380px)",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        position: "relative",
        background: "var(--surface-3)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "var(--sh-md)",
        transition: "box-shadow 0.35s ease",
        cursor: "default",
      }}
      onHoverStart={(e) => {
        (e.target as HTMLElement).closest("article")!.style.boxShadow =
          "var(--sh-xl)";
      }}
      onHoverEnd={(e) => {
        (e.target as HTMLElement).closest("article")!.style.boxShadow =
          "var(--sh-md)";
      }}
    >
      {/*    Image    */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src={flight.img}
            alt={`${flight.fromCity} to ${flight.toCity}`}
            fill
            sizes="(max-width: 768px) 80vw, 380px"
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        {/* gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 40%, var(--surface-3) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* stops badge */}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "99px",
            background: "rgba(5,15,28,0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.14)",
            fontSize: "10px",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "var(--font-head)",
            letterSpacing: "0.05em",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: isDirect ? "#22c55e" : "#f97316",
              flexShrink: 0,
              boxShadow: isDirect
                ? "0 0 6px rgba(34,197,94,0.7)"
                : "0 0 6px rgba(249,115,22,0.7)",
            }}
          />
          {flight.stops}
        </div>
      </div>

      {/*    Content    */}
      <div style={{ padding: "1.25rem" }}>
        {/* airline */}
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)",
            fontFamily: "var(--font-head)",
            marginBottom: "0.85rem",
          }}
        >
          {flight.airline}
        </p>

        {/* route row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
            gap: "0.5rem",
          }}
        >
          {/* FROM */}
          <div style={{ textAlign: "left" }}>
            <p
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                fontFamily: "var(--font-head)",
                lineHeight: 1,
                marginBottom: "3px",
                letterSpacing: "-0.02em",
              }}
            >
              {flight.from}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "var(--font-body)",
              }}
            >
              {flight.fromCity}
            </p>
          </div>

          {/* center   plane + dashes + duration */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: "4px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  borderTop: "1px dashed rgba(255,255,255,0.20)",
                }}
              />
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: "var(--accent)", flexShrink: 0 }}
              >
                <Plane size={16} />
              </motion.div>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  borderTop: "1px dashed rgba(255,255,255,0.20)",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.38)",
                fontFamily: "var(--font-body)",
                whiteSpace: "nowrap",
              }}
            >
              {flight.duration}
            </p>
          </div>

          {/* TO */}
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                fontFamily: "var(--font-head)",
                lineHeight: 1,
                marginBottom: "3px",
                letterSpacing: "-0.02em",
              }}
            >
              {flight.to}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "var(--font-body)",
              }}
            >
              {flight.toCity}
            </p>
          </div>
        </div>

        {/* date pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "99px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.09)",
            fontSize: "11px",
            color: "rgba(255,255,255,0.55)",
            fontFamily: "var(--font-body)",
            marginBottom: "1rem",
          }}
        >
          <Calendar size={11} style={{ color: "var(--accent)" }} />
          {flight.date}
        </div>

        {/* bottom row   price + button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.85rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.30)",
                fontFamily: "var(--font-body)",
                display: "block",
                marginBottom: "1px",
              }}
            >
              from
            </span>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#fff",
                fontFamily: "var(--font-head)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              ${flight.price}
            </span>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{
              height: "36px",
              padding: "0 1rem",
              fontSize: "12px",
            }}
          >
            Select
          </button>
        </div>
      </div>
    </motion.article>
  );
}
