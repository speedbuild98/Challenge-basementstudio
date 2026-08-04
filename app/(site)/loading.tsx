import { Container } from "@/components/layout/Container";

export default function SiteLoading() {
  return (
    <Container className="py-24" aria-busy="true" aria-live="polite">
      <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[var(--tracking-meta)] text-muted-foreground">
        Loading journal…
      </p>
      <div className="mt-8 h-12 max-w-xl animate-pulse rounded bg-white/10" />
      <div className="mt-4 h-64 max-w-3xl animate-pulse rounded bg-white/5" />
    </Container>
  );
}
