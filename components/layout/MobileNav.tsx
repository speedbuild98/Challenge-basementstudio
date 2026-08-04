"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/types/content";

type MobileNavProps = {
  items: NavItem[];
  activeHref?: string;
};

export function MobileNav({ items, activeHref = "/" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = openerRef.current;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

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
    const header = document.querySelector("header");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    // Keep header interactive only via the dialog itself
    header?.setAttribute("data-nav-open", "true");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      header?.removeAttribute("data-nav-open");
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={openerRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        {/* Figma 155:4349 — 40×9.5 hamburger (hit area 44) */}
        <span className="flex w-10 flex-col gap-[3.5px]" aria-hidden>
          <span className="h-px w-full bg-[#e6e6e6]" />
          <span className="h-px w-full bg-[#e6e6e6]" />
          <span className="h-px w-full bg-[#e6e6e6]" />
        </span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/95 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          id={panelId}
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-white">basement.</p>
            <button
              ref={closeRef}
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-dark-grey px-3 py-2 font-mono text-[length:var(--text-meta)] uppercase text-white"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile primary" className="mt-10">
            <ul className="flex flex-col gap-2">
              {items.map((item) => {
                const active =
                  item.href === activeHref ||
                  (item.label.toLowerCase() === "blog" && activeHref === "/");
                return (
                  <li key={`${item.label}-${item.href}`}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block min-h-11 py-3 text-2xl font-semibold",
                        active ? "text-orange" : "text-white",
                      )}
                      onClick={() => setOpen(false)}
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                      {item.href.startsWith("http") ? (
                        <span className="sr-only"> (opens in a new tab)</span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-8">
            <Button
              href="#contact"
              variant="accent"
              className="min-h-11"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
