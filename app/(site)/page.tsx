import { Container } from "@/components/layout/Container";

export default function HomePage() {
  return (
    <Container className="py-[var(--space-8)]">
      <p className="text-[var(--text-meta)] tracking-[var(--tracking-meta)] text-[var(--color-muted)] uppercase">
        Phase 3 scaffold
      </p>
      <h1
        className="mt-3 max-w-3xl font-semibold tracking-[var(--tracking-display)]"
        style={{ fontSize: "var(--text-display)", lineHeight: "var(--leading-display)" }}
      >
        Editorial
      </h1>
      <p className="text-muted mt-4 max-w-xl">
        Architecture and tooling are in place. Homepage fidelity lands after
        Figma intake and Sanity project connection.
      </p>
      <ul className="mt-8 list-disc space-y-2 pl-5 text-sm">
        <li>Next.js App Router + TypeScript + Tailwind v4</li>
        <li>Sanity schemas + embedded Studio at /studio</li>
        <li>Design tokens in styles/tokens.css</li>
        <li>Motion installed (client islands only)</li>
      </ul>
    </Container>
  );
}
