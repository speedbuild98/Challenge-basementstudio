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
 * light → bg #e6e6e6 · text muted (AA ≥4.5:1 → #555)
 * dark  → bg #2e2e2e · text #c4c4c4
 */
export function CategoryPill({
  label,
  href,
  tone = "light",
  className,
}: CategoryPillProps) {
  const classes = cn(
    // min-h-6 (≥24px) touch target
    "inline-flex min-h-6 w-fit max-w-full shrink-0 items-center justify-center px-1.5 font-sans text-[length:var(--text-caption)] font-semibold leading-none tracking-[var(--tracking-caption)] [font-weight:var(--font-weight-semibold)]",
    // #555 on #e6e6e6 ≈5.4:1 (was #6b6b6b @ 4.26 — failed AA)
    tone === "light" && "bg-[#e6e6e6] text-[#555555]",
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
