"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  selector?: string;
  delay?: number;
  stagger?: number;
  y?: number;
};

/** Stagger children (or matched selector) into view with GSAP. */
export function Stagger({
  children,
  className,
  selector = "[data-stagger-item]",
  delay = 0,
  stagger = MOTION.stagger,
  y = 24,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const items = root.querySelectorAll(selector);
    if (!items.length) return;

    const gsap = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.72,
          delay,
          stagger: {
            each: stagger,
            from: "start",
            ease: "power1.out",
          },
          ease: MOTION.easeOut,
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: {
            trigger: root,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [delay, selector, stagger, y]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
