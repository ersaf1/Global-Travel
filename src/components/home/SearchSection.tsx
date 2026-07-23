"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Search, Hotel, Plane, Bus, Car } from "lucide-react";
import { cn } from "@/utils/cn";

type Tab = "Hotels" | "Flights" | "Bus" | "Cars";
const tabs: { key: Tab; icon: React.ReactNode }[] = [
  { key: "Hotels",  icon: <Hotel  size={14} /> },
  { key: "Flights", icon: <Plane  size={14} /> },
  { key: "Bus",     icon: <Bus    size={14} /> },
  { key: "Cars",    icon: <Car    size={14} /> },
];

export function SearchSection() {
  const [active, setActive] = useState<Tab>("Hotels");
  const [dest, setDest]   = useState("");
  const [inD, setIn]      = useState("");
  const [outD, setOut]    = useState("");
  const [guests, setG]    = useState(1);

  return (
    <section className="relative z-10 bg-white" style={{ padding: "0 0 5rem" }}>
      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{
            background: "white",
            border: "1.5px solid var(--line)",
            borderRadius: "var(--r-xl)",
            boxShadow: "0 8px 48px rgba(14,108,189,0.13), 0 2px 12px rgba(0,0,0,0.06)",
            overflow: "hidden",
            marginTop: "-2rem",
            position: "relative",
            zIndex: 20,
          }}
        >
          {/* Tabs */}
          <div className="flex" role="tablist" style={{ borderBottom: "1.5px solid var(--line)", background: "var(--nova-pale)" }}>
            {tabs.map(({ key, icon }) => (
              <button key={key} type="button" role="tab" aria-selected={active === key}
                onClick={() => setActive(key)}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 -mb-px transition-all duration-200",
                  active === key ? "border-nova text-nova-deep bg-white" : "border-transparent text-text-3 hover:text-nova"
                )}
                style={{
                  borderColor: active === key ? "var(--nova)" : "transparent",
                  color: active === key ? "var(--nova-deep)" : "var(--text-3)",
                  fontFamily: "var(--font-sora)",
                  fontSize: "12px",
                  letterSpacing: "0.06em",
                }}>
                {icon}{key}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <form onSubmit={e => e.preventDefault()}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ borderTop: "none" }}>
            {[
              { id: "dest",    label: "Destination", icon: <MapPin    size={15} />, type: "text",   val: dest,   set: setDest },
              { id: "in",      label: "Check-in",    icon: <Calendar  size={15} />, type: "date",   val: inD,    set: setIn   },
              { id: "out",     label: "Check-out",   icon: <Calendar  size={15} />, type: "date",   val: outD,   set: setOut  },
            ].map((f, i) => (
              <div key={f.id} className="relative"
                style={{ borderRight: "1.5px solid var(--line)", borderBottom: "none" }}>
                <label htmlFor={f.id} className="absolute top-4 left-5 pointer-events-none"
                  style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nova)", fontFamily: "var(--font-sora)" }}>
                  {f.label}
                </label>
                <div className="absolute left-5 text-nova" style={{ top: "50%", marginTop: "6px", color: "var(--nova)", pointerEvents: "none" }}>
                  {f.icon}
                </div>
                <input id={f.id} type={f.type as "text"|"date"} value={f.val as string}
                  onChange={e => (f.set as (v: string) => void)(e.target.value)}
                  placeholder={f.type === "text" ? "Where to?" : ""}
                  className="w-full bg-transparent focus:outline-none focus:bg-nova-pale transition-colors"
                  style={{ height: "80px", paddingTop: "30px", paddingBottom: "14px", paddingLeft: "44px", paddingRight: "16px", fontSize: "15px", fontFamily: "var(--font-nunito)", color: "var(--text)" }} />
              </div>
            ))}

            {/* Guests + CTA */}
            <div className="flex">
              <div className="relative flex-1">
                <label htmlFor="guests" className="absolute top-4 left-5 pointer-events-none"
                  style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nova)", fontFamily: "var(--font-sora)" }}>
                  Guests
                </label>
                <div className="absolute left-5" style={{ top: "50%", marginTop: "6px", color: "var(--nova)", pointerEvents: "none" }}>
                  <Users size={15} />
                </div>
                <input id="guests" type="number" min={1} max={20} value={guests}
                  onChange={e => setG(Number(e.target.value))}
                  className="w-full bg-transparent focus:outline-none focus:bg-nova-pale transition-colors"
                  style={{ height: "80px", paddingTop: "30px", paddingBottom: "14px", paddingLeft: "44px", paddingRight: "12px", fontSize: "15px", fontFamily: "var(--font-nunito)", color: "var(--text)" }} />
              </div>
              <button type="submit" className="shrink-0 flex items-center gap-2 text-white font-bold transition-colors hover:opacity-90"
                style={{ height: "80px", paddingLeft: "2rem", paddingRight: "2rem", background: "var(--nova)", fontSize: "13px", letterSpacing: "0.06em", fontFamily: "var(--font-sora)", cursor: "pointer", border: "none" }}
                aria-label="Search">
                <Search size={16} />
                Search
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
