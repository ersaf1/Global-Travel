"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import type { Destination } from "@/types";

// Static mock data — replace with server-fetched data in production
const mockDestinations: Destination[] = [
  {
    id: "1", name: "Bali", slug: "bali", description: "Island of the Gods",
    countryId: "id", cityId: "c1", images: [], coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
    rating: 4.8, reviewCount: 2340, priceFrom: 899, currency: "USD",
    featured: true, trending: false,
    country: { id: "id", name: "Indonesia", code: "ID" },
    city: { id: "c1", name: "Denpasar", countryId: "id" },
  },
  {
    id: "2", name: "Kyoto", slug: "kyoto", description: "Ancient capital of Japan",
    countryId: "jp", cityId: "c2", images: [], coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
    rating: 4.9, reviewCount: 3120, priceFrom: 1299, currency: "USD",
    featured: false, trending: true,
    country: { id: "jp", name: "Japan", code: "JP" },
    city: { id: "c2", name: "Kyoto", countryId: "jp" },
  },
  {
    id: "3", name: "Santorini", slug: "santorini", description: "Volcanic Greek island",
    countryId: "gr", cityId: "c3", images: [], coverImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600",
    rating: 4.7, reviewCount: 1890, priceFrom: 1499, currency: "USD",
    featured: false, trending: true,
    country: { id: "gr", name: "Greece", code: "GR" },
    city: { id: "c3", name: "Thira", countryId: "gr" },
  },
  {
    id: "4", name: "Paris", slug: "paris", description: "The City of Light",
    countryId: "fr", cityId: "c4", images: [], coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
    rating: 4.6, reviewCount: 5200, priceFrom: 1099, currency: "USD",
    featured: true, trending: false,
    country: { id: "fr", name: "France", code: "FR" },
    city: { id: "c4", name: "Paris", countryId: "fr" },
  },
  {
    id: "5", name: "Machu Picchu", slug: "machu-picchu", description: "Incan citadel in the Andes",
    countryId: "pe", cityId: "c5", images: [], coverImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600",
    rating: 4.9, reviewCount: 1650, priceFrom: 1699, currency: "USD",
    featured: false, trending: true,
    country: { id: "pe", name: "Peru", code: "PE" },
    city: { id: "c5", name: "Aguas Calientes", countryId: "pe" },
  },
  {
    id: "6", name: "Maldives", slug: "maldives", description: "Tropical paradise in the Indian Ocean",
    countryId: "mv", cityId: "c6", images: [], coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
    rating: 4.8, reviewCount: 2100, priceFrom: 2499, currency: "USD",
    featured: true, trending: false,
    country: { id: "mv", name: "Maldives", code: "MV" },
    city: { id: "c6", name: "Malé", countryId: "mv" },
  },
];

export function PopularDestinations() {
  return (
    <section className="py-20 bg-[#F6F7F9]" aria-labelledby="popular-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm font-medium text-[#60A5FA] mb-2 uppercase tracking-wide">
              Explore
            </p>
            <h2
              id="popular-heading"
              className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#111827]"
            >
              Popular Destinations
            </h2>
            <p className="text-[#6B7280] mt-2 max-w-md">
              Handpicked places loved by travelers around the world
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#111827] hover:text-[#60A5FA] transition-colors group"
            >
              View All
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDestinations.map((dest, i) => (
            <DestinationCard key={dest.id} destination={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
