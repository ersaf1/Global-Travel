"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { id: "destinations", label: "Destinations" },
  { id: "search",       label: "Search"       },
  { id: "hotels",       label: "Hotels"       },
  { id: "experiences",  label: "Experiences"  },
  { id: "flights",      label: "Flights"      },
  { id: "story",        label: "Our Story"    },
  { id: "reviews",      label: "Reviews"      },
];

export function EditionsNav() {
  const [active, setActive]   = useState("destinations");
  const [visible, setVisible] = useState(false);
  const pillRef  = useRef<HTMLSpanElement>(null);
  const navRef   = useRef<HTMLDivElement>(null);
  const listRef  = useRef<HTMLUListElement>(null);

  /*    show nav only after hero exits viewport    */
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  /*    IntersectionObserver per section    */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  /*    slide pill indicator    */
  useEffect(() => {
    if (!listRef.current || !pillRef.current) return;
    const activeBtn = listRef.current.querySelector<HTMLButtonElement>(
      `[data-id="${active}"]`
    );
    if (!activeBtn) return;
    const li   = activeBtn.closest("li") as HTMLElement;
    pillRef.current.style.left  = `${li.offsetLeft}px`;
    pillRef.current.style.width = `${li.offsetWidth}px`;
  }, [active]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 112; // navbar (64) + editions nav (48)
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      ref={navRef}
      role="navigation"
      aria-label="Page sections"
      style={{
        position:   "sticky",
        top:        "64px",
        zIndex:     40,
        background: "rgba(5,15,28,0.85)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        transform:  visible ? "translateY(0)" : "translateY(-100%)",
        opacity:    visible ? 1 : 0,
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
        willChange: "transform, opacity",
      }}
    >
      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>
        <ul
          ref={listRef}
          className="hide-scrollbar"
          style={{
            display:        "flex",
            gap:            "0",
            listStyle:      "none",
            margin:         "0",
            padding:        "0",
            overflowX:      "auto",
            position:       "relative",
          }}
        >
          {/* sliding pill */}
          <span
            ref={pillRef}
            aria-hidden="true"
          style={{
            position:     "absolute",
            bottom:       "0",
            height:       "2px",
            background:   "#fff",
            borderRadius: "2px 2px 0 0",
            transition:   "left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)",
            boxShadow:    "0 0 12px rgba(255,255,255,0.5)",
          }}
          />

          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id} style={{ flexShrink: 0 }}>
              <button
                type="button"
                data-id={id}
                onClick={() => scrollTo(id)}
                aria-current={active === id ? "true" : undefined}
                style={{
                  background:     "transparent",
                  border:         "none",
                  cursor:         "pointer",
                  padding:        "0 1.25rem",
                  height:         "48px",
                  display:        "flex",
                  alignItems:     "center",
                  fontSize:       "12px",
                  fontWeight:     active === id ? "700" : "500",
                  letterSpacing:  "0.06em",
                  textTransform:  "uppercase",
                  fontFamily:     "var(--font-head)",
                  color:          active === id ? "#fff" : "rgba(240,246,255,0.4)",
                  transition:     "color 0.2s ease",
                  whiteSpace:     "nowrap",
                }}
                onMouseEnter={e => {
                  if (active !== id)
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,246,255,0.75)";
                }}
                onMouseLeave={e => {
                  if (active !== id)
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,246,255,0.45)";
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
