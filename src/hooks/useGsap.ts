"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade-up reveal on scroll for a single container ref.
 * Children with data-reveal get staggered.
 */
export function useGsapReveal(options?: {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const targets = el.querySelectorAll("[data-reveal]");

    const ctx = gsap.context(() => {
      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: options?.y ?? 32 },
          {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 0.75,
            stagger: options?.stagger ?? 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options?.start ?? "top 85%",
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y: options?.y ?? 32 },
          {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options?.start ?? "top 85%",
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [options?.y, options?.duration, options?.stagger, options?.start]);

  return ref;
}

/**
 * Smooth parallax on scroll for an element (e.g. hero image).
 */
export function useGsapParallax(strength: number = 0.2) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: strength * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [strength]);

  return ref;
}

/**
 * Stagger reveal for a list of card elements by CSS selector.
 */
export function useGsapStagger(
  selector: string,
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  }
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: options?.y ?? 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options?.duration ?? 0.65,
          stagger: options?.stagger ?? 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? "top 80%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [selector, options?.y, options?.duration, options?.stagger, options?.start]);

  return ref;
}
