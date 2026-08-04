import Link from "next/link";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import type { PostCard } from "@/types/content";

type PrevNextNavProps = {
  previous?: PostCard | null;
  next?: PostCard | null;
  className?: string;
};

/**
 * Desktop 151:586 — one row: [Previous + title] | [title + Next], gap 16, heights 21.
 * Mobile 158:5059 — one row: Previous left · Next right · no titles.
 * Buttons: bg #666 · px-8 py-4 · radius 4 · mono 14 / 0.9 · text #e6e6e6
 */
const navButtonClass =
  "inline-flex h-[21px] shrink-0 items-end justify-center rounded-[var(--radius-sm)] bg-[#666] px-2 py-1 font-mono text-[length:var(--text-meta)] font-medium uppercase leading-[0.9] tracking-[var(--tracking-meta)] text-[#e6e6e6] transition-[background-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:bg-orange hover:text-black hover:-translate-y-px active:scale-[0.97]";

const navTitleClass =
  "min-w-0 truncate font-mono text-[length:var(--text-meta)] font-medium uppercase leading-[1.4] tracking-[var(--tracking-meta)] text-[#e6e6e6] transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] hover:text-orange";

export function PrevNextNav({ previous, next, className }: PrevNextNavProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Previous and next articles"
      className={cn("flex h-[21px] items-center justify-between gap-4", className)}
    >
      <div className="flex min-w-0 items-center gap-4 md:w-[468px]">
        {previous ? (
          <>
            <Link
              href={ROUTES.post(previous.slug)}
              className={navButtonClass}
              aria-label={`Previous: ${previous.title}`}
            >
              Previous
            </Link>
            <Link
              href={ROUTES.post(previous.slug)}
              className={cn(navTitleClass, "hidden md:inline")}
              tabIndex={-1}
              aria-hidden
            >
              {previous.title}
            </Link>
          </>
        ) : null}
      </div>

      <div className="flex min-w-0 items-center justify-end gap-4 md:w-[436px]">
        {next ? (
          <>
            <Link
              href={ROUTES.post(next.slug)}
              className={cn(navTitleClass, "hidden text-right md:inline")}
              tabIndex={-1}
              aria-hidden
            >
              {next.title}
            </Link>
            <Link
              href={ROUTES.post(next.slug)}
              className={cn(navButtonClass, "w-[83px]")}
              aria-label={`Next: ${next.title}`}
            >
              Next
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
}
