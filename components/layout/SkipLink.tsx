import { cn } from "@/lib/utils/cn";

type SkipLinkProps = {
  href?: string;
  className?: string;
};

export function SkipLink({ href = "#main-content", className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "bg-foreground text-background focus:ring-focus absolute left-4 top-4 z-100 -translate-y-[200%] px-4 py-2 text-sm font-medium transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2",
        className,
      )}
    >
      Skip to main content
    </a>
  );
}
