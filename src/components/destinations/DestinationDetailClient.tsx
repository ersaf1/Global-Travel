"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Star, Clock, DollarSign, Camera, Hotel, Utensils, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/utils/format";

interface Props {
  slug: string;
}

// Mock data per slug — replace with real DB call
const mockData: Record<string, {
  name: string; country: string; city: string; rating: number; reviewCount: number;
  priceFrom: number; currency: string; description: string; images: string[];
  weather: string; category: string;
}> = {
  "bali": {
    name: "Bali", country: "Indonesia", city: "Denpasar", rating: 4.8, reviewCount: 2340,
    priceFrom: 899, currency: "USD", category: "Beach",
    description: "Bali, the Island of the Gods, is a province of Indonesia and also the name of the main island. Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs, Bali attracts millions of travelers every year.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800",
    ],
    weather: "28°C · Partly Cloudy",
  },
  "kyoto": {
    name: "Kyoto", country: "Japan", city: "Kyoto", rating: 4.9, reviewCount: 3120,
    priceFrom: 1299, currency: "USD", category: "Cultural",
    description: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
    ],
    weather: "18°C · Clear",
  },
};

const tabs = ["Overview", "Gallery", "Hotels", "Restaurants", "Attractions", "Reviews"];

export function DestinationDetailClient({ slug }: Props) {
  const [activeTab, setActiveTab] = useState("Overview");
  const dest = mockData[slug] ?? mockData["bali"];

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      {/* Hero image */}
      <div className="relative h-80 sm:h-96 lg:h-[480px] overflow-hidden">
        <Image
          src={dest.images[0]}
          alt={dest.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={14} aria-hidden="true" /> Back to Destinations
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Badge variant="blue" className="mb-2">{dest.category}</Badge>
                <h1 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white">
                  {dest.name}
                </h1>
                <div className="flex items-center gap-2 mt-1 text-white/80 text-sm">
                  <MapPin size={14} aria-hidden="true" />
                  {dest.city}, {dest.country}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StarRating rating={dest.rating} showValue count={dest.reviewCount} />
                <p className="text-white text-sm">
                  From <span className="font-semibold text-lg">{formatPrice(dest.priceFrom, dest.currency)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div
          className="flex gap-1 overflow-x-auto pb-1 mb-8 bg-white rounded-2xl border border-[#E5E7EB] p-1.5 shadow-sm"
          role="tablist"
          aria-label="Destination sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#111827] text-white shadow-sm"
                  : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "Overview" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Card padding="lg">
                  <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] mb-3">About {dest.name}</h2>
                  <p className="text-[#374151] leading-relaxed">{dest.description}</p>
                </Card>

                {/* Quick info grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {[
                    { icon: <Clock size={16} />, label: "Best time", value: "Apr–Oct", color: "text-[#60A5FA]" },
                    { icon: <DollarSign size={16} />, label: "Budget", value: "Mid–High", color: "text-[#6EE7B7]" },
                    { icon: <Star size={16} />, label: "Rating", value: `${dest.rating}/5`, color: "text-[#FBBF24]" },
                    { icon: <Zap size={16} />, label: "Weather", value: dest.weather, color: "text-[#FDBA74]" },
                  ].map(({ icon, label, value, color }) => (
                    <Card key={label} padding="md" className="text-center">
                      <div className={`flex justify-center mb-1 ${color}`} aria-hidden="true">{icon}</div>
                      <p className="text-xs text-[#9CA3AF] mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-[#111827]">{value}</p>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "Gallery" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Card padding="lg">
                  <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] mb-4 flex items-center gap-2">
                    <Camera size={18} aria-hidden="true" /> Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {dest.images.map((src, i) => (
                      <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 ? "col-span-2 h-56" : "h-36"}`}>
                        <Image src={src} alt={`${dest.name} photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {(activeTab === "Hotels" || activeTab === "Restaurants" || activeTab === "Attractions" || activeTab === "Reviews") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Card padding="lg">
                  <div className="text-center py-10">
                    <div className="w-14 h-14 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-3">
                      {activeTab === "Hotels" && <Hotel size={22} className="text-[#9CA3AF]" />}
                      {activeTab === "Restaurants" && <Utensils size={22} className="text-[#9CA3AF]" />}
                      {activeTab === "Attractions" && <Zap size={22} className="text-[#9CA3AF]" />}
                      {activeTab === "Reviews" && <Star size={22} className="text-[#9CA3AF]" />}
                    </div>
                    <p className="text-sm font-medium text-[#374151]">{activeTab} coming soon</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">Connect the database to see {activeTab.toLowerCase()}</p>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card padding="lg">
              <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] mb-4">Book This Trip</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">From price</span>
                  <span className="font-semibold text-[#111827]">{formatPrice(dest.priceFrom, dest.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Rating</span>
                  <span className="font-semibold text-[#111827]">{dest.rating} / 5</span>
                </div>
              </div>
              <Button fullWidth onClick={() => { window.location.href = `/booking?destination=${slug}`; }}>
                Book Now
              </Button>
              <Button fullWidth variant="outline" className="mt-2" onClick={() => { window.location.href = `/planner?to=${dest.city}`; }}>
                Plan Route
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
