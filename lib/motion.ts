/** Shared motion tuning — Basement-like: snappy ease-out, short travel. */

export const MOTION = {
  easeOut: "power4.out",
  easeSoft: "power3.out",
  easeInOut: "sine.inOut",
  easeIn: "power2.in",
  // Entrance
  revealDuration: 0.85,
  revealY: 32,
  stagger: 0.07,
  // Hero
  heroTitleDuration: 1.05,
  heroMediaDuration: 1,
  // Magnetic
  magneticDuration: 0.55,
  magneticReturn: 0.7,
} as const;
