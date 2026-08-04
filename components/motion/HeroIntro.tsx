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
 * Above-the-fold entrance only. Soft rise; featured media stays opaque (LCP).
 */
export function HeroIntro({ children, className }: HeroIntroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const gsap = getGsap();
    const title = root.querySelector<HTMLElement>("[data-hero-title]");
    const media = root.querySelector<HTMLElement>("[data-hero-media]");
    const meta = root.querySelectorAll<HTMLElement>("[data-hero-meta]");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: MOTION.easeOut },
        delay: 0.04,
      });

      if (title) {
        gsap.set(title, { opacity: 0, y: 28 });
        tl.to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: MOTION.heroTitleDuration,
            clearProps: "opacity,transform",
          },
          0,
        );
      }
      if (meta.length) {
        gsap.set(meta, { opacity: 0, y: 10 });
        tl.to(
          meta,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            clearProps: "opacity,transform",
          },
          0.1,
        );
      }
      if (media) {
        // Transform only — keep LCP pixels painted
        gsap.set(media, { y: 28 });
        tl.to(
          media,
          {
            y: 0,
            duration: MOTION.heroMediaDuration,
            clearProps: "transform",
          },
          0.14,
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
