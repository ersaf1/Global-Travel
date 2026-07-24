"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu, Sparkles, Map, Zap, Send,
  Minus, Maximize2, CheckCircle2,
} from "lucide-react";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

/*    AI Response text                                           */
const AI_RESPONSE =
  `Perfect! I've crafted your Japan itinerary. Here's a preview:

Tokyo (4 days)   Tsukiji market, Shinjuku, Harajuku
Kyoto (3 days)   Fushimi Inari, Arashiyama, tea ceremony
Osaka (3 days)   Dotonbori, street food tour, day trip to Nara

Estimated cost: $3,840   Within budget`;

const USER_MESSAGE =
  "Plan a 10-day Japan trip for 2 people, budget $4000, love culture and food";

/*    Sequence phases                                             */
type Phase = "idle" | "user" | "thinking" | "typing" | "done";

/*    Feature list                                                */
const FEATURES = [
  {
    Icon: Sparkles,
    title: "Personalized recommendations",
    body: "Based on your travel style, past trips, and wishlist.",
  },
  {
    Icon: Map,
    title: "Complete day-by-day itineraries",
    body: "Every detail planned   transport, meals, bookings.",
  },
  {
    Icon: Zap,
    title: "Instant booking",
    body: "Flights, hotels and experiences confirmed in seconds.",
  },
];

/*    Suggested prompts                                           */
const SUGGESTED = [
  "10 days in Japan",
  "Solo trip to Iceland",
  "Family vacation Bali",
  "Weekend in Paris",
];

/*    Action chips (shown after response)                        */
const ACTION_CHIPS = [
  "View Full Itinerary",
  "Book Now",
  "Modify Plan",
];

