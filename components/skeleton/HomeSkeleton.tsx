import { Container } from "@/components/layout/Container";
import { FeaturedPostSkeleton } from "@/components/skeleton/FeaturedPostSkeleton";
import { PostCardSkeleton } from "@/components/skeleton/PostCardSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export function HomeSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" role="status">
      <span className="sr-only">Loading journal…</span>

      {/* Hero — matches HomeHero */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[20%] -z-0 h-[50vmax] opacity-40 blur-3xl"
          style={{ backgroundImage: "var(--glow-orange)" }}
        />
        <Container className="relative z-10">
          <Skeleton tone="dark" className="mb-4 h-3 w-28" />
          <div className="flex max-w-[16ch] flex-col gap-3">
            <Skeleton tone="dark" className="h-[clamp(2.5rem,10vw,4.75rem)] w-full" />
            <Skeleton tone="dark" className="h-[clamp(2.5rem,10vw,4.75rem)] w-11/12" />
            <Skeleton tone="dark" className="h-[clamp(2.5rem,10vw,4.75rem)] w-4/5" />
          </div>
          <div className="mx-auto mt-16 max-w-[902px] md:mt-20">
            <FeaturedPostSkeleton />
          </div>
        </Container>
      </section>

      {/* Knowledge grid — matches KnowledgeGrid */}
      <section className="bg-section-light text-section-light-fg">
        <Container className="py-16 md:py-24">
          <div className="flex max-w-[12ch] flex-col gap-3">
            <Skeleton tone="light" className="h-[clamp(2.5rem,10vw,4.75rem)] w-full" />
            <Skeleton tone="light" className="h-[clamp(2.5rem,10vw,4.75rem)] w-5/6" />
          </div>

          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 md:mt-14">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                tone="light"
                className="h-11 w-24"
                rounded="sm"
              />
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
