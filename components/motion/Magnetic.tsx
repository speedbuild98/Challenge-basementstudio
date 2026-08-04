"use client";

import {
  useLayoutEffect,
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils/cn";

type MagneticProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  strength?: number;
};

/** Subtle magnetic pull toward the cursor — desktop only. */
export function Magnetic({
  children,
  className,
  strength = 18,
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const gsap = getGsap();
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      xTo((relX / rect.width) * strength);
      yTo((relY / rect.height) * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)} {...rest}>
      {children}
    </div>
  );
}
