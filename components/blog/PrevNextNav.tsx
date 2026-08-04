import Link from "next/link";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import type { PostCard } from "@/types/content";

type PrevNextNavProps = {
  previous?: PostCard | null;
  next?: PostCard | null;
  className?: string;
};

export function PrevNextNav({ previous, next, className }: PrevNextNavProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Previous and next articles"
      className={cn(
        "mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex min-h-10 flex-1 items-center gap-4">
        {previous ? (
          <>
            <Link
              href={ROUTES.post(previous.slug)}
              className="inline-flex min-h-11 items-center rounded-[var(--radius-sm)] bg-dark-grey px-3 py-2 font-mono text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-meta)] text-white transition-colors hover:bg-orange hover:text-black"
            >
              Previous
            </Link>
            <Link
              href={ROUTES.post(previous.slug)}
              className="inline-flex min-h-11 items-center font-mono text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-meta)] text-white transition-colors hover:text-orange"
            >
              {previous.title}
            </Link>
          </>
        ) : null}
      </div>

      <div className="flex min-h-10 flex-1 items-center justify-start gap-4 sm:justify-end">
        {next ? (
          <>
            <Link
              href={ROUTES.post(next.slug)}
              className="order-2 inline-flex min-h-11 items-center font-mono text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-meta)] text-white transition-colors hover:text-orange sm:order-1 sm:text-right"
            >
              {next.title}
            </Link>
            <Link
              href={ROUTES.post(next.slug)}
              className="order-1 inline-flex min-h-11 items-center rounded-[var(--radius-sm)] bg-dark-grey px-3 py-2 font-mono text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-meta)] text-white transition-colors hover:bg-orange hover:text-black sm:order-2"
            >
              Next
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
}