/*    Thinking dots                                               */
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5" aria-label="AI is thinking" role="status">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="rounded-full"
          style={{
            width: "7px",
            height: "7px",
            background: "rgba(30,142,232,0.70)",
            display: "inline-block",
            animation: `thinking-bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes thinking-bounce {
          0%, 80%, 100% { transform: translateY(0);   opacity: 0.5; }
          40%            { transform: translateY(-6px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}

/*    AI Demo panel                                               */
function AIDemoPanel() {
  const [phase,        setPhase]        = useState<Phase>("idle");
  const [typedReply,   setTypedReply]   = useState("");
  const [showChips,    setShowChips]    = useState(false);
  const [inputVal,     setInputVal]     = useState("");
  const [minimized,    setMinimized]    = useState(false);
  const chatBottomRef                   = useRef<HTMLDivElement>(null);
  const timerRef                        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef                     = useRef<ReturnType<typeof setInterval> | null>(null);
  const charRef                         = useRef(0);

  const clearTimers = useCallback(() => {
    if (timerRef.current)    clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const runDemo = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setTypedReply("");
    setShowChips(false);
    charRef.current = 0;

    /* Step 1   show user bubble */
    timerRef.current = setTimeout(() => {
      setPhase("user");

      /* Step 2   show thinking after 0.5s */
      timerRef.current = setTimeout(() => {
        setPhase("thinking");

        /* Step 3   start typing after 1.5s */
        timerRef.current = setTimeout(() => {
          setPhase("typing");
          charRef.current = 0;

          intervalRef.current = setInterval(() => {
            charRef.current++;
            setTypedReply(AI_RESPONSE.slice(0, charRef.current));

            if (charRef.current >= AI_RESPONSE.length) {
              clearInterval(intervalRef.current!);
              intervalRef.current = null;

              /* Step 4   show chips */
              timerRef.current = setTimeout(() => {
                setShowChips(true);
                setPhase("done");

                /* Step 5   reset and loop after 4s */
                timerRef.current = setTimeout(() => {
                  runDemo();
                }, 4000);
              }, 400);
            }
          }, 25);

        }, 1500);
      }, 500);
    }, 200);
  }, [clearTimers]);

  /* Auto-start on mount */
  useEffect(() => {
    const startTimer = setTimeout(runDemo, 800);
    return () => {
      clearTimeout(startTimer);
      clearTimers();
    };
  }, [runDemo, clearTimers]);

  /* Scroll to bottom as text types */
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [typedReply, phase]);

  return (
    <div
      className="relative"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "var(--r-xl)",
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(30,142,232,0.10)",
      }}
      role="region"
      aria-label="NOVA AI demo"
    >

      {/* Panel header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "0.9rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent) 0%, #0a6bb5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            <Cpu size={13} style={{ color: "#fff" }} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--text-inv)",
              letterSpacing: "0.04em",
            }}
          >
            NOVA AI
          </span>
          {/* Online indicator */}
          <span className="flex items-center gap-1.5">
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px rgba(34,197,94,0.6)",
                display: "inline-block",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                color: "rgba(34,197,94,0.85)",
                fontWeight: 500,
              }}
            >
              Online
            </span>
          </span>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMinimized(v => !v)}
            className="flex items-center justify-center transition-opacity hover:opacity-60"
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.07)",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={minimized ? "Expand panel" : "Minimize panel"}
          >
            {minimized
              ? <Maximize2 size={11} style={{ color: "rgba(255,255,255,0.55)" }} />
              : <Minus     size={11} style={{ color: "rgba(255,255,255,0.55)" }} />
            }
          </button>
        </div>
      </div>

      {/* Chat area */}
      {!minimized && (
        <>
          <div
            style={{
              minHeight: "340px",
              maxHeight: "360px",
              overflowY: "auto",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(30,142,232,0.3) transparent",
            }}
            aria-live="polite"
            aria-label="Chat conversation"
          >

            {/* Welcome system message */}
            <div className="flex justify-center">
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  color: "rgba(240,246,255,0.28)",
                  background: "rgba(255,255,255,0.04)",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                Today   NOVA AI Session
              </span>
            </div>

            {/* User bubble */}
            {(phase === "user" || phase === "thinking" || phase === "typing" || phase === "done") && (
              <div className="flex justify-end">
                <div
                  style={{
                    maxWidth: "82%",
                    background: "linear-gradient(135deg, var(--accent) 0%, #0a6bb5 100%)",
                    borderRadius: "16px 16px 4px 16px",
                    padding: "0.7rem 1rem",
                    boxShadow: "0 4px 16px rgba(30,142,232,0.35)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "#fff",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {USER_MESSAGE}
                  </p>
                </div>
              </div>
            )}

            {/* Thinking dots */}
            {phase === "thinking" && (
              <div className="flex items-start gap-2.5">
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent) 0%, #0a6bb5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <Cpu size={12} style={{ color: "#fff" }} />
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "4px 16px 16px 16px",
                    padding: "0.75rem 1rem",
                  }}
                >
                  <ThinkingDots />
                </div>
              </div>
            )}

            {/* AI typed response */}
            {(phase === "typing" || phase === "done") && typedReply.length > 0 && (
              <div className="flex items-start gap-2.5">
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent) 0%, #0a6bb5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                  aria-hidden="true"
                >
                  <Cpu size={12} style={{ color: "#fff" }} />
                </div>
                <div
                  style={{
                    maxWidth: "86%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "4px 16px 16px 16px",
                    padding: "0.875rem 1rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "var(--text-inv2)",
                      lineHeight: 1.7,
                      margin: 0,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {typedReply}
                    {phase === "typing" && (
                      <span
                        style={{
                          display: "inline-block",
                          width: "2px",
                          height: "13px",
                          background: "var(--accent)",
                          marginLeft: "2px",
                          verticalAlign: "text-bottom",
                          animation: "thinking-cursor-blink 0.8s step-end infinite",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </p>

                  {/* Action chips */}
                  {showChips && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      {ACTION_CHIPS.map(chip => (
                        <button
                          key={chip}
                          type="button"
                          className="flex items-center gap-1.5 transition-all hover:opacity-80"
                          style={{
                            padding: "0.35rem 0.75rem",
                            borderRadius: "999px",
                            background: "rgba(30,142,232,0.12)",
                            border: "1px solid rgba(30,142,232,0.30)",
                            fontFamily: "var(--font-head)",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "var(--accent)",
                            cursor: "pointer",
                            letterSpacing: "0.04em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <CheckCircle2 size={11} aria-hidden="true" />
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div ref={chatBottomRef} aria-hidden="true" />
          </div>

          {/* Cursor-blink keyframe */}
          <style>{`
            @keyframes thinking-cursor-blink {
              0%, 100% { opacity: 1; }
              50%       { opacity: 0; }
            }
          `}</style>

          {/* Suggested prompts */}
          <div
            style={{
              padding: "0 1.25rem 0.75rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {SUGGESTED.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setInputVal(s)}
                className="transition-all hover:opacity-80"
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  color: "rgba(240,246,255,0.45)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                aria-label={`Use prompt: ${s}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input bar */}
          <div
            style={{
              padding: "0.875rem 1.25rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Ask NOVA anything..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "var(--r-md)",
                padding: "0.6rem 0.875rem",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--text-inv)",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = "rgba(30,142,232,0.45)";
                e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(30,142,232,0.12)";
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                e.currentTarget.style.boxShadow   = "none";
              }}
              aria-label="Message NOVA AI"
            />
            <button
              type="button"
              className="btn-primary flex items-center justify-center shrink-0"
              style={{
                width: "38px",
                height: "38px",
                padding: 0,
                borderRadius: "var(--r-md)",
                flexShrink: 0,
              }}
              aria-label="Send message"
            >
              <Send size={14} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/*    Main export                                                 */
