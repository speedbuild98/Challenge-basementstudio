import { Container } from "@/components/layout/Container";

type TagPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  return (
    <Container className="py-[var(--space-8)]">
      <p className="text-muted text-sm uppercase tracking-[var(--tracking-meta)]">
        Tag stub
      </p>
      <h1 className="mt-3 text-3xl font-semibold">{slug}</h1>
    </Container>
  );
}
