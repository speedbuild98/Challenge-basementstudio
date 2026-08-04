"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * GSAP scroll reveal. Content stays in the document for SEO;
 * animation enhances after mount and respects reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = MOTION.revealY,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const gsap = getGsap();
    const ctx = gsap.context(() => {
      // immediateRender:false keeps SSR/SEO content visible until the trigger fires
      gsap.fromTo(
        el,
        { autoAlpha: 0, y, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: MOTION.revealDuration,
          delay,
          ease: MOTION.easeOut,
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: once
            ? {
                trigger: el,
                start: "top 90%",
                once: true,
              }
            : {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, once, y]);

  return (
    <div ref={ref} className={cn("will-change-[transform,opacity]", className)}>
      {children}
    </div>
  );
}
