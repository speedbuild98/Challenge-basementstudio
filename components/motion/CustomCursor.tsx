"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

/**
 * Editorial cursor tuned to this site (not a basement.studio clone):
 * orange core + glass ring, lag on the ring, grow on interactive, orange click pulse.
 * Desktop / fine pointer only.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useLayoutEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      const ok = fine.matches && !prefersReducedMotion();
      setEnabled(ok);
      document.documentElement.classList.toggle("has-custom-cursor", ok);
    };
    const frame = requestAnimationFrame(sync);
    fine.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      fine.removeEventListener("change", sync);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useLayoutEffect(() => {
    if (!enabled || !rootRef.current || !ringRef.current || !dotRef.current) {
      return;
    }

    const gsap = getGsap();
    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const pulse = pulseRef.current;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, x: -80, y: -80 });
    if (pulse) {
      gsap.set(pulse, {
        xPercent: -50,
        yPercent: -50,
        x: -80,
        y: -80,
        scale: 0,
        opacity: 0,
      });
    }

    // Dot tracks tight; ring lags — glass “halo” feel
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let hovering = false;
    let pressing = false;
    let visible = false;

    const applyRingState = () => {
      const scale = pressing ? (hovering ? 0.85 : 0.7) : hovering ? 1.65 : 1;
      const border = hovering ? "rgba(255, 77, 0, 0.85)" : "rgba(230, 230, 230, 0.45)";
      const bg = hovering ? "rgba(255, 77, 0, 0.08)" : "rgba(230, 230, 230, 0.04)";

      gsap.to(ring, {
        scale,
        borderColor: border,
        backgroundColor: bg,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: pressing ? 0.55 : hovering ? 0 : 1,
        opacity: hovering && !pressing ? 0 : 1,
        duration: 0.28,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(root, { autoAlpha: 1, duration: 0.18, overwrite: true });
    };

    const hide = () => {
      visible = false;
      hovering = false;
      pressing = false;
      gsap.to(root, { autoAlpha: 0, duration: 0.18, overwrite: true });
      gsap.set(ring, {
        scale: 1,
        borderColor: "rgba(230, 230, 230, 0.45)",
        backgroundColor: "rgba(230, 230, 230, 0.04)",
      });
      gsap.set(dot, { scale: 1, opacity: 1 });
    };

    const onMove = (event: MouseEvent) => {
      show();
      const { clientX: x, clientY: y } = event;
      dotX(x);
      dotY(y);
      ringX(x);
      ringY(y);
      if (pulse) gsap.set(pulse, { x, y });
    };

    const isHoverable = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest(HOVER_SELECTOR));

    const onOver = (event: MouseEvent) => {
      const next = isHoverable(event.target);
      if (next === hovering) return;
      hovering = next;
      applyRingState();
    };

    const onDown = (event: MouseEvent) => {
      pressing = true;
      applyRingState();

      if (pulse) {
        gsap.killTweensOf(pulse);
        gsap.set(pulse, {
          x: event.clientX,
          y: event.clientY,
          scale: 0.4,
          opacity: 0.5,
        });
        gsap.to(pulse, {
          scale: 2.2,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const onUp = () => {
      pressing = false;
      applyRingState();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
    };
  }, [enabled]);

  if (!enabled) return null;

  return createPortal(
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0"
      aria-hidden
    >
      {/* Orange click pulse */}
      <div
        ref={pulseRef}
        className="fixed top-0 left-0 size-12 rounded-full border border-orange/80"
      />

      {/* Glass ring — lags behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 size-9 rounded-full border border-[#e6e6e6]/45 bg-[#e6e6e6]/[0.04] shadow-[inset_0_0.5px_0_rgb(255_255_255/0.25)] backdrop-blur-[2px] will-change-transform"
      />

      {/* Orange core — snappy */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 size-1.5 rounded-full bg-orange shadow-[0_0_12px_rgb(255_77_0/0.45)] will-change-transform"
      />
    </div>,
    document.body,
  );
}
