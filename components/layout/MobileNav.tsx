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
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-9 items-center rounded-lg bg-black px-3 font-mono text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-meta)] text-white"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        Menu
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/95 p-4" role="dialog" aria-modal="true" aria-label="Mobile navigation" id={panelId}>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-white">basement.</p>
            <button
              ref={closeRef}
              type="button"
              className="rounded-lg bg-dark-grey px-3 py-2 font-mono text-[length:var(--text-meta)] uppercase text-white"
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
                        "block py-3 text-2xl font-semibold",
                        active ? "text-orange" : "text-white",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-8">
            <Button href="#contact" variant="accent" onClick={() => setOpen(false)}>
              Contact us
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
