import { Container } from "@/components/layout/Container";
import { FeaturedPostSkeleton } from "@/components/skeleton/FeaturedPostSkeleton";
import { PostCardSkeleton } from "@/components/skeleton/PostCardSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export function HomeSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" role="status">
      <span className="sr-only">Loading journal…</span>

      {/* Hero — matches HomeHero */}
      <section className="relative overflow-hidden pb-[6.3rem] pt-3 md:pb-[17.875rem] md:pt-[6.125rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
        >
          <div
            className="absolute left-1/2 top-[52%] h-[clamp(280px,42vw,520px)] w-[min(1680px,165vw)] -translate-x-1/2 -translate-y-1/2 rounded-[100%] opacity-70 blur-[64px]"
            style={{ backgroundImage: "var(--glow-orange)" }}
          />
        </div>
        <Container className="relative z-10">
          <Skeleton tone="dark" className="mb-4 h-3 w-28" />
          <div className="flex max-w-[16ch] flex-col gap-3">
            <Skeleton tone="dark" className="h-[clamp(2.5rem,10vw,4.75rem)] w-full" />
            <Skeleton tone="dark" className="h-[clamp(2.5rem,10vw,4.75rem)] w-11/12" />
            <Skeleton tone="dark" className="h-[clamp(2.5rem,10vw,4.75rem)] w-4/5" />
          </div>
          <div className="mx-auto mt-[6.25rem] w-full max-w-[902px] md:mt-[18.5rem]">
            <FeaturedPostSkeleton />
          </div>
        </Container>
      </section>

      {/* Knowledge grid — matches KnowledgeGrid */}
      <section className="bg-section-light text-section-light-fg">
        <Container className="pb-16 pt-3 md:pb-[4.75rem] md:pt-[3.625rem]">
          <div className="flex max-w-[755px] flex-col gap-3">
            <Skeleton tone="light" className="h-[clamp(2.5rem,10vw,4.75rem)] w-full" />
            <Skeleton tone="light" className="h-[clamp(2.5rem,10vw,4.75rem)] w-5/6" />
          </div>

          <div className="mt-[9.75rem] flex flex-wrap gap-x-6 gap-y-2 md:mt-[12rem] md:gap-x-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                tone="light"
                className="h-5 w-24 md:h-5"
                rounded="sm"
              />
            ))}
          </div>

          <div className="mt-8 space-y-3 md:mt-[3.45rem] md:space-y-8">
            <div className="grid gap-3 md:grid-cols-3 md:gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <PostCardSkeleton key={`m-${i}`} variant="media" />
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-3 md:gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <PostCardSkeleton key={`t-${i}`} variant="text" />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
