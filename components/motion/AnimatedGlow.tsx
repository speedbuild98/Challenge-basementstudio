"use client";

import { useLayoutEffect, useRef } from "react";

import { OrangeGlow } from "@/components/layout/OrangeGlow";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils/cn";

type AnimatedGlowProps = {
  className?: string;
};

/** Ambient orange glow with a slow GSAP breathe. */
export function AnimatedGlow({ className }: AnimatedGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const gsap = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scale: 1.08,
        opacity: 0.85,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn("origin-center will-change-transform", className)}>
      <OrangeGlow />
    </div>
  );
}
