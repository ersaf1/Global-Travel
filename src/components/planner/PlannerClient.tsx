"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane, Train, Car, Bike, MapPin, Calendar, Users,
  Navigation2, Clock, DollarSign, Search, ChevronDown,
  ArrowRight, Loader2, X
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { autocomplete, getDisplayName, getCoords, type GeoapifyFeature } from "@/services/geoapify";
import { getRoute, formatRouteInfo, transportToProfile, type RouteInfo } from "@/services/openrouteservice";
import type { TransportMode } from "@/types";

// Leaflet must be client-only
const MapClient = dynamic(
  () => import("./MapClient").then(m => m.MapClient),
  { ssr: false, loading: () => (
    <div className="w-full h-full bg-[#F3F4F6] rounded-2xl flex items-center justify-center">
      <Loader2 size={24} className="animate-spin text-[#9CA3AF]" />
    </div>
  )}
);

const transportModes: { mode: TransportMode; emoji: string; label: string }[] = [
  { mode: "FLIGHT",     emoji: "✈️", label: "Flight"     },
  { mode: "TRAIN",      emoji: "🚆", label: "Train"      },
  { mode: "CAR",        emoji: "🚗", label: "Car"        },
  { mode: "MOTORCYCLE", emoji: "🏍", label: "Motorcycle" },
];

interface PlaceOption {
  result: GeoapifyFeature;
  label: string;
}

