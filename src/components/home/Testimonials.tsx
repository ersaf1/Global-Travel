"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    country: "Singapore",
    avatar: "SC",
    rating: 5,
    text: "Travix made planning our honeymoon so effortless. The route planner suggested incredible hidden gems we never would have found on our own.",
    trip: "Singapore → Bali → Lombok",
  },
  {
    name: "Marco Rossi",
    country: "Italy",
    avatar: "MR",
    rating: 5,
    text: "I travel for work constantly and Travix has become indispensable. The multi-transport route planner saves me hours every week.",
    trip: "Milan → Paris → Amsterdam",
  },
  {
    name: "Amara Osei",
    country: "Ghana",
    avatar: "AO",
    rating: 5,
    text: "As a solo traveler, safety and reliability matter most. Travix delivers on both. The destination guides are incredibly detailed.",
    trip: "Accra → Cape Town → Nairobi",
  },
  {
    name: "Priya Sharma",
    country: "India",
    avatar: "PS",
    rating: 5,
    text: "The flight search + hotel booking in one place is a game changer. Found deals I couldn't find anywhere else.",
    trip: "Mumbai → Tokyo → Osaka",
  },
];

function AvatarFallback({ initials, colorIndex }: { initials: string; colorIndex: number }) {
  const colors = [
    "bg-[#DBEAFE] text-[#1D4ED8]",
    "bg-[#D1FAE5] text-[#065F46]",
    "bg-[#FEF3C7] text-[#92400E]",
    "bg-[#F3E8FF] text-[#6B21A8]",
  ];
  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${colors[colorIndex % colors.length]}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 bg-[#F6F7F9]" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-sm font-medium text-[#60A5FA] mb-2 uppercase tracking-wide">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#111827] mb-4"
          >
            What Travelers Say
          </h2>
          <p className="text-[#6B7280] text-lg">Real stories from real explorers</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map(({ name, country, avatar, rating, text, trip }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col gap-4"
            >
              <Quote size={20} className="text-[#E5E7EB]" aria-hidden="true" />

              <p className="text-sm text-[#374151] leading-relaxed flex-1">{text}</p>

              <div className="text-xs text-[#60A5FA] font-medium">{trip}</div>

              <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} size={12} className="text-[#FBBF24] fill-[#FBBF24]" aria-hidden="true" />
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#F3F4F6]">
                <AvatarFallback initials={avatar} colorIndex={i} />
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{name}</p>
                  <p className="text-xs text-[#9CA3AF]">{country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
