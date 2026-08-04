"use client";

import {
  useLayoutEffect,
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

type MagneticProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  strength?: number;
};

/** Subtle magnetic pull toward the cursor — desktop fine-pointer only. */
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
    const xTo = gsap.quickTo(el, "x", {
      duration: MOTION.magneticDuration,
      ease: MOTION.easeSoft,
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: MOTION.magneticDuration,
      ease: MOTION.easeSoft,
    });
    const scaleTo = gsap.quickTo(el, "scale", {
      duration: 0.35,
      ease: MOTION.easeSoft,
    });

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      xTo((relX / rect.width) * strength);
      yTo((relY / rect.height) * strength);
      scaleTo(1.03);
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: MOTION.magneticReturn,
        ease: "elastic.out(1, 0.45)",
        overwrite: true,
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
