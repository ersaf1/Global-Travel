"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Search, Hotel, Plane, Bus, Car } from "lucide-react";
import { cn } from "@/utils/cn";

type SearchTab = "Hotels" | "Flights" | "Bus" | "Cars";

const tabs: { key: SearchTab; icon: React.ReactNode }[] = [
  { key: "Hotels", icon: <Hotel size={16} /> },
  { key: "Flights", icon: <Plane size={16} /> },
  { key: "Bus", icon: <Bus size={16} /> },
  { key: "Cars", icon: <Car size={16} /> },
];

export function HeroSearchCard() {
  const [activeTab, setActiveTab] = useState<SearchTab>("Hotels");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      className="w-full max-w-4xl rounded-[24px] p-6 sm:p-7"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 20px rgba(21,199,232,0.08)",
      }}
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-[#E2E8F0]" role="tablist" aria-label="Search type">
        {tabs.map(({ key, icon }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeTab === key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-px",
              activeTab === key
                ? "text-[#0F172A] border-[#15C7E8]"
                : "text-[#94A3B8] border-transparent hover:text-[#64748B]"
            )}
          >
            {icon}
            {key}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end"
      >
        {/* Destination */}
        <div className="lg:col-span-1">
          <label htmlFor="destination" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
            Destination
          </label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#15C7E8]" aria-hidden="true" />
            <input
              id="destination"
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#15C7E8] focus:ring-2 focus:ring-[#15C7E8]/15 transition-all"
            />
          </div>
        </div>

        {/* Check In */}
        <div>
          <label htmlFor="checkin" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
            Check In
          </label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#15C7E8]" aria-hidden="true" />
            <input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#15C7E8] focus:ring-2 focus:ring-[#15C7E8]/15 transition-all"
            />
          </div>
        </div>

        {/* Check Out */}
        <div>
          <label htmlFor="checkout" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
            Check Out
          </label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2E9BFF]" aria-hidden="true" />
            <input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#15C7E8] focus:ring-2 focus:ring-[#15C7E8]/15 transition-all"
            />
          </div>
        </div>

        {/* Guests + Search */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="guests" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Guests
            </label>
            <div className="relative">
              <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2E9BFF]" aria-hidden="true" />
              <input
                id="guests"
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-12 pl-10 pr-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#15C7E8] focus:ring-2 focus:ring-[#15C7E8]/15 transition-all"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="h-12 px-6 rounded-xl flex items-center gap-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #15C7E8, #2E9BFF)" }}
              aria-label="Search"
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
