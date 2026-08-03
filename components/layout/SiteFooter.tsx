import { Container } from "@/components/layout/Container";
import { SITE_NAME } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-border mt-auto border-t">
      <Container className="flex flex-col gap-2 py-8 text-sm text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
        <p>Content managed with Sanity.</p>
      </Container>
    </footer>
  );
}
