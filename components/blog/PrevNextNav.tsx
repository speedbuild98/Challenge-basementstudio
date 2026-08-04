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
 * Figma Blog Post 9:703 prev/next (151:586):
 * buttons bg #666 · px-8 py-4 · radius 4 · mono 14 / 0.9
 * NEXT fixed 83px · titles mono uppercase · gap 16
 */
const navButtonClass =
  "inline-flex shrink-0 items-end justify-center rounded-[var(--radius-sm)] bg-[#666] px-2 py-1 font-mono text-[length:var(--text-meta)] font-medium uppercase leading-[0.9] tracking-[var(--tracking-meta)] text-[#e6e6e6] transition-colors hover:bg-orange hover:text-black";

const navTitleClass =
  "min-w-0 truncate font-mono text-[length:var(--text-meta)] font-medium uppercase leading-[1.4] tracking-[var(--tracking-meta)] text-[#e6e6e6] transition-colors hover:text-orange";

export function PrevNextNav({ previous, next, className }: PrevNextNavProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Previous and next articles"
      className={cn(
        "mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-0",
        className,
      )}
    >
      {/* Figma 151:586 — prev 468 · next 436 · gap 16 */}
      <div className="flex min-w-0 items-center gap-4 sm:w-[468px]">
        {previous ? (
          <>
            <Link
              href={ROUTES.post(previous.slug)}
              className={navButtonClass}
            >
              Previous
            </Link>
            <Link
              href={ROUTES.post(previous.slug)}
              className={navTitleClass}
            >
              {previous.title}
            </Link>
          </>
        ) : null}
      </div>

      <div className="flex min-w-0 items-center justify-between gap-4 sm:w-[436px] sm:justify-end">
        {next ? (
          <>
            <Link
              href={ROUTES.post(next.slug)}
              className={cn(navTitleClass, "order-2 text-left sm:order-1 sm:text-right")}
            >
              {next.title}
            </Link>
            <Link
              href={ROUTES.post(next.slug)}
              className={cn(navButtonClass, "order-1 w-[83px] sm:order-2")}
            >
              Next
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
}
