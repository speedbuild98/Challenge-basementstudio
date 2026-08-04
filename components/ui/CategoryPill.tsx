import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type CategoryPillProps = {
  label: string;
  href?: string | null;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Figma chips:
 * light → bg #e6e6e6 · text #c4c4c4 · px-2 · 13 semibold
 * dark  → bg #2e2e2e · text #c4c4c4
 */
export function CategoryPill({
  label,
  href,
  tone = "light",
  className,
}: CategoryPillProps) {
  const classes = cn(
    // min-h-6 (≥24px) satisfies mobile touch target; visual chip stays compact via px
    "inline-flex min-h-6 w-fit max-w-full shrink-0 items-center justify-center px-1.5 font-sans text-[length:var(--text-caption)] font-semibold leading-none tracking-[var(--tracking-caption)] [font-weight:var(--font-weight-semibold)]",
    tone === "light" && "bg-[#e6e6e6] text-[#6b6b6b]",
    tone === "dark" && "bg-[#2e2e2e] text-[#c4c4c4]",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          classes,
          "transition-colors duration-[var(--duration-fast)] hover:text-orange",
        )}
      >
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
