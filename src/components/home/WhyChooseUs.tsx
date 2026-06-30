"use client";

import { motion } from "framer-motion";
import { Route, Globe2, Calendar, Headphones } from "lucide-react";

const features = [
  {
    icon: Route,
    title: "Smart Route Planning",
    description: "AI-powered routes with real-time traffic, multiple alternatives, and accurate cost estimates.",
    color: "bg-[#DBEAFE] text-[#1D4ED8]",
    delay: 0,
  },
  {
    icon: Globe2,
    title: "Global Coverage",
    description: "Thousands of destinations across 190+ countries, carefully curated just for you.",
    color: "bg-[#D1FAE5] text-[#065F46]",
    delay: 0.08,
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book flights, hotels, and experiences in a few taps. Instant confirmation.",
    color: "bg-[#FEF3C7] text-[#92400E]",
    delay: 0.16,
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help whenever you need it, wherever you are.",
    color: "bg-[#F3E8FF] text-[#6B21A8]",
    delay: 0.24,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-medium text-[#60A5FA] mb-2 uppercase tracking-wide">
            Why Travix
          </p>
          <h2
            id="why-heading"
            className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#111827] mb-4"
          >
            Why Choose Travix?
          </h2>
          <p className="text-[#6B7280] text-lg">
            Everything you need for the perfect trip, in one beautifully designed place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description, color, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay }}
              className="group p-6 rounded-2xl border border-[#E5E7EB] bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}
                aria-hidden="true"
              >
                <Icon size={20} />
              </div>
              <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
