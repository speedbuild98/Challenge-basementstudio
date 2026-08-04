"use client";

import { useLayoutEffect, useRef } from "react";

import { OrangeGlow } from "@/components/layout/OrangeGlow";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

type AnimatedGlowProps = {
  className?: string;
};

/** Full-bleed glow — slow organic drift (scale + slight translate + opacity). */
export function AnimatedGlow({ className }: AnimatedGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const gsap = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(el, {
        keyframes: [
          {
            scale: 1.055,
            xPercent: 1.4,
            yPercent: -1.8,
            opacity: 0.88,
            duration: 6.2,
          },
          {
            scale: 1.02,
            xPercent: -1.1,
            yPercent: 1.2,
            opacity: 1,
            duration: 5.8,
          },
        ],
        ease: MOTION.easeInOut,
        repeat: -1,
        yoyo: true,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 -z-0 origin-[50%_55%] will-change-transform",
        className,
      )}
    >
      <OrangeGlow />
    </div>
  );
}
