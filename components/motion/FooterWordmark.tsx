"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const gsap = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 48, autoAlpha: 0.35 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "bottom 70%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative mt-16 select-none" aria-hidden>
      <Image
        src="/brand/basement-wordmark.svg"
        alt=""
        width={1378}
        height={193}
        className="h-auto w-full opacity-90"
        priority={false}
      />
    </div>
  );
}