function PlaceAutocomplete({
  id,
  label,
  placeholder,
  value,
  onSelect,
  dotColor = "#60A5FA",
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onSelect: (result: GeoapifyFeature, display: string) => void;
  dotColor?: string;
}) {
  const [query, setQuery] = useState(value);
  const [options, setOptions] = useState<PlaceOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.length < 2) { setOptions([]); setOpen(false); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await autocomplete(val, 5);
        setOptions(results.map(r => ({
          result: r,
          label: r.properties.formatted,
        })));
        setOpen(true);
      } catch {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div ref={wrapRef} className="relative flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#374151]">{label}</label>
      <div className="relative">
        <MapPin
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: dotColor }}
          aria-hidden="true"
        />
        <input
          id={id}
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => options.length > 0 && setOpen(true)}
          className="w-full h-11 pl-9 pr-10 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {loading
            ? <Loader2 size={14} className="animate-spin text-[#9CA3AF]" aria-label="Searching..." />
            : query
              ? <button type="button" onClick={() => { setQuery(""); setOptions([]); setOpen(false); }} className="text-[#9CA3AF] hover:text-[#374151]" aria-label="Clear">
                  <X size={14} />
                </button>
              : null
          }
        </div>
      </div>

      <AnimatePresence>
        {open && options.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] z-50 overflow-hidden"
            role="listbox"
            aria-label={`${label} suggestions`}
          >
            {options.map((opt, i) => (
              <li key={opt.result.properties.place_id}>
                <button
                  type="button"
                  role="option"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F3F4F6] transition-colors flex items-start gap-2 border-b border-[#F9FAFB] last:border-0"
                  onClick={() => {
                    const display = getDisplayName(opt.result);
                    setQuery(display);
                    setOpen(false);
                    onSelect(opt.result, display);
                  }}
                >
                  <MapPin size={13} className="mt-0.5 shrink-0 text-[#9CA3AF]" aria-hidden="true" />
                  <span className="text-[#374151] line-clamp-2 leading-tight">{opt.result.properties.formatted}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PlannerClient() {
  const [transport, setTransport]   = useState<TransportMode>("CAR");
  const [date, setDate]             = useState("");
  const [travelers, setTravelers]   = useState(1);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [result, setResult]         = useState<RouteInfo | null>(null);

  const [origin, setOrigin] = useState<{ result: GeoapifyFeature; label: string } | null>(null);
  const [dest, setDest]     = useState<{ result: GeoapifyFeature; label: string } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !dest) { setError("Please select both origin and destination."); return; }
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const profile = transportToProfile(transport);
      const [oLat, oLon] = getCoords(origin.result);
      const [dLat, dLon] = getCoords(dest.result);

      const resp = await getRoute(oLat, oLon, dLat, dLon, profile, true);
      setResult(formatRouteInfo(resp, transport));
    } catch (err) {
      setError("Failed to get route. Check your connection and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const mapProps = result && origin && dest ? {
    routeCoords: result.coordinates,
    originMarker: {
      lat: getCoords(origin.result)[0],
      lon: getCoords(origin.result)[1],
      label: origin.label,
    },
    destMarker: {
      lat: getCoords(dest.result)[0],
      lon: getCoords(dest.result)[1],
      label: dest.label,
    },
  } : {};

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="text-sm font-medium text-[#60A5FA] uppercase tracking-wide mb-1">Route Planner</p>
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#111827]">
              Plan Your Perfect Route
            </h1>
            <p className="text-[#6B7280] mt-1">
              Powered by Geoapify + OpenRouteService + MapTiler
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Panel */}
          <div className="lg:col-span-1">
            <Card padding="lg" className="sticky top-24">
              {/* Transport mode */}
              <div className="mb-5">
                <p className="text-sm font-medium text-[#374151] mb-3">Transport Mode</p>
                <div className="grid grid-cols-2 gap-2" role="group" aria-label="Select transport mode">
                  {transportModes.map(({ mode, emoji, label }) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setTransport(mode)}
                      aria-pressed={transport === mode}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200",
                        transport === mode
                          ? "bg-[#111827] text-white border-[#111827] shadow-sm"
                          : "bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#D1D5DB] hover:text-[#111827]"
                      )}
                    >
                      <span aria-hidden="true">{emoji}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                <PlaceAutocomplete
                  id="origin"
                  label="From"
                  placeholder="Search origin city..."
                  value={origin?.label ?? ""}
                  onSelect={(r, label) => setOrigin({ result: r, label })}
                  dotColor="#60A5FA"
                />

                <PlaceAutocomplete
                  id="destination"
                  label="To"
                  placeholder="Search destination city..."
                  value={dest?.label ?? ""}
                  onSelect={(r, label) => setDest({ result: r, label })}
                  dotColor="#6EE7B7"
                />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="date" className="text-sm font-medium text-[#374151]">Departure Date</label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FDBA74] pointer-events-none" aria-hidden="true" />
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full h-11 pl-9 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#374151]">Travelers</label>
                  <div className="flex items-center gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-2.5">
                    <Users size={15} className="text-[#9CA3AF]" aria-hidden="true" />
                    <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-6 h-6 rounded-md bg-white border border-[#E5E7EB] text-sm flex items-center justify-center hover:bg-[#F3F4F6]"
                      aria-label="Decrease travelers">−
                    </button>
                    <span className="flex-1 text-center text-sm font-medium text-[#111827]" aria-live="polite">
                      {travelers} {travelers === 1 ? "person" : "people"}
                    </span>
                    <button type="button" onClick={() => setTravelers(Math.min(20, travelers + 1))}
                      className="w-6 h-6 rounded-md bg-white border border-[#E5E7EB] text-sm flex items-center justify-center hover:bg-[#F3F4F6]"
                      aria-label="Increase travelers">+
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2" role="alert">
                    {error}
                  </p>
                )}

                <Button type="submit" fullWidth loading={loading} icon={<Navigation2 size={16} />}>
                  {loading ? "Searching..." : "Search Route"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Map + Results */}
          <div className="lg:col-span-2 space-y-5">
            {/* Map */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] h-80">
              <MapClient
                center={[20, 10]}
                zoom={2}
                height="100%"
                {...mapProps}
              />
            </div>

            {/* Route result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { icon: <Navigation2 size={16} />, label: "Distance", value: result.distance,      color: "text-[#60A5FA]" },
                      { icon: <Clock size={16} />,        label: "Duration", value: result.duration,      color: "text-[#6EE7B7]" },
                      { icon: <DollarSign size={16} />,   label: "Est. Cost", value: result.estimatedCost, color: "text-[#FDBA74]" },
                    ].map(({ icon, label, value, color }) => (
                      <Card key={label} padding="md" className="text-center">
                        <div className={cn("flex justify-center mb-1", color)} aria-hidden="true">{icon}</div>
                        <p className="text-xs text-[#9CA3AF] mb-0.5">{label}</p>
                        <p className="text-sm font-semibold text-[#111827]">{value}</p>
                      </Card>
                    ))}
                  </div>

                  {/* Steps */}
                  {result.steps.length > 0 && (
                    <Card padding="lg">
                      <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] mb-4">
                        Route Steps
                      </h2>
                      <ol className="space-y-2" aria-label="Route steps">
                        {result.steps.map((step, i) => (
                          <li key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-[#DBEAFE] text-[#1D4ED8] text-xs font-semibold flex items-center justify-center shrink-0">
                                {i + 1}
                              </div>
                              {i < result.steps.length - 1 && (
                                <div className="w-px flex-1 bg-[#E5E7EB] my-1" aria-hidden="true" />
                              )}
                            </div>
                            <div className="pb-3 flex-1">
                              <p className="text-sm text-[#111827]">{step.instruction}</p>
                              <div className="flex gap-3 mt-0.5">
                                <span className="text-xs text-[#9CA3AF]">{step.distance}</span>
                                <span className="text-xs text-[#9CA3AF]">{step.duration}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </Card>
                  )}

                  {/* Alternatives */}
                  {result.alternatives.length > 0 && (
                    <Card padding="lg">
                      <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] mb-4">
                        Alternative Routes
                      </h2>
                      <div className="space-y-3">
                        {result.alternatives.map((alt, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                            <div>
                              <p className="text-sm font-medium text-[#111827]">{alt.label}</p>
                              <div className="flex gap-3 mt-0.5">
                                <span className="text-xs text-[#9CA3AF]">{alt.distance}</span>
                                <span className="text-xs text-[#9CA3AF]">{alt.duration}</span>
                              </div>
                            </div>
                            <Badge variant="blue">Alt {i + 1}</Badge>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {!result && !loading && (
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <div className="w-16 h-16 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ArrowRight size={24} className="text-[#9CA3AF]" aria-hidden="true" />
                </div>
                <p className="text-sm font-medium text-[#374151]">Search for a route</p>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Type any city or place name — powered by OpenStreetMap
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
