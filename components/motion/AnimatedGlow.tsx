"use client";

import { useLayoutEffect, useRef } from "react";

import { OrangeGlow } from "@/components/layout/OrangeGlow";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils/cn";

type AnimatedGlowProps = {
  className?: string;
};

/** Full-bleed glow layer — must stay `absolute inset-0` so GSAP scale has a real box. */
export function AnimatedGlow({ className }: AnimatedGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const gsap = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scale: 1.04,
        opacity: 0.92,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
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
