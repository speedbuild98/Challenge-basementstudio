import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";

export function FeaturedPostSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-white/20 bg-[var(--color-card-frost-dark)] p-4 backdrop-blur-md md:py-2 md:pl-4 md:pr-2",
        className,
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
        <Skeleton
          tone="dark"
          rounded="md"
          className="aspect-[334/194] w-full md:aspect-auto md:h-[360px] md:w-[483px] md:shrink-0"
        />
        <div className="flex w-full max-w-[325px] flex-col justify-center gap-6 py-2 md:h-[360px]">
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
          <Skeleton tone="dark" className="h-9 w-44" rounded="sm" />
        </div>
      </div>
    </div>
  );
}
