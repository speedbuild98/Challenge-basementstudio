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
        "absolute left-4 top-4 z-[100] -translate-y-[200%] bg-orange px-4 py-2 text-sm font-semibold text-black transition-transform focus:translate-y-0 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      Skip to main content
    </a>
  );
}
