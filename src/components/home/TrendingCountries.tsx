"use client";

import { motion } from "framer-motion";

const countries = [
  { name: "Japan", code: "JP", flag: "🇯🇵", destinations: 124, color: "from-red-50 to-red-100" },
  { name: "France", code: "FR", flag: "🇫🇷", destinations: 98, color: "from-blue-50 to-blue-100" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩", destinations: 156, color: "from-red-50 to-orange-100" },
  { name: "Italy", code: "IT", flag: "🇮🇹", destinations: 112, color: "from-green-50 to-emerald-100" },
  { name: "Thailand", code: "TH", flag: "🇹🇭", destinations: 89, color: "from-yellow-50 to-amber-100" },
  { name: "Australia", code: "AU", flag: "🇦🇺", destinations: 78, color: "from-sky-50 to-sky-100" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", destinations: 67, color: "from-green-50 to-yellow-100" },
  { name: "Morocco", code: "MA", flag: "🇲🇦", destinations: 45, color: "from-orange-50 to-amber-100" },
];

export function TrendingCountries() {
  return (
    <section className="py-20 bg-white" aria-labelledby="trending-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <p className="text-sm font-medium text-[#60A5FA] mb-2 uppercase tracking-wide">
            Trending
          </p>
          <h2
            id="trending-heading"
            className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#111827] mb-2"
          >
            Trending Countries
          </h2>
          <p className="text-[#6B7280]">The hottest travel spots right now</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {countries.map(({ name, flag, destinations, color }, i) => (
            <motion.a
              key={name}
              href={`/destinations?country=${name}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4, scale: 1.03 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className={`bg-gradient-to-b ${color} rounded-2xl p-4 text-center border border-[#E5E7EB] cursor-pointer group`}
              aria-label={`${name}: ${destinations} destinations`}
            >
              <div className="text-3xl mb-2" aria-hidden="true">{flag}</div>
              <p className="text-xs font-semibold text-[#111827] mb-0.5">{name}</p>
              <p className="text-xs text-[#9CA3AF]">{destinations} places</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
