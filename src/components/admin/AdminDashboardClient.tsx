"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, MapPin, Calendar, DollarSign, TrendingUp, Globe,
  LayoutDashboard, Bookmark, Settings, ChevronRight, Plus
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

type AdminTab = "dashboard" | "destinations" | "bookings" | "users" | "settings";

const stats = [
  { label: "Total Users", value: "12,450", change: "+8.2%", icon: <Users size={20} />, color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  { label: "Bookings", value: "3,821", change: "+14.5%", icon: <Calendar size={20} />, color: "bg-[#D1FAE5] text-[#065F46]" },
  { label: "Revenue", value: "$284K", change: "+22.1%", icon: <DollarSign size={20} />, color: "bg-[#FEF3C7] text-[#92400E]" },
  { label: "Destinations", value: "1,240", change: "+5.3%", icon: <Globe size={20} />, color: "bg-[#F3E8FF] text-[#6B21A8]" },
];

const recentBookings = [
  { id: "B001", user: "Sarah Chen", destination: "Bali, Indonesia", amount: "$899", status: "CONFIRMED" },
  { id: "B002", user: "Marco Rossi", destination: "Paris, France", amount: "$1,099", status: "PENDING" },
  { id: "B003", user: "Amara Osei", destination: "Kyoto, Japan", amount: "$1,299", status: "CONFIRMED" },
  { id: "B004", user: "Priya Sharma", destination: "Maldives", amount: "$2,499", status: "CANCELLED" },
];

const popularDestinations = [
  { name: "Bali, Indonesia", bookings: 342, revenue: "$289K", trend: "+12%" },
  { name: "Kyoto, Japan", bookings: 287, revenue: "$372K", trend: "+18%" },
  { name: "Santorini, Greece", bookings: 256, revenue: "$384K", trend: "+9%" },
  { name: "Maldives", bookings: 198, revenue: "$495K", trend: "+24%" },
];

const statusMap: Record<string, "green" | "orange" | "gray"> = {
  CONFIRMED: "green",
  PENDING: "orange",
  CANCELLED: "gray",
};

const navItems: { id: AdminTab; icon: React.ReactNode; label: string }[] = [
  { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { id: "destinations", icon: <Globe size={18} />, label: "Destinations" },
  { id: "bookings", icon: <Calendar size={18} />, label: "Bookings" },
  { id: "users", icon: <Users size={18} />, label: "Users" },
  { id: "settings", icon: <Settings size={18} />, label: "Settings" },
];

export function AdminDashboardClient() {
  const [tab, setTab] = useState<AdminTab>("dashboard");

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#111827] min-h-screen flex-shrink-0 hidden lg:flex flex-col" aria-label="Admin navigation">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
              <Globe size={16} className="text-white" aria-hidden="true" />
            </div>
            <div>
              <span className="font-[family-name:var(--font-poppins)] font-bold text-white text-sm">Travix</span>
              <p className="text-xs text-white/40">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1" role="navigation">
          {navItems.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-current={tab === id ? "page" : undefined}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                tab === id
                  ? "bg-white/15 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              )}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/30 px-3">Travix Admin v1.0</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto" aria-label="Admin content">
        {/* Top bar */}
        <header className="bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] capitalize">
            {tab}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#DBEAFE] rounded-full flex items-center justify-center text-xs font-semibold text-[#1D4ED8]" aria-label="Admin user">
              A
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Dashboard */}
          {tab === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, change, icon, color }) => (
                  <Card key={label} padding="md">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`} aria-hidden="true">
                        {icon}
                      </div>
                      <Badge variant="green" className="text-xs">{change}</Badge>
                    </div>
                    <p className="text-2xl font-bold text-[#111827]">{value}</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">{label}</p>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent bookings */}
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827]">Recent Bookings</h2>
                    <Button variant="ghost" size="sm" icon={<ChevronRight size={14} />} iconPosition="right" onClick={() => setTab("bookings")}>
                      View all
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {recentBookings.map((b) => (
                      <div key={b.id} className="flex items-center justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                        <div>
                          <p className="text-sm font-medium text-[#111827]">{b.user}</p>
                          <p className="text-xs text-[#9CA3AF]">{b.destination}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#111827]">{b.amount}</span>
                          <Badge variant={statusMap[b.status] ?? "gray"}>{b.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Popular destinations */}
                <Card padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827]">Popular Destinations</h2>
                    <TrendingUp size={18} className="text-[#9CA3AF]" aria-hidden="true" />
                  </div>
                  <div className="space-y-3">
                    {popularDestinations.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-xs font-semibold text-[#6B7280]" aria-hidden="true">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#111827]">{d.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden" role="progressbar" aria-valuenow={d.bookings} aria-valuemax={400} aria-label={`${d.bookings} bookings`}>
                              <div
                                className="h-full bg-[#60A5FA] rounded-full"
                                style={{ width: `${(d.bookings / 400) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-[#9CA3AF] shrink-0">{d.bookings}</span>
                          </div>
                        </div>
                        <Badge variant="green">{d.trend}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Destinations CRUD */}
          {tab === "destinations" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[#6B7280]">Manage all destinations</p>
                <Button size="sm" icon={<Plus size={14} />}>Add Destination</Button>
              </div>
              <Card padding="none">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" role="table">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        {["Name", "Country", "Category", "Rating", "Price", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Bali", country: "Indonesia", category: "Beach", rating: 4.8, price: "$899", status: "Active" },
                        { name: "Kyoto", country: "Japan", category: "Cultural", rating: 4.9, price: "$1,299", status: "Active" },
                        { name: "Santorini", country: "Greece", category: "Beach", rating: 4.7, price: "$1,499", status: "Active" },
                        { name: "Paris", country: "France", category: "City", rating: 4.6, price: "$1,099", status: "Active" },
                      ].map((row) => (
                        <tr key={row.name} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                          <td className="px-4 py-3 font-medium text-[#111827]">{row.name}</td>
                          <td className="px-4 py-3 text-[#6B7280]">{row.country}</td>
                          <td className="px-4 py-3"><Badge variant="blue">{row.category}</Badge></td>
                          <td className="px-4 py-3 text-[#111827]">  {row.rating}</td>
                          <td className="px-4 py-3 text-[#111827]">{row.price}</td>
                          <td className="px-4 py-3"><Badge variant="green">{row.status}</Badge></td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">Edit</Button>
                              <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Other tabs placeholder */}
          {(tab === "bookings" || tab === "users" || tab === "settings") && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card padding="lg">
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Bookmark size={22} className="text-[#9CA3AF]" aria-hidden="true" />
                  </div>
                  <p className="font-medium text-[#374151] capitalize">{tab} management</p>
                  <p className="text-sm text-[#9CA3AF] mt-1">Connect the database to manage {tab}</p>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
