import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SITE_NAME } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="border-border border-b">
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[var(--tracking-meta)] uppercase"
        >
          {SITE_NAME}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link href="/" className="hover:text-muted transition-colors">
                Journal
              </Link>
            </li>
            <li>
              <Link
                href="/studio"
                className="hover:text-muted transition-colors"
              >
                Studio
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
