"use client";

import { useState, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Calendar, Users, Search,
  Hotel, Plane, Bus, Car,
  ArrowLeftRight, ChevronDown,
} from "lucide-react";
import { cn } from "@/utils/cn";

/*    Types                                                      */
type Tab = "Hotels" | "Flights" | "Bus" | "Cars";

interface TabDef {
  key:  Tab;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

/*    Constants                                                  */
const TABS: TabDef[] = [
  { key: "Hotels",  Icon: Hotel },
  { key: "Flights", Icon: Plane },
  { key: "Bus",     Icon: Bus   },
  { key: "Cars",    Icon: Car   },
];

const POPULAR_DESTINATIONS = [
  "Santorini", "Kyoto", "Bali", "Patagonia", "Iceland", "Maldives",
];

const CABIN_CLASSES = ["Economy", "Premium Economy", "Business", "First"];

/*    Field wrapper                                              */
interface FieldProps {
  label:    string;
  icon:     React.ReactNode;
  children: React.ReactNode;
  divider?: boolean;
  flex?:    number | string;
}

function Field({ label, icon, children, divider = true, flex = 1 }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const id = useId();

  return (
    <>
      {divider && (
        <div
          aria-hidden="true"
          style={{
            width: "1px",
            alignSelf: "stretch",
            margin: "0",
            background: "rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}
        />
      )}
      <div
        className="relative flex flex-col justify-end"
        style={{
          flex,
          height: "80px",
          paddingLeft: "1rem",
          paddingRight: "0.75rem",
          paddingBottom: "14px",
          paddingTop: "26px",
          transition: "box-shadow 0.2s",
          boxShadow: focused ? "inset 0 0 0 2px rgba(30,142,232,0.30)" : "none",
          borderRadius: "4px",
        }}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={()  => setFocused(false)}
      >
        {/* Icon */}
        <span
          className="absolute pointer-events-none"
          style={{ top: "50%", left: "1rem", transform: "translateY(-50%)", color: "rgba(255,255,255,0.30)" }}
          aria-hidden="true"
        >
          {icon}
        </span>

        {/* Label */}
        <label
          htmlFor={id}
          style={{
            position: "absolute",
            top: "12px",
            left: "2.6rem",
            fontFamily: "var(--font-head)",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.30)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {label}
        </label>

        {/* Input */}
        <div style={{ paddingLeft: "1.6rem" }}>
          {children}
        </div>
      </div>
    </>
  );
}

/*    Shared input style                                         */
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  fontFamily: "var(--font-body)",
  fontSize: "15px",
  fontWeight: 500,
  color: "var(--text-inv)",
  padding: 0,
};

const placeholderColor = "rgba(240,246,255,0.20)";

/*    Hotels form                                                */
interface HotelsFormProps {
  dest:       string;
  setDest:    (v: string) => void;
  checkIn:    string;
  setCheckIn: (v: string) => void;
  checkOut:   string;
  setCheckOut:(v: string) => void;
  guests:     number;
  setGuests:  (v: number) => void;
}

function HotelsForm({
  dest, setDest,
  checkIn, setCheckIn,
  checkOut, setCheckOut,
  guests, setGuests,
}: HotelsFormProps) {
  return (
    <>
      <Field label="Destination" icon={<MapPin size={15} />} divider={false}>
        <input
          id="hotel-dest"
          type="text"
          value={dest}
          onChange={e => setDest(e.target.value)}
          placeholder="Where to?"
          style={{ ...inputStyle }}
          className="placeholder:text-[rgba(240,246,255,0.20)]"
          autoComplete="off"
          aria-label="Destination"
        />
      </Field>

      <Field label="Check-in" icon={<Calendar size={15} />}>
        <input
          id="hotel-checkin"
          type="date"
          value={checkIn}
          onChange={e => setCheckIn(e.target.value)}
          style={{ ...inputStyle, colorScheme: "dark" }}
          aria-label="Check-in date"
        />
      </Field>

      <Field label="Check-out" icon={<Calendar size={15} />}>
        <input
          id="hotel-checkout"
          type="date"
          value={checkOut}
          onChange={e => setCheckOut(e.target.value)}
          style={{ ...inputStyle, colorScheme: "dark" }}
          aria-label="Check-out date"
        />
      </Field>

      <Field label="Guests" icon={<Users size={15} />} flex="0 0 140px">
        <input
          id="hotel-guests"
          type="number"
          min={1}
          max={20}
          value={guests}
          onChange={e => setGuests(Math.max(1, Number(e.target.value)))}
          style={{ ...inputStyle, width: "60px" }}
          aria-label="Number of guests"
        />
      </Field>
    </>
  );
}

/*    Flights form                                               */
function FlightsForm() {
  const [from,       setFrom]       = useState("");
  const [to,         setTo]         = useState("");
  const [date,       setDate]       = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabin,      setCabin]      = useState("Economy");

  const swap = () => {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  };

  return (
    <>
      {/* From */}
      <div className="relative" style={{ flex: 1 }}>
        <Field label="From" icon={<Plane size={15} />} divider={false}>
          <input
            type="text"
            value={from}
            onChange={e => setFrom(e.target.value)}
            placeholder="Origin city"
            style={{ ...inputStyle }}
            className="placeholder:text-[rgba(240,246,255,0.20)]"
            autoComplete="off"
            aria-label="Departure city"
          />
        </Field>
        {/* Swap button   overlaps the divider */}
        <button
          type="button"
          onClick={swap}
          className="absolute z-10 glass flex items-center justify-center transition-all hover:opacity-70"
          style={{
            right: "-16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            padding: 0,
            cursor: "pointer",
          }}
          aria-label="Swap origin and destination"
        >
          <ArrowLeftRight size={12} style={{ color: "var(--accent)" }} />
        </button>
      </div>

      {/* To */}
      <Field label="To" icon={<MapPin size={15} />}>
        <input
          type="text"
          value={to}
          onChange={e => setTo(e.target.value)}
          placeholder="Destination city"
          style={{ ...inputStyle }}
          className="placeholder:text-[rgba(240,246,255,0.20)]"
          autoComplete="off"
          aria-label="Destination city"
        />
      </Field>

      {/* Date */}
      <Field label="Date" icon={<Calendar size={15} />} flex="0 0 160px">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ ...inputStyle, colorScheme: "dark" }}
          aria-label="Travel date"
        />
      </Field>

      {/* Passengers */}
      <Field label="Passengers" icon={<Users size={15} />} flex="0 0 130px">
        <input
          type="number"
          min={1}
          max={20}
          value={passengers}
          onChange={e => setPassengers(Math.max(1, Number(e.target.value)))}
          style={{ ...inputStyle, width: "50px" }}
          aria-label="Number of passengers"
        />
      </Field>

      {/* Cabin class */}
      <Field label="Class" icon={<ChevronDown size={15} />} flex="0 0 150px">
        <select
          value={cabin}
          onChange={e => setCabin(e.target.value)}
          style={{
            ...inputStyle,
            appearance: "none",
            WebkitAppearance: "none",
            cursor: "pointer",
          }}
          aria-label="Cabin class"
        >
          {CABIN_CLASSES.map(c => (
            <option key={c} value={c} style={{ background: "var(--surface-2)", color: "#fff" }}>
              {c}
            </option>
          ))}
        </select>
      </Field>
    </>
  );
}

