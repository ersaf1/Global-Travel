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

// Mock data per slug   replace with real DB call
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
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=3840&q=95",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=3840&q=95",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?w=3840&q=95",
    ],
    weather: "28 C   Partly Cloudy",
  },
  "kyoto": {
    name: "Kyoto", country: "Japan", city: "Kyoto", rating: 4.9, reviewCount: 3120,
    priceFrom: 1299, currency: "USD", category: "Cultural",
    description: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=3840&q=95",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=3840&q=95",
    ],
    weather: "18 C   Clear",
  },
  "santorini": {
    name: "Santorini", country: "Greece", city: "Fira", rating: 4.9, reviewCount: 4210,
    priceFrom: 1199, currency: "USD", category: "Island",
    description: "Santorini is a volcanic island in the Cyclades group of the Greek islands. It is famous for its dramatic views, stunning sunsets, white-washed houses with blue domes, and its unique geology from a volcanic caldera.",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=3840&q=95",
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=3840&q=95",
    ],
    weather: "25 C   Sunny",
  },
  "machu-picchu": {
    name: "Machu Picchu", country: "Peru", city: "Aguas Calientes", rating: 4.9, reviewCount: 5670,
    priceFrom: 750, currency: "USD", category: "Adventure",
    description: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it's renowned for its sophisticated dry-stone walls and panoramic views.",
    images: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=3840&q=95",
      "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=3840&q=95",
    ],
    weather: "17 C   Misty",
  },
  "maldives": {
    name: "Maldives", country: "Maldives", city: "Mal ", rating: 4.9, reviewCount: 3890,
    priceFrom: 1299, currency: "USD", category: "Island",
    description: "The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, made up of more than 1,000 coral islands. It's known for its crystal-clear lagoons, white sandy beaches, and abundant marine life.",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=3840&q=95",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=3840&q=95",
    ],
    weather: "30 C   Sunny",
  },
  "banff": {
    name: "Banff", country: "Canada", city: "Banff", rating: 4.8, reviewCount: 2760,
    priceFrom: 899, currency: "USD", category: "Mountain",
    description: "Banff National Park is Canada's oldest national park, established in 1885. Located in the Rocky Mountains of Alberta, it's known for its stunning mountain scenery, turquoise glacial lakes, and diverse wildlife.",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=3840&q=95",
      "https://images.unsplash.com/photo-1609462671821-a9ae52e3b12e?w=3840&q=95",
    ],
    weather: "12 C   Clear",
  },
  "phuket": {
    name: "Phuket", country: "Thailand", city: "Phuket City", rating: 4.7, reviewCount: 3340,
    priceFrom: 699, currency: "USD", category: "Beach",
    description: "Phuket is a resort island in southern Thailand. It's known for its beaches, clear waters, and vibrant nightlife. The island offers a mix of relaxation and adventure, from snorkeling and diving to exploring Buddhist temples.",
    images: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=3840&q=95",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=3840&q=95",
    ],
    weather: "31 C   Humid",
  },
  "yosemite": {
    name: "Yosemite", country: "USA", city: "Yosemite Valley", rating: 4.9, reviewCount: 4120,
    priceFrom: 450, currency: "USD", category: "Camping",
    description: "Yosemite National Park is in California's Sierra Nevada mountains. It's famed for its giant ancient sequoias, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome.",
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=3840&q=95",
      "https://images.unsplash.com/photo-1562310503-a918c4c61e38?w=3840&q=95",
    ],
    weather: "22 C   Clear",
  },
  "como-lake": {
    name: "Como Lake", country: "Italy", city: "Como", rating: 4.8, reviewCount: 2180,
    priceFrom: 1199, currency: "USD", category: "Lake",
    description: "Lake Como is a glacial lake in Lombardy, northern Italy. Surrounded by mountains, the lake is dotted with luxurious villas and villages. It's long been a favourite retreat for European nobility and wealthy travellers.",
    images: [
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=3840&q=95",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=3840&q=95",
    ],
    weather: "20 C   Partly Cloudy",
  },
  "tokyo": {
    name: "Tokyo", country: "Japan", city: "Tokyo", rating: 4.9, reviewCount: 6780,
    priceFrom: 1499, currency: "USD", category: "City",
    description: "Tokyo, Japan's busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. It's known for its cutting-edge technology, world-class cuisine, and the iconic Mount Fuji view.",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=3840&q=95",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=3840&q=95",
    ],
    weather: "24 C   Clear",
  },
  "paris": {
    name: "Paris", country: "France", city: "Paris", rating: 4.8, reviewCount: 8920,
    priceFrom: 1099, currency: "USD", category: "City",
    description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine, with iconic landmarks like the Eiffel Tower.",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=3840&q=95",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=3840&q=95",
    ],
    weather: "19 C   Cloudy",
  },
  "new-york": {
    name: "New York", country: "USA", city: "New York City", rating: 4.8, reviewCount: 9340,
    priceFrom: 999, currency: "USD", category: "City",
    description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial, and cultural centers.",
    images: [
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=3840&q=95",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=3840&q=95",
    ],
    weather: "21 C   Sunny",
  },
  "dubai": {
    name: "Dubai", country: "UAE", city: "Dubai", rating: 4.7, reviewCount: 5430,
    priceFrom: 1199, currency: "USD", category: "City",
    description: "Dubai is a city and emirate in the United Arab Emirates known for its ultramodern architecture, luxury shopping, and lively nightlife scene. It is home to the Burj Khalifa, the world's tallest building.",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=3840&q=95",
      "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=3840&q=95",
    ],
    weather: "38 C   Sunny",
  },
  "singapore": {
    name: "Singapore", country: "Singapore", city: "Singapore", rating: 4.8, reviewCount: 4670,
    priceFrom: 1099, currency: "USD", category: "City",
    description: "Singapore is a sovereign city-state and island in Southeast Asia. It's known for its thriving economy, multicultural population, and futuristic skyline. The city blends colonial heritage, modern architecture, and lush green spaces.",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=3840&q=95",
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=3840&q=95",
    ],
    weather: "29 C   Humid",
  },
  "barcelona": {
    name: "Barcelona", country: "Spain", city: "Barcelona", rating: 4.8, reviewCount: 6120,
    priceFrom: 899, currency: "USD", category: "City",
    description: "Barcelona is the capital of Catalonia in Spain. Known for its art and architecture, the city is home to Gaud 's Sagrada Fam lia basilica and other modernist landmarks. Barcelona's beaches, food, and vibrant nightlife draw millions of visitors.",
    images: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=3840&q=95",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=3840&q=95",
    ],
    weather: "26 C   Sunny",
  },
  "sydney": {
    name: "Sydney", country: "Australia", city: "Sydney", rating: 4.8, reviewCount: 4890,
    priceFrom: 1099, currency: "USD", category: "City",
    description: "Sydney is the capital of New South Wales and one of Australia's largest cities. It's best known for its harbourfront Opera House with a distinctive sail-like design. Sprawling parks, a scenic harbor, and world-class beaches make it one of the most liveable cities.",
    images: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=3840&q=95",
      "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=3840&q=95",
    ],
    weather: "18 C   Partly Cloudy",
  },
  "istanbul": {
    name: "Istanbul", country: "Turkey", city: "Istanbul", rating: 4.7, reviewCount: 4320,
    priceFrom: 799, currency: "USD", category: "City",
    description: "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here, with the iconic Hagia Sophia and Blue Mosque.",
    images: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=3840&q=95",
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=3840&q=95",
    ],
    weather: "23 C   Partly Cloudy",
  },
  "cape-town": {
    name: "Cape Town", country: "South Africa", city: "Cape Town", rating: 4.8, reviewCount: 3210,
    priceFrom: 799, currency: "USD", category: "City",
    description: "Cape Town is a port city on South Africa's southwest coast, on a peninsula beneath the imposing Table Mountain. Slowly rotating cable cars climb to the mountain's flat top, from which there are sweeping views of the city, the Cape of Good Hope, Robben Island, and the ocean.",
    images: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=3840&q=95",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=3840&q=95",
    ],
    weather: "16 C   Windy",
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
                <h1 className="font-[family-name:var(--font-sora)] text-3xl sm:text-4xl font-bold text-white">
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
                  <h2 className="font-[family-name:var(--font-sora)] font-semibold text-[#111827] mb-3">About {dest.name}</h2>
                  <p className="text-[#374151] leading-relaxed">{dest.description}</p>
                </Card>

                {/* Quick info grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {[
                    { icon: <Clock size={16} />, label: "Best time", value: "Apr Oct", color: "text-[#60A5FA]" },
                    { icon: <DollarSign size={16} />, label: "Budget", value: "Mid High", color: "text-[#6EE7B7]" },
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
                  <h2 className="font-[family-name:var(--font-sora)] font-semibold text-[#111827] mb-4 flex items-center gap-2">
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
              <h3 className="font-[family-name:var(--font-sora)] font-semibold text-[#111827] mb-4">Book This Trip</h3>
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
