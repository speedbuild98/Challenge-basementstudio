import { Container } from "@/components/layout/Container";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <Container className="py-[var(--space-8)]">
      <p className="text-muted text-sm uppercase tracking-[var(--tracking-meta)]">
        Category stub
      </p>
      <h1 className="mt-3 text-3xl font-semibold">{slug}</h1>
    </Container>
  );
}