/*    Bus form                                                   */
function BusForm() {
  const [from, setFrom] = useState("");
  const [to,   setTo]   = useState("");
  const [date, setDate] = useState("");

  return (
    <>
      <Field label="From" icon={<MapPin size={15} />} divider={false}>
        <input
          type="text"
          value={from}
          onChange={e => setFrom(e.target.value)}
          placeholder="Departure city"
          style={{ ...inputStyle }}
          className="placeholder:text-[rgba(240,246,255,0.20)]"
          autoComplete="off"
          aria-label="Departure city"
        />
      </Field>
      <Field label="To" icon={<MapPin size={15} />}>
        <input
          type="text"
          value={to}
          onChange={e => setTo(e.target.value)}
          placeholder="Arrival city"
          style={{ ...inputStyle }}
          className="placeholder:text-[rgba(240,246,255,0.20)]"
          autoComplete="off"
          aria-label="Arrival city"
        />
      </Field>
      <Field label="Date" icon={<Calendar size={15} />} flex="0 0 180px">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ ...inputStyle, colorScheme: "dark" }}
          aria-label="Travel date"
        />
      </Field>
    </>
  );
}

/*    Cars form                                                  */
function CarsForm() {
  const [location,  setLocation]  = useState("");
  const [pickupD,   setPickupD]   = useState("");
  const [dropoffD,  setDropoffD]  = useState("");

  return (
    <>
      <Field label="Pick-up Location" icon={<MapPin size={15} />} divider={false} flex={2}>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="City, airport or address"
          style={{ ...inputStyle }}
          className="placeholder:text-[rgba(240,246,255,0.20)]"
          autoComplete="off"
          aria-label="Pick-up location"
        />
      </Field>
      <Field label="Pick-up Date" icon={<Calendar size={15} />}>
        <input
          type="date"
          value={pickupD}
          onChange={e => setPickupD(e.target.value)}
          style={{ ...inputStyle, colorScheme: "dark" }}
          aria-label="Pick-up date"
        />
      </Field>
      <Field label="Drop-off Date" icon={<Calendar size={15} />}>
        <input
          type="date"
          value={dropoffD}
          onChange={e => setDropoffD(e.target.value)}
          style={{ ...inputStyle, colorScheme: "dark" }}
          aria-label="Drop-off date"
        />
      </Field>
    </>
  );
}

