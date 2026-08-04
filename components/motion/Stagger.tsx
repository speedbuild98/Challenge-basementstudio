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
  /**
   * Bump when the item list changes (e.g. Load more) so new nodes get bound.
   * Already-shown items keep `.motion-shown` and stay visible.
   */
  watch?: number | string;
};

/**
 * Each `[data-stagger-item]` fades in when *it* enters view.
 * CSS owns the initial hide; JS only animates forward once.
 * Re-runs for newly mounted items when `watch` changes.
 */
export function Stagger({
  children,
  className,
  selector = "[data-stagger-item]",
  delay = 0,
  stagger = MOTION.stagger,
  y = MOTION.revealY,
  watch,
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

    const pending = items.filter((el) => !el.classList.contains("motion-shown"));
    if (!pending.length) return;

    const gsap = getGsap();
    const revealing = new Set<HTMLElement>();

    const reveal = (batch: Element[]) => {
      const fresh = (batch as HTMLElement[]).filter(
        (el) => !el.classList.contains("motion-shown") && !revealing.has(el),
      );
      if (!fresh.length) return;
      fresh.forEach((el) => revealing.add(el));

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
            revealing.delete(el);
            el.classList.add("motion-shown");
            gsap.set(el, { clearProps: "opacity,transform" });
          });
        },
      });
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(pending, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => reveal(batch),
      });
    }, root);

    // Load more / already in view — don't wait for another scroll tick
    const playIfVisible = () => {
      const vh = window.innerHeight || 0;
      const inView = pending.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < vh * 0.98 && rect.bottom > 0;
      });
      if (inView.length) reveal(inView);
      ScrollTrigger.refresh();
    };

    const raf = requestAnimationFrame(playIfVisible);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [delay, selector, stagger, watch, y]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
