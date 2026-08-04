import { Container } from "@/components/layout/Container";
import { PostCardSkeleton } from "@/components/skeleton/PostCardSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export function ArchiveSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" role="status">
      <span className="sr-only">Loading archive…</span>

      <section className="pb-8 pt-10 md:pt-16">
        <Container>
          <Skeleton tone="dark" className="h-3 w-20" />
          <Skeleton tone="dark" className="mt-3 h-10 w-64 max-w-full" />
          <Skeleton tone="dark" className="mt-4 h-4 w-full max-w-xl" />
        </Container>
      </section>

      <section className="bg-section-light text-section-light-fg">
        <Container className="py-16 md:py-24">
          <div className="flex max-w-[12ch] flex-col gap-3">
            <Skeleton tone="light" className="h-16 w-full" />
            <Skeleton tone="light" className="h-16 w-4/5" />
          </div>

          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 md:mt-14">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} tone="light" className="h-11 w-24" rounded="sm" />
            ))}
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostCardSkeleton key={`m-${i}`} variant="media" />
            ))}
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostCardSkeleton key={`t-${i}`} variant="text" />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
