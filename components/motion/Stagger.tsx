"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";
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
  stagger = 0.08,
  y = 28,
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
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
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
