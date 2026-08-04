import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type CategoryPillProps = {
  label: string;
  href?: string | null;
  tone?: "light" | "dark";
  className?: string;
};

export function CategoryPill({
  label,
  href,
  tone = "light",
  className,
}: CategoryPillProps) {
  const classes = cn(
    "inline-flex min-h-8 items-center px-1.5 font-semibold [font-size:var(--text-caption)] [line-height:var(--leading-caption)]",
    tone === "light" && "bg-white text-black",
    tone === "dark" && "bg-dark-grey text-white",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, "transition-colors hover:text-orange")}>
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