export function AIPlanner() {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      /* Left column slides in */
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0,
          duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      /* Right panel slides in */
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0,
          duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      /* Feature items stagger */
      if (featuresRef.current) {
        gsap.fromTo(
          Array.from(featuresRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.55, stagger: 0.12, ease: "power3.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ai-planner"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, var(--surface-0) 0%, var(--surface-2) 100%)",
        padding: "var(--sec) 0",
      }}
      aria-label="NOVA AI Planner"
    >
      <div style={{ maxWidth: "var(--wrap)", margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          className="grid gap-14 items-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          }}
        >

          {/*    LEFT: Text + features                               */}
          <div ref={leftRef} style={{ opacity: 0 }}>

            {/* Badge */}
            <div
              className="glass inline-flex items-center gap-2 mb-6"
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "999px",
                border: "1px solid rgba(30,142,232,0.30)",
                background: "rgba(30,142,232,0.08)",
              }}
            >
              <Cpu size={13} style={{ color: "var(--accent)" }} aria-hidden="true" />
              <span
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                Nova AI
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-section text-white mb-5"
              style={{
                fontFamily: "var(--font-head)",
                lineHeight: 1.15,
                maxWidth: "18ch",
              }}
            >
              Your intelligent travel companion
            </h2>

            {/* Body */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.9rem, 1.4vw, 1.0625rem)",
                color: "var(--text-inv2)",
                lineHeight: 1.75,
                maxWidth: "44ch",
                marginBottom: "2.25rem",
              }}
            >
              Describe your perfect trip in plain language. NOVA&apos;s AI understands
              context, budget, timing, and your travel style to craft a personalized journey.
            </p>

            {/* Features */}
            <ul
              ref={featuresRef}
              className="flex flex-col gap-5 mb-8 list-none p-0"
              style={{ margin: "0 0 2rem" }}
            >
              {FEATURES.map(({ Icon, title, body }) => (
                <li key={title} className="flex items-start gap-4">
                  <span
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "var(--r-sm)",
                      background: "rgba(30,142,232,0.10)",
                      border: "1px solid rgba(30,142,232,0.20)",
                      marginTop: "2px",
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={16} style={{ color: "var(--accent)" }} />
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-head)",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--text-inv)",
                        marginBottom: "0.2rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "var(--text-inv3)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="/planner"
              className="btn-primary inline-flex items-center gap-2"
              style={{ height: "52px", fontSize: "14px", borderRadius: "var(--r-md)" }}
            >
              <Sparkles size={15} aria-hidden="true" />
              Try AI Planner
            </a>

          </div>

          {/*    RIGHT: AI demo panel                                  */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            <AIDemoPanel />
          </div>

        </div>
      </div>
    </section>
  );
}
