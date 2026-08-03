import { cn } from "@/lib/utils/cn";

type CategoryPillProps = {
  label: string;
  tone?: "light" | "dark";
  className?: string;
};

export function CategoryPill({
  label,
  tone = "light",
  className,
}: CategoryPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-0.5 font-semibold [font-size:var(--text-caption)] [line-height:var(--leading-caption)]",
        tone === "light" && "bg-white text-light-grey",
        tone === "dark" && "bg-dark-grey text-white",
        className,
      )}
    >
      {label}
    </span>
  );
}
