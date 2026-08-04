import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";

export function FeaturedPostSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "glass-card-dark flex w-full max-w-[902px] flex-col justify-between overflow-hidden",
        "rounded-[11.424px] p-4 md:h-[394px] md:rounded-2xl md:p-0 md:py-2 md:pl-4 md:pr-2",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:h-full md:flex-row md:items-center md:gap-12">
        <Skeleton
          tone="dark"
          rounded="md"
          className="h-[110px] w-full md:h-[360px] md:w-[483px] md:shrink-0"
        />
        <div className="flex w-full flex-col md:h-[360px] md:max-w-[325px] md:justify-center md:gap-6">
          <div className="flex flex-col gap-2 md:gap-4">
            <Skeleton tone="dark" className="h-3 w-24" />
            <Skeleton tone="dark" className="h-7 w-full md:h-9" />
            <Skeleton tone="dark" className="h-7 w-4/5 md:h-9" />
            <div className="flex gap-1">
              <Skeleton tone="dark" className="h-5 w-16" rounded="sm" />
              <Skeleton tone="dark" className="h-5 w-20" rounded="sm" />
            </div>
            <Skeleton tone="dark" className="h-4 w-full" />
            <Skeleton tone="dark" className="h-4 w-5/6" />
          </div>
          <Skeleton tone="dark" className="mt-4 h-[21px] w-44 md:mt-0" rounded="sm" />
        </div>
      </div>
    </div>
  );
}
