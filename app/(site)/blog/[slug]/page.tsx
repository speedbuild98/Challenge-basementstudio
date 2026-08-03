import { Container } from "@/components/layout/Container";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return (
    <Container className="py-[var(--space-8)]" width="narrow">
      <p className="text-muted text-sm uppercase tracking-[var(--tracking-meta)]">
        Article stub
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[var(--tracking-heading)]">
        {slug}
      </h1>
      <p className="text-muted mt-4">
        Wired for CMS content in a later phase. No hard-coded article body.
      </p>
    </Container>
  );
}
