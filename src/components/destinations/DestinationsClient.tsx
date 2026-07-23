"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { DestinationCard } from "./DestinationCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Destination } from "@/types";

// Mock data
const mockDestinations: Destination[] = [
  { id: "1", name: "Bali", slug: "bali", countryId: "id", cityId: "c1", images: [], coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=3840&q=95", rating: 4.8, reviewCount: 2340, priceFrom: 899, currency: "USD", featured: true, trending: false, country: { id: "id", name: "Indonesia", code: "ID" }, city: { id: "c1", name: "Denpasar", countryId: "id" } },
  { id: "2", name: "Kyoto", slug: "kyoto", countryId: "jp", cityId: "c2", images: [], coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=3840&q=95", rating: 4.9, reviewCount: 3120, priceFrom: 1299, currency: "USD", featured: false, trending: true, country: { id: "jp", name: "Japan", code: "JP" }, city: { id: "c2", name: "Kyoto", countryId: "jp" } },
  { id: "3", name: "Santorini", slug: "santorini", countryId: "gr", cityId: "c3", images: [], coverImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=3840&q=95", rating: 4.7, reviewCount: 1890, priceFrom: 1499, currency: "USD", featured: false, trending: true, country: { id: "gr", name: "Greece", code: "GR" }, city: { id: "c3", name: "Thira", countryId: "gr" } },
  { id: "4", name: "Paris", slug: "paris", countryId: "fr", cityId: "c4", images: [], coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=3840&q=95", rating: 4.6, reviewCount: 5200, priceFrom: 1099, currency: "USD", featured: true, trending: false, country: { id: "fr", name: "France", code: "FR" }, city: { id: "c4", name: "Paris", countryId: "fr" } },
  { id: "5", name: "Machu Picchu", slug: "machu-picchu", countryId: "pe", cityId: "c5", images: [], coverImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=3840&q=95", rating: 4.9, reviewCount: 1650, priceFrom: 1699, currency: "USD", featured: false, trending: true, country: { id: "pe", name: "Peru", code: "PE" }, city: { id: "c5", name: "Aguas Calientes", countryId: "pe" } },
  { id: "6", name: "Maldives", slug: "maldives", countryId: "mv", cityId: "c6", images: [], coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=3840&q=95", rating: 4.8, reviewCount: 2100, priceFrom: 2499, currency: "USD", featured: true, trending: false, country: { id: "mv", name: "Maldives", code: "MV" }, city: { id: "c6", name: "Malé", countryId: "mv" } },
  { id: "7", name: "New York", slug: "new-york", countryId: "us", cityId: "c7", images: [], coverImage: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=3840&q=95", rating: 4.5, reviewCount: 6800, priceFrom: 799, currency: "USD", featured: false, trending: false, country: { id: "us", name: "United States", code: "US" }, city: { id: "c7", name: "New York", countryId: "us" } },
  { id: "8", name: "Cappadocia", slug: "cappadocia", countryId: "tr", cityId: "c8", images: [], coverImage: "https://images.unsplash.com/photo-1585516030087-4d9d4a4cc18e?w=3840&q=95", rating: 4.8, reviewCount: 1420, priceFrom: 699, currency: "USD", featured: false, trending: true, country: { id: "tr", name: "Turkey", code: "TR" }, city: { id: "c8", name: "Göreme", countryId: "tr" } },
  { id: "9", name: "Bangkok", slug: "bangkok", countryId: "th", cityId: "c9", images: [], coverImage: "https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?w=3840&q=95", rating: 4.4, reviewCount: 4500, priceFrom: 599, currency: "USD", featured: false, trending: false, country: { id: "th", name: "Thailand", code: "TH" }, city: { id: "c9", name: "Bangkok", countryId: "th" } },
];

const categories = ["All", "Beach", "Mountain", "City", "Cultural", "Adventure", "Nature"];

export function DestinationsClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockDestinations.filter((d) => {
    const matchSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country?.name.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="text-sm font-medium text-[#60A5FA] uppercase tracking-wide mb-1">Explore</p>
            <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[#111827]">
              Destinations
            </h1>
            <p className="text-[#6B7280] mt-1">
              Discover breathtaking places from around the world
            </p>
          </motion.div>

          {/* Search + filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <div className="flex-1">
              <Input
                placeholder="Search destinations, countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search size={15} />}
                aria-label="Search destinations"
              />
            </div>
            <Button
              variant="outline"
              icon={<SlidersHorizontal size={16} />}
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
            >
              Filters
            </Button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide" role="tablist" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#111827] text-white"
                    : "bg-[#F3F4F6] text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#6B7280]">
            <span className="font-semibold text-[#111827]">{filtered.length}</span> destinations found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#374151] font-medium">No destinations found</p>
            <p className="text-sm text-[#9CA3AF] mt-1">Try a different search term</p>
            <Button variant="ghost" className="mt-4" onClick={() => setSearch("")} icon={<X size={14} />}>
              Clear search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
