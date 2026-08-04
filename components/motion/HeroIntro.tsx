"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils/cn";

type HeroIntroProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Above-the-fold entrance. Keeps content readable without forced opacity:0 CSS.
 * Uses a short delayed timeline so first paint can still contribute to LCP.
 */
export function HeroIntro({ children, className }: HeroIntroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const gsap = getGsap();
    const title = root.querySelector("[data-hero-title]");
    const media = root.querySelector("[data-hero-media]");
    const meta = root.querySelectorAll("[data-hero-meta]");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.08,
      });

      if (title) {
        tl.fromTo(
          title,
          { y: 48, autoAlpha: 0.001 },
          { y: 0, autoAlpha: 1, duration: 1.05 },
          0,
        );
      }
      if (meta.length) {
        tl.fromTo(
          meta,
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06 },
          0.15,
        );
      }
      if (media) {
        tl.fromTo(
          media,
          { y: 56, scale: 0.97, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 1.1 },
          0.2,
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
