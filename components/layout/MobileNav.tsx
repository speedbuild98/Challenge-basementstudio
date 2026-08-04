"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/types/content";

type MobileNavProps = {
  items: NavItem[];
  activeHref?: string;
};

/** Figma Main Button: h-36 · px-32 · radius 8 · mono 14 */
const menuButtonClass =
  "inline-flex h-9 min-h-9 items-center justify-center rounded-lg px-8 font-mono text-[length:var(--text-meta)] font-medium uppercase leading-[1.4] tracking-[var(--tracking-meta)] transition-colors duration-[var(--duration-fast)] [font-weight:var(--font-weight-medium)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";

export function MobileNav({ items, activeHref = "/" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setRendered(true);
  }, [open]);

  useLayoutEffect(() => {
    if (!rendered || !panelRef.current || !contentRef.current) return;

    const gsap = getGsap();
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const content = contentRef.current;
    const links = content.querySelectorAll<HTMLElement>("[data-nav-item]");
    const reduced = prefersReducedMotion();

    gsap.killTweensOf([panel, backdrop, content, links]);

    if (open) {
      if (reduced) {
        gsap.set(panel, { autoAlpha: 1 });
        gsap.set(backdrop, { autoAlpha: 1 });
        gsap.set(content, { autoAlpha: 1, y: 0 });
        gsap.set(links, { autoAlpha: 1, y: 0 });
        closeRef.current?.focus();
        return;
      }

      gsap.set(panel, { autoAlpha: 1 });
      gsap.set(backdrop, { autoAlpha: 0 });
      gsap.set(content, { autoAlpha: 0, y: 20, scale: 0.985 });
      gsap.set(links, { autoAlpha: 0, y: 14 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => closeRef.current?.focus(),
      });
      tl.to(backdrop, { autoAlpha: 1, duration: 0.32 }, 0)
        .to(
          content,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.42 },
          0.04,
        )
        .to(
          links,
          { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.05 },
          0.14,
        );
      return () => {
        tl.kill();
      };
    }

    // Closing
    if (reduced) {
      setRendered(false);
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.in" },
      onComplete: () => {
        if (!openRef.current) setRendered(false);
      },
    });
    tl.to(links, { autoAlpha: 0, y: -10, duration: 0.14, stagger: 0.025 }, 0)
      .to(
        content,
        { autoAlpha: 0, y: -14, scale: 0.99, duration: 0.22 },
        0.03,
      )
      .to(backdrop, { autoAlpha: 0, duration: 0.24 }, 0.05);

    return () => {
      tl.kill();
    };
  }, [open, rendered]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = openerRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      const panel = panelRef.current;
      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      previouslyFocused?.focus();
    };
  }, [open]);

  const panel =
    rendered && mounted
      ? createPortal(
          <div
            ref={panelRef}
            className="fixed inset-0 z-[100] opacity-0"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            id={panelId}
          >
            <div
              ref={backdropRef}
              className="absolute inset-0 bg-black/95 opacity-0 backdrop-blur-sm"
              aria-hidden
            />

            <div
              ref={contentRef}
              className="relative flex h-full flex-col overflow-y-auto overscroll-contain px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] opacity-0"
            >
              {/* Top chrome — mirrors Mobile Nav Bar proportions */}
              <div className="flex h-10 items-center justify-between rounded-[10px] bg-gradient-to-r from-[var(--color-nav-to)] to-[var(--color-nav-from)] py-2 pl-2 pr-2 backdrop-blur-md">
                <Link
                  href="/"
                  className="relative block h-[38px] w-[102px] shrink-0"
                  aria-label="basement. home"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src="/brand/basement-logo.svg"
                    alt=""
                    fill
                    className="object-contain object-left"
                  />
                </Link>
                <button
                  ref={closeRef}
                  type="button"
                  className={cn(
                    menuButtonClass,
                    "bg-[#2e2e2e] text-[#e6e6e6] hover:bg-[#3a3a3a]",
                  )}
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>

              <nav aria-label="Mobile primary" className="mt-8 flex-1 px-1">
                <ul className="flex flex-col">
                  {items.map((item) => {
                    const active =
                      item.href === activeHref ||
                      (item.label.toLowerCase() === "blog" &&
                        activeHref === "/");
                    return (
                      <li key={`${item.label}-${item.href}`}>
                        <Link
                          href={item.href}
                          data-nav-item
                          className={cn(
                            "block py-3 font-sans text-2xl font-semibold leading-[1.15] tracking-[-0.02em] transition-colors [font-weight:var(--font-weight-semibold)]",
                            active
                              ? "text-orange"
                              : "text-[#e6e6e6] hover:text-orange",
                          )}
                          onClick={() => setOpen(false)}
                          {...(item.href.startsWith("http")
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                        >
                          {item.label}
                          {item.href.startsWith("http") ? (
                            <span className="sr-only">
                              {" "}
                              (opens in a new tab)
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6" data-nav-item>
                  {/* Main Button proportions · orange so it reads on black */}
                  <Link
                    href="#contact"
                    className={cn(
                      menuButtonClass,
                      "bg-orange text-black hover:brightness-110",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </nav>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="lg:hidden">
      <button
        ref={openerRef}
        type="button"
        className="relative z-10 inline-flex min-h-11 min-w-11 items-center justify-center"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {/* Figma 155:4349 — 40×~10 hamburger */}
        <span className="relative flex h-[10px] w-10 flex-col justify-between" aria-hidden>
          <span
            className={cn(
              "block h-px w-full origin-center bg-[#e6e6e6] transition-transform duration-300 ease-[var(--ease-out)]",
              open && "translate-y-[4.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-full bg-[#e6e6e6] transition-opacity duration-200",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-px w-full origin-center bg-[#e6e6e6] transition-transform duration-300 ease-[var(--ease-out)]",
              open && "-translate-y-[4.5px] -rotate-45",
            )}
          />
        </span>
      </button>
      {panel}
    </div>
  );
}
