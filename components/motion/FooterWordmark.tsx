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
      // Translate only — never fade out (autoAlpha was hiding the mark).
      gsap.fromTo(
        el,
        { y: 40 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 60%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative mt-14 select-none md:mt-[4.5rem]"
      aria-hidden
    >
      <Image
        src="/brand/basement-wordmark.svg"
        alt=""
        width={1378}
        height={193}
        className="h-auto w-full opacity-[0.55]"
        priority={false}
      />
    </div>
  );
}
