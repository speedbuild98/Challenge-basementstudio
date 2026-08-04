/** Shared motion tuning — soft, short travel, no “pop”. */

export const MOTION = {
  easeOut: "power3.out",
  easeSoft: "power2.out",
  easeInOut: "sine.inOut",
  easeIn: "power2.in",
  // Scroll reveals — subtle rise + fade
  revealDuration: 0.75,
  revealY: 20,
  stagger: 0.08,
  staggerDuration: 0.7,
  // Hero (mount only)
  heroTitleDuration: 0.95,
  heroMediaDuration: 0.9,
  // Magnetic
  magneticDuration: 0.5,
  magneticReturn: 0.65,
} as const;
