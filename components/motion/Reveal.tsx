"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { getGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /**
   * `scroll` — play when entering viewport (default, below-fold).
   * `mount` — play once on mount (above-fold; never hide-on-scroll).
   */
  mode?: "scroll" | "mount";
};

/**
 * Soft fade/rise. Initial hide is CSS-only (`.motion-reveal`) so we never
 * flash visible content then yank it away when GSAP boots.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = MOTION.revealY,
  mode = "scroll",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add("motion-shown");
      return;
    }

    const gsap = getGsap();
    let tween: { kill: () => void } | undefined;
    let trigger: ScrollTrigger | undefined;

    const play = () => {
      if (el.classList.contains("motion-shown")) return;

      // Match CSS starting pose, then ease in — never re-hide after this.
      gsap.set(el, { opacity: 0, y, force3D: true });
      tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: MOTION.revealDuration,
        delay,
        ease: MOTION.easeOut,
        overwrite: "auto",
        onComplete: () => {
          el.classList.add("motion-shown");
          gsap.set(el, { clearProps: "opacity,transform" });
        },
      });
    };

    const ctx = gsap.context(() => {
      if (mode === "mount") {
        play();
        return;
      }

      trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: play,
      });

      // Already on screen at load → reveal without waiting for a scroll event
      if (trigger.isActive || isInViewport(el)) {
        play();
      }
    }, el);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      tween?.kill();
      trigger?.kill();
      ctx.revert();
    };
  }, [delay, mode, y]);

  return (
    <div
      ref={ref}
      className={cn(
        mode === "scroll" && "motion-reveal",
        mode === "mount" && "motion-reveal",
        className,
      )}
    >
      {children}
    </div>
  );
}

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh * 0.92 && rect.bottom > 0;
}
