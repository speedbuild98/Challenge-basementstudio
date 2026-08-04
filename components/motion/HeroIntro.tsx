"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

type HeroIntroProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Above-the-fold entrance. LCP media keeps opacity ≈1 (transform-only);
 * title uses a soft rise. Respects reduced motion.
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
        defaults: { ease: MOTION.easeOut },
        delay: 0.06,
      });

      if (title) {
        tl.fromTo(
          title,
          { y: 40, autoAlpha: 0.001 },
          {
            y: 0,
            autoAlpha: 1,
            duration: MOTION.heroTitleDuration,
            clearProps: "transform",
          },
          0,
        );
      }
      if (meta.length) {
        tl.fromTo(
          meta,
          { y: 12, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.05,
            clearProps: "transform",
          },
          0.12,
        );
      }
      if (media) {
        // Transform-only so LCP image stays painted (avoids opacity fade on LCP).
        tl.fromTo(
          media,
          { y: 48, scale: 0.975 },
          {
            y: 0,
            scale: 1,
            duration: MOTION.heroMediaDuration,
            clearProps: "transform",
          },
          0.18,
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
