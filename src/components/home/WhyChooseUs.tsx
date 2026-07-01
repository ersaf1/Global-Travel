"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Choose Your Destination",
    description: "Browse thousands of curated destinations worldwide.",
  },
  {
    number: "02",
    title: "Plan Your Itinerary",
    description: "Build day-by-day itineraries with activities, hotels, and transport.",
  },
  {
    number: "03",
    title: "Book & Travel",
    description: "Book everything in one place with instant confirmation.",
  },
];

const reviews = [
  {
    name: "Sarah Chen",
    avatar: "SC",
    rating: 5,
    text: "Best travel platform I've ever used!",
    location: "Bali, Indonesia",
  },
  {
    name: "Marco Rossi",
    avatar: "MR",
    rating: 5,
    text: "Found hidden gems I never would have discovered.",
    location: "Kyoto, Japan",
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left col slide in from left
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -48 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      // Steps stagger
      const stepEls = stepsRef.current?.querySelectorAll("[data-step]");
      if (stepEls?.length) {
        gsap.fromTo(
          stepEls,
          { opacity: 0, x: -24 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
            scrollTrigger: { trigger: stepsRef.current, start: "top 80%", once: true },
          }
        );
      }

      // Right col slide in from right
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 48 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-white" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — steps */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <h2
              id="why-heading"
              className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Travel smarter,
              <br />
              not harder.
            </h2>
            <p className="text-[#64748B] text-lg leading-relaxed mb-10">
              From inspiration to booking, we make every step effortless.
            </p>

            {/* Steps */}
            <div ref={stepsRef} className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-5" data-step style={{ opacity: 0 }}>
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border-2 border-[#E2E8F0] text-[#0F172A] bg-white"
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/explore"
              className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #15C7E8, #2E9BFF)" }}
            >
              Start Exploring
            </a>
          </div>

          {/* Right — image + floating review cards */}
          <div ref={rightRef} className="relative" style={{ opacity: 0 }}>
            {/* Main image */}
            <div className="relative h-[600px] rounded-[32px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
              <Image
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=85"
                alt="Happy travelers exploring a destination"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.3) 0%, transparent 60%)" }} />
            </div>

            {/* Floating review cards */}
            {reviews.map((review, i) => (
              <div
                key={review.name}
                className={`absolute ${i === 0 ? "-left-6 top-16" : "-right-6 bottom-20"} rounded-2xl p-4 w-56`}
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                }}
              >
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-[#FFD84D] fill-[#FFD84D]" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xs text-[#0F172A] font-medium leading-relaxed mb-3">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #15C7E8, #2E9BFF)" }}
                    aria-hidden="true"
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#0F172A]">{review.name}</p>
                    <div className="flex items-center gap-1">
                      <MapPin size={10} className="text-[#15C7E8]" aria-hidden="true" />
                      <p className="text-[10px] text-[#64748B]">{review.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Stats badge */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5 px-7 py-4 rounded-2xl whitespace-nowrap"
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                border: "1px solid rgba(255,255,255,0.9)",
              }}
            >
              {[
                { value: "50K+", label: "Travelers" },
                { value: "190+", label: "Countries" },
                { value: "4.9★", label: "Rating" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-base font-bold text-[#0F172A]" style={{ fontFamily: "Poppins, sans-serif" }}>{stat.value}</p>
                  <p className="text-xs text-[#64748B]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