/*    Main component                                             */
export function SearchSection() {
  const [active,   setActive]   = useState<Tab>("Hotels");
  const [dest,     setDest]     = useState("");
  const [checkIn,  setCheckIn]  = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests,   setGuests]   = useState(1);

  const handlePopular = (place: string) => {
    setActive("Hotels");
    setDest(place);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* Routing / search logic goes here */
  };

  return (
    <section
      id="search"
      className="relative"
      style={{ background: "var(--surface-0)", padding: "0 0 6rem" }}
      aria-label="Search travel"
    >
      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-4"
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          Plan Your Trip
        </motion.p>

        {/* Main panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "var(--r-xl)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(30,142,232,0.08)",
            overflow: "hidden",
            position: "relative",
          }}
          role="search"
          aria-label="Search panel"
        >

          {/*    Tab bar                                           */}
          <div
            className="flex"
            role="tablist"
            aria-label="Search type"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
          >
            {TABS.map(({ key, Icon }) => {
              const isActive = active === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${key}`}
                  onClick={() => setActive(key)}
                  className="relative flex items-center gap-1.5 transition-all"
                  style={{
                    padding: "1rem 1.5rem",
                    fontFamily: "var(--font-head)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--accent)" : "rgba(240,246,255,0.38)",
                    background: isActive ? "rgba(30,142,232,0.05)" : "transparent",
                    border: "none",
                    borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                    marginBottom: "-1px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "color 0.2s, background 0.2s, border-color 0.2s",
                  }}
                >
                  <Icon size={13} aria-hidden="true" />
                  {key}
                </button>
              );
            })}
          </div>

          {/*    Form                                              */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              id={`panel-${active}`}
              role="tabpanel"
              aria-label={`${active} search`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-stretch" style={{ minHeight: "80px" }}>

                  {active === "Hotels" && (
                    <HotelsForm
                      dest={dest}         setDest={setDest}
                      checkIn={checkIn}   setCheckIn={setCheckIn}
                      checkOut={checkOut} setCheckOut={setCheckOut}
                      guests={guests}     setGuests={setGuests}
                    />
                  )}

                  {active === "Flights" && <FlightsForm />}
                  {active === "Bus"     && <BusForm />}
                  {active === "Cars"    && <CarsForm />}

                  {/* Search button   always right-end */}
                  <div
                    aria-hidden="true"
                    style={{
                      width: "1px",
                      alignSelf: "stretch",
                      background: "rgba(255,255,255,0.08)",
                      flexShrink: 0,
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-primary shrink-0 flex items-center gap-2"
                    style={{
                      height: "80px",
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                      borderRadius: 0,
                      fontSize: "13px",
                      letterSpacing: "0.06em",
                    }}
                    aria-label="Search"
                  >
                    <Search size={15} aria-hidden="true" />
                    Search
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>

        </motion.div>

        {/*    Popular destinations                                 */}
        <motion.div
          className="flex flex-wrap items-center gap-2 mt-5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <span
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              flexShrink: 0,
            }}
          >
            Popular:
          </span>

          {POPULAR_DESTINATIONS.map(place => (
            <button
              key={place}
              type="button"
              onClick={() => handlePopular(place)}
              className="glass transition-all"
              style={{
                padding: "0.35rem 0.875rem",
                borderRadius: "999px",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(240,246,255,0.65)",
                border: "1px solid rgba(255,255,255,0.10)",
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--text-inv)";
                el.style.background = "rgba(30,142,232,0.08)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.10)";
                el.style.color = "rgba(240,246,255,0.65)";
                el.style.background = "rgba(255,255,255,0.06)";
              }}
              aria-label={`Search for ${place}`}
            >
              {place}
            </button>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
