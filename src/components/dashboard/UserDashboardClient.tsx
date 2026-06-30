"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bookmark, Calendar, Clock, CheckCircle, XCircle,
  User, MapPin, Settings, LogOut, LayoutDashboard
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { formatDateShort, formatPrice } from "@/utils/format";

type Tab = "overview" | "bookings" | "saved" | "profile";

const mockBookings = [
  { id: "b1", destination: "Bali, Indonesia", date: "2026-07-15", status: "CONFIRMED" as const, transport: "FLIGHT", price: 899, currency: "USD" },
  { id: "b2", destination: "Kyoto, Japan", date: "2026-09-01", status: "PENDING" as const, transport: "FLIGHT", price: 1299, currency: "USD" },
  { id: "b3", destination: "Paris, France", date: "2025-12-24", status: "COMPLETED" as const, transport: "TRAIN", price: 1099, currency: "USD" },
];

const mockSaved = [
  { id: "s1", name: "Santorini", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300", rating: 4.7 },
  { id: "s2", name: "Maldives", country: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=300", rating: 4.8 },
  { id: "s3", name: "Machu Picchu", country: "Peru", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=300", rating: 4.9 },
];

const statusConfig: Record<string, { label: string; variant: "green" | "orange" | "gray" | "blue" }> = {
  CONFIRMED: { label: "Confirmed", variant: "green" },
  PENDING: { label: "Pending", variant: "orange" },
  COMPLETED: { label: "Completed", variant: "gray" },
  CANCELLED: { label: "Cancelled", variant: "gray" },
};

const navItems: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: "overview", icon: <LayoutDashboard size={18} />, label: "Overview" },
  { id: "bookings", icon: <Calendar size={18} />, label: "My Bookings" },
  { id: "saved", icon: <Bookmark size={18} />, label: "Saved Places" },
  { id: "profile", icon: <User size={18} />, label: "My Profile" },
];

export function UserDashboardClient() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1" aria-label="Dashboard navigation">
            <Card padding="md" className="sticky top-24">
              {/* User avatar */}
              <div className="flex flex-col items-center text-center p-4 mb-2">
                <div className="w-16 h-16 bg-[#DBEAFE] rounded-full flex items-center justify-center mb-3">
                  <User size={28} className="text-[#1D4ED8]" aria-hidden="true" />
                </div>
                <p className="font-semibold text-[#111827]">John Traveler</p>
                <p className="text-xs text-[#9CA3AF]">john@example.com</p>
              </div>

              <nav className="space-y-1" role="navigation" aria-label="Dashboard sections">
                {navItems.map(({ id, icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    aria-current={tab === id ? "page" : undefined}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      tab === id
                        ? "bg-[#111827] text-white"
                        : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]"
                    )}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                  <LogOut size={18} aria-hidden="true" />
                  Sign Out
                </button>
              </div>
            </Card>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3 space-y-6" aria-label="Dashboard content">
            {/* Overview */}
            {tab === "overview" && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div>
                  <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#111827]">
                    Welcome back, John 👋
                  </h1>
                  <p className="text-[#6B7280] mt-1">Here's what's happening with your trips.</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: <Calendar size={20} />, label: "Total Bookings", value: "3", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
                    { icon: <CheckCircle size={20} />, label: "Completed Trips", value: "1", color: "bg-[#D1FAE5] text-[#065F46]" },
                    { icon: <Bookmark size={20} />, label: "Saved Places", value: "3", color: "bg-[#FEF3C7] text-[#92400E]" },
                  ].map(({ icon, label, value, color }) => (
                    <Card key={label} padding="md" className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`} aria-hidden="true">{icon}</div>
                      <div>
                        <p className="text-2xl font-bold text-[#111827]">{value}</p>
                        <p className="text-xs text-[#9CA3AF]">{label}</p>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Upcoming */}
                <Card padding="lg">
                  <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] mb-4 flex items-center gap-2">
                    <Clock size={18} aria-hidden="true" /> Upcoming Trips
                  </h2>
                  <div className="space-y-3">
                    {mockBookings.filter(b => b.status !== "COMPLETED").map((b) => (
                      <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#DBEAFE] rounded-xl flex items-center justify-center">
                            <MapPin size={16} className="text-[#1D4ED8]" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#111827]">{b.destination}</p>
                            <p className="text-xs text-[#9CA3AF]">{formatDateShort(b.date)} · {b.transport}</p>
                          </div>
                        </div>
                        <Badge variant={statusConfig[b.status].variant}>{statusConfig[b.status].label}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Bookings */}
            {tab === "bookings" && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#111827] mb-6">My Bookings</h1>
                <div className="space-y-4">
                  {mockBookings.map((b) => (
                    <Card key={b.id} padding="md" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center text-xl" aria-hidden="true">
                          {b.transport === "FLIGHT" ? "✈️" : b.transport === "TRAIN" ? "🚆" : "🚗"}
                        </div>
                        <div>
                          <p className="font-semibold text-[#111827]">{b.destination}</p>
                          <p className="text-sm text-[#9CA3AF]">{formatDateShort(b.date)} · {b.transport}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#111827]">{formatPrice(b.price, b.currency)}</span>
                        <Badge variant={statusConfig[b.status].variant}>{statusConfig[b.status].label}</Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Saved */}
            {tab === "saved" && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#111827] mb-6">Saved Places</h1>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockSaved.map((s) => (
                    <Card key={s.id} padding="none" className="overflow-hidden" hover>
                      <div className="relative h-36">
                        <img src={s.image} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-[#111827]">{s.name}</p>
                        <p className="text-xs text-[#9CA3AF]">{s.country}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-medium text-[#111827]">⭐ {s.rating}</span>
                          <Button size="sm" variant="outline" onClick={() => { window.location.href = `/destinations/${s.name.toLowerCase()}`; }}>
                                            View
                                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Profile */}
            {tab === "profile" && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#111827] mb-6">My Profile</h1>
                <Card padding="lg" className="space-y-4 max-w-lg">
                  <div className="grid gap-4">
                    {[
                      { label: "Full Name", value: "John Traveler", type: "text" },
                      { label: "Email Address", value: "john@example.com", type: "email" },
                      { label: "Phone", value: "+1 234 567 8900", type: "tel" },
                    ].map(({ label, value, type }) => (
                      <div key={label}>
                        <label className="text-sm font-medium text-[#374151] block mb-1">{label}</label>
                        <input
                          type={type}
                          defaultValue={value}
                          className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/20"
                        />
                      </div>
                    ))}
                  </div>
                  <Button icon={<Settings size={16} />}>Save Changes</Button>
                </Card>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
