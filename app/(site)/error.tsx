"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[site]", error);
  }, [error]);

  return (
    <Container className="py-24">
      <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[var(--tracking-meta)] text-orange">
        Error
      </p>
      <h1 className="mt-4 max-w-[16ch] text-[length:var(--text-h1)] font-semibold tracking-[var(--tracking-h1)] text-white">
        Something went wrong loading this page.
      </h1>
      <p className="mt-4 max-w-md text-[length:var(--text-body)] text-muted-foreground">
        Try again. If the problem continues, check Sanity connectivity or come
        back shortly.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="button" variant="accent" className="min-h-11" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="secondary" className="min-h-11">
          Home
        </Button>
      </div>
    </Container>
  );
}
