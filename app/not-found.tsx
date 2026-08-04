import Link from "next/link";

import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-black text-white">
      <Container className="flex flex-1 flex-col justify-center py-24">
        <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[var(--tracking-meta)] text-orange">
          404
        </p>
        <h1 className="mt-4 max-w-[14ch] text-[length:var(--text-h1)] font-semibold tracking-[var(--tracking-h1)] text-balance">
          This page does not exist.
        </h1>
        <p className="mt-4 max-w-md text-[length:var(--text-body)] text-muted-foreground">
          The article or archive you requested is missing or unpublished.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 w-fit items-center rounded-[var(--radius-sm)] bg-orange px-4 font-mono text-[length:var(--text-meta)] font-medium uppercase text-black"
        >
          Back to journal
        </Link>
      </Container>
    </div>
  );
}
