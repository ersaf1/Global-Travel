"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plane, Train, Car, Bike, MapPin, Calendar, Users, Search, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import type { TransportMode } from "@/types";

const transportModes: { mode: TransportMode; icon: React.ReactNode; label: string }[] = [
  { mode: "FLIGHT", icon: <Plane size={16} />, label: "Flight" },
  { mode: "TRAIN", icon: <Train size={16} />, label: "Train" },
  { mode: "CAR", icon: <Car size={16} />, label: "Car" },
  { mode: "MOTORCYCLE", icon: <Bike size={16} />, label: "Moto" },
];

export function HeroSearchBox() {
  const router = useRouter();
  const [transport, setTransport] = useState<TransportMode>("FLIGHT");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      from,
      to,
      date,
      travelers: String(travelers),
      mode: transport,
    });
    router.push(`/planner?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_8px_40px_rgba(0,0,0,0.10)] p-6"
    >
      {/* Transport mode selector */}
      <div className="flex items-center gap-2 mb-5" role="group" aria-label="Select transport mode">
        {transportModes.map(({ mode, icon, label }) => (
          <button
            key={mode}
            type="button"
            onClick={() => setTransport(mode)}
            aria-pressed={transport === mode}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
              transport === mode
                ? "bg-[#111827] text-white shadow-sm"
                : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]"
            )}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {/* From */}
          <div className="relative">
            <label htmlFor="hero-from" className="sr-only">From</label>
            <MapPin
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#60A5FA] pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="hero-from"
              type="text"
              placeholder="Origin city"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full h-11 pl-9 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20 transition-all"
            />
          </div>

          {/* To */}
          <div className="relative">
            <label htmlFor="hero-to" className="sr-only">To</label>
            <MapPin
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6EE7B7] pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="hero-to"
              type="text"
              placeholder="Destination city"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full h-11 pl-9 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20 transition-all"
            />
          </div>

          {/* Date */}
          <div className="relative">
            <label htmlFor="hero-date" className="sr-only">Departure date</label>
            <Calendar
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FDBA74] pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="hero-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 pl-9 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20 transition-all"
            />
          </div>

          {/* Travelers */}
          <div className="relative">
            <label htmlFor="hero-travelers" className="sr-only">Number of travelers</label>
            <Users
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="hero-travelers"
              type="number"
              min={1}
              max={20}
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full h-11 pl-9 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20 transition-all"
            />
          </div>
        </div>

        <Button type="submit" fullWidth size="lg" icon={<Search size={18} />}>
          Search Routes
        </Button>
      </form>
    </motion.div>
  );
}
