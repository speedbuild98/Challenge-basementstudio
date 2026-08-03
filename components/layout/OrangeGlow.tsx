import { cn } from "@/lib/utils/cn";

type OrangeGlowProps = {
  className?: string;
};

/** Decorative hero glow — pure CSS, no JS. */
export function OrangeGlow({ className }: OrangeGlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-[20%] -z-0 h-[50vmax] blur-3xl",
        className,
      )}
      style={{ backgroundImage: "var(--glow-orange)" }}
    />
  );
}
