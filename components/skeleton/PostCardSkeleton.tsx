import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";

type PostCardSkeletonProps = {
  variant?: "media" | "text";
  className?: string;
};

export function PostCardSkeleton({
  variant = "media",
  className,
}: PostCardSkeletonProps) {
  return (
    <div
      className={cn(
        "glass-card-light flex h-full flex-col justify-between overflow-hidden rounded-2xl p-4 md:p-6",
        variant === "media" ? "md:min-h-[400px]" : "md:min-h-[250px]",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col",
          variant === "media" ? "gap-4 md:gap-6" : "gap-4",
        )}
      >
        {variant === "media" ? (
          <Skeleton
            tone="light"
            rounded="md"
            className="h-[110px] w-full md:h-[137px]"
          />
        ) : null}
        <div className="flex flex-col gap-4">
          <Skeleton tone="light" className="h-3 w-20" />
          <Skeleton tone="light" className="h-7 w-full" />
          <Skeleton tone="light" className="h-7 w-4/5" />
          <div className="flex gap-1">
            <Skeleton tone="light" className="h-5 w-16" rounded="sm" />
            <Skeleton tone="light" className="h-5 w-20" rounded="sm" />
          </div>
        </div>
      </div>
      <Skeleton tone="light" className="mt-6 h-9 w-28" rounded="sm" />
    </div>
  );
}
