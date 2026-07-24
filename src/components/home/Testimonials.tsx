"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  country: string;
  trip: string;
  initials: string;
  text: string;
  rating: number;
  bgColor: string;
  textColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    country: "Singapore",
    trip: "Bali & Lombok",
    initials: "SC",
    text: "NOVA made planning our honeymoon so effortless. The AI suggested incredible hidden gems we never would have found on our own.",
    rating: 5,
    bgColor: "#1A2535",
    textColor: "#7AC8FF",
  },
  {
    name: "Marco Rossi",
    country: "Italy",
    trip: "Paris to Amsterdam",
    initials: "MR",
    text: "I travel for work constantly and NOVA has become indispensable. The multi-transport planner saves me hours every week.",
    rating: 5,
    bgColor: "#1C2B1C",
    textColor: "#5CC87A",
  },
  {
    name: "Amara Osei",
    country: "Ghana",
    trip: "Cape Town Safari",
    initials: "AO",
    text: "As a solo traveler, safety and reliability matter most. NOVA delivers on both. The destination guides are incredibly detailed.",
    rating: 5,
    bgColor: "#2B1C1C",
    textColor: "#E87A7A",
  },
  {
    name: "Priya Sharma",
    country: "India",
    trip: "Tokyo and Osaka",
    initials: "PS",
    text: "The flight and hotel booking in one place is a game changer. Found deals I could not find anywhere else.",
    rating: 5,
    bgColor: "#1E1C2B",
    textColor: "#A07AE8",
  },
  {
    name: "James Liu",
    country: "Canada",
    trip: "Iceland Ring Road",
    initials: "JL",
    text: "The itinerary builder is next level. Drag and drop days, swap hotels, reroute   all instantly. Nothing else comes close.",
    rating: 5,
    bgColor: "#1C2526",
    textColor: "#7AD4E8",
  },
  {
    name: "Sofia Andersen",
    country: "Denmark",
    trip: "Maldives Retreat",
    initials: "SA",
    text: "Booked our entire anniversary trip in under 20 minutes. The recommendation engine knew exactly what we were looking for.",
    rating: 5,
    bgColor: "#252018",
    textColor: "#E8C47A",
  },
];

/* Double the array once for seamless infinite scroll */
const row1 = [...testimonials, ...testimonials];
const row2 = [...testimonials, ...testimonials];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div
      className="glass-card"
      style={{
        flexShrink: 0,
        width: "360px",
        borderRadius: "var(--r-lg)",
        padding: "1.5rem",
        marginRight: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "var(--surface-3)",
        boxShadow: "var(--sh-md)",
      }}
    >
      {/* quote icon */}
      <Quote
        size={20}
        style={{
          color: "var(--accent)",
          marginBottom: "0.75rem",
          flexShrink: 0,
        }}
      />

      {/* review text */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          lineHeight: 1.75,
          color: "var(--text-inv2)",
          fontStyle: "italic",
          marginBottom: "1rem",
          flex: 1,
        }}
      >
        &ldquo;{item.text}&rdquo;
      </p>

      {/* star rating */}
      <div
        style={{
          display: "flex",
          gap: "3px",
          marginBottom: "1rem",
        }}
      >
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star
            key={i}
            size={13}
            style={{
              color: "var(--gold)",
              fill: "var(--gold)",
            }}
          />
        ))}
      </div>

      {/* divider + author */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        {/* avatar */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: item.bgColor,
            color: item.textColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            fontFamily: "var(--font-head)",
            flexShrink: 0,
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          {item.initials}
        </div>

        {/* name + meta */}
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "14px",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.name}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.40)",
              lineHeight: 1.4,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.country}
            <span style={{ margin: "0 4px", opacity: 0.5 }}> </span>
            {item.trip}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="reviews"
      style={{
        background: "var(--surface-0)",
        padding: "var(--sec) 0",
        overflow: "hidden",
      }}
      aria-labelledby="reviews-heading"
    >
      {/*    Section header    */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: "var(--wrap)",
          margin: "0 auto",
          padding: "0 1.5rem",
          marginBottom: "3.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "0.75rem",
          }}
        >
          What Travelers Say
        </p>

        <h2
          id="reviews-heading"
          className="text-section"
          style={{
            color: "#fff",
            fontFamily: "var(--font-head)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "0.75rem",
          }}
        >
          Real journeys, real stories.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            lineHeight: 1.65,
            color: "var(--text-inv2)",
            maxWidth: "44ch",
            margin: "0 auto",
          }}
        >
          Over 50,000 travelers trust NOVA to plan their perfect trip.
        </p>
      </motion.div>

      {/*    Marquee rows    */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "1rem 0" }}>

        {/* Row 1   left to right */}
        <div style={{ overflow: "hidden", width: "100%" }}>
          <div
            className="animate-marquee"
            style={{
              display: "flex",
              width: "max-content",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
            }}
          >
            {row1.map((item, i) => (
              <TestimonialCard key={`row1-${item.name}-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2   right to left (reverse) */}
        <div style={{ overflow: "hidden", width: "100%" }}>
          <div
            className="animate-marquee"
            style={{
              display: "flex",
              width: "max-content",
              animationDirection: "reverse",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
            }}
          >
            {row2.map((item, i) => (
              <TestimonialCard key={`row2-${item.name}-${i}`} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
