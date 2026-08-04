import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";

export function FeaturedPostSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-card-frost-dark)] p-2 pl-4",
        className,
      )}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <Skeleton
          tone="dark"
          rounded="md"
          className="aspect-[482/360] w-full md:max-w-[482px] md:shrink-0"
        />
        <div className="flex max-w-[325px] flex-col justify-center gap-6 py-4 pr-2 md:min-h-[360px]">
          <div className="flex flex-col gap-4">
            <Skeleton tone="dark" className="h-3 w-24" />
            <Skeleton tone="dark" className="h-9 w-full" />
            <Skeleton tone="dark" className="h-9 w-4/5" />
            <div className="flex gap-1">
              <Skeleton tone="dark" className="h-5 w-16" rounded="sm" />
              <Skeleton tone="dark" className="h-5 w-20" rounded="sm" />
            </div>
            <Skeleton tone="dark" className="h-4 w-full" />
            <Skeleton tone="dark" className="h-4 w-5/6" />
          </div>
          <Skeleton tone="dark" className="h-11 w-44" rounded="sm" />
        </div>
      </div>
    </div>
  );
}
