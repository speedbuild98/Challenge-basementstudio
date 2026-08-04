"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { getGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
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

/**
 * Each `[data-stagger-item]` fades in when *it* enters view.
 * CSS owns the initial hide; JS only animates forward once.
 */
export function Stagger({
  children,
  className,
  selector = "[data-stagger-item]",
  delay = 0,
  stagger = MOTION.stagger,
  y = MOTION.revealY,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!items.length) return;

    if (prefersReducedMotion()) {
      items.forEach((item) => item.classList.add("motion-shown"));
      return;
    }

    const gsap = getGsap();
    const revealed = new WeakSet<HTMLElement>();

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          const fresh = batch.filter((el) => {
            const node = el as HTMLElement;
            if (revealed.has(node) || node.classList.contains("motion-shown")) {
              return false;
            }
            revealed.add(node);
            return true;
          });
          if (!fresh.length) return;

          gsap.set(fresh, { opacity: 0, y, force3D: true });
          gsap.to(fresh, {
            opacity: 1,
            y: 0,
            duration: MOTION.staggerDuration,
            delay,
            stagger: { each: stagger, from: "start" },
            ease: MOTION.easeOut,
            overwrite: "auto",
            onComplete: () => {
              fresh.forEach((el) => {
                (el as HTMLElement).classList.add("motion-shown");
                gsap.set(el, { clearProps: "opacity,transform" });
              });
            },
          });
        },
      });
    }, root);

    const onLoad = () => ScrollTrigger.refresh();
    requestAnimationFrame(() => ScrollTrigger.refresh());
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [delay, selector, stagger, y]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
