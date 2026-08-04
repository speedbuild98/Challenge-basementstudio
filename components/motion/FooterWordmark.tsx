"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Figma wordmark:
 * Mobile 158:4664 — ~414×58, bleed -3px, gradient #000→#434343 + progressive blur
 * Desktop 19:1096 — ~1378×193
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const gsap = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 56, autoAlpha: 0.35 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 98%",
            end: "top 55%",
            scrub: 0.6,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 top-0 select-none md:relative md:inset-auto"
      aria-hidden
    >
      <Image
        src="/brand/basement-wordmark.svg"
        alt=""
        width={1378}
        height={193}
        className="h-[58px] w-[106%] max-w-none -translate-x-[1%] object-fill md:h-auto md:w-full md:max-w-full md:translate-x-0 md:object-contain"
        priority={false}
      />
    </div>
  );
}
