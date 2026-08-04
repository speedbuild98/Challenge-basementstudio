import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export function ArticleSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" role="status">
      <span className="sr-only">Loading article…</span>

      <Container>
        <header className="pt-6 md:pt-10">
          <Skeleton tone="dark" className="h-11 w-28" rounded="sm" />
          <div className="mt-2 border-t border-white/15" />

          <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex max-w-[304px] flex-col gap-3">
              <Skeleton tone="dark" className="h-10 w-full" />
              <Skeleton tone="dark" className="h-10 w-5/6" />
              <Skeleton tone="dark" className="h-10 w-2/3" />
            </div>
            <div className="flex max-w-[553px] flex-col gap-4">
              <Skeleton tone="dark" className="h-7 w-full" />
              <Skeleton tone="dark" className="h-7 w-11/12" />
              <Skeleton tone="dark" className="h-7 w-4/5" />
              <Skeleton tone="dark" className="mt-2 h-4 w-full" />
              <Skeleton tone="dark" className="h-4 w-5/6" />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:pl-[min(50%,503px)]">
            <div className="flex items-center gap-2">
              <Skeleton tone="dark" className="h-3 w-24" />
              <Skeleton tone="dark" className="size-1" rounded="full" />
              <Skeleton tone="dark" className="h-3 w-32" />
            </div>
            <div className="flex gap-1">
              <Skeleton tone="dark" className="h-5 w-16" rounded="sm" />
              <Skeleton tone="dark" className="h-5 w-20" rounded="sm" />
            </div>
          </div>

          <Skeleton
            tone="dark"
            rounded="none"
            className="mt-8 aspect-[4/3] w-full border border-white/20 md:aspect-[1372/472]"
          />
        </header>
      </Container>

      <Container className="mt-16 md:mt-24">
        <div className="mx-auto max-w-[904px] space-y-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              tone="dark"
              className={i % 4 === 3 ? "h-4 w-2/3" : "h-4 w-full"}
            />
          ))}
          <Skeleton tone="dark" className="mt-10 h-40 w-full" rounded="md" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={`b-${i}`}
              tone="dark"
              className={i === 4 ? "h-4 w-1/2" : "h-4 w-full"}
            />
          ))}

          <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:justify-between">
            <Skeleton tone="dark" className="h-11 w-40" rounded="sm" />
            <Skeleton tone="dark" className="h-11 w-40" rounded="sm" />
          </div>
        </div>
      </Container>

      <section className="mt-24 border-t border-white/10 pt-16 md:mt-32 md:pt-20">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
            <div className="flex shrink-0 flex-col gap-2 lg:w-[140px]">
              <Skeleton tone="dark" className="h-8 w-24" />
              <Skeleton tone="dark" className="h-8 w-20" />
            </div>
            <div className="grid flex-1 gap-8 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius-xl)] bg-[var(--color-card-frost-dark)] p-4"
                >
                  <Skeleton tone="dark" rounded="md" className="h-[137px] w-full" />
                  <Skeleton tone="dark" className="mt-6 h-3 w-20" />
                  <Skeleton tone="dark" className="mt-4 h-7 w-full" />
                  <Skeleton tone="dark" className="mt-2 h-7 w-4/5" />
                  <Skeleton tone="dark" className="mt-6 h-11 w-28" rounded="sm" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
