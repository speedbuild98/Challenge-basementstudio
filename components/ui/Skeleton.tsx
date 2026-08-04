import { cn } from "@/lib/utils/cn";

type SkeletonProps = {
  className?: string;
  /** dark = on black UI, light = on cream knowledge section */
  tone?: "dark" | "light";
  rounded?: "sm" | "md" | "lg" | "xl" | "full" | "none";
};

const radius = {
  none: "rounded-none",
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  full: "rounded-full",
} as const;

/**
 * Shimmer bone — matches brand surfaces (frost cards / dark chrome).
 */
export function Skeleton({
  className,
  tone = "dark",
  rounded = "md",
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "skeleton-shimmer relative overflow-hidden",
        radius[rounded],
        tone === "dark" && "bg-white/8",
        tone === "light" && "bg-black/8",
        className,
      )}
    />
  );
}
