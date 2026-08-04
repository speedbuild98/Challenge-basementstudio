import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { KnowledgeGrid } from "@/components/sections/KnowledgeGrid";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text";
import { ROUTES } from "@/lib/constants";
import { FIGMA_KNOWLEDGE_TITLE } from "@/lib/content/knowledge-title";
import { getCategoryArchive } from "@/lib/content/taxonomy";
import { getSiteUrl } from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryArchive(slug);
  if (!data) return { title: "Category not found" };

  const title = `${data.term.title} · Journal`;
  const description =
    ("description" in data.term && data.term.description) ||
    `Articles in ${data.term.title}.`;
  const url = `${getSiteUrl()}/category/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = await getCategoryArchive(slug);
  if (!data) notFound();

  return (
    <>
      {data.usingDemoContent ? (
        <p className="sr-only">Showing demo category archive content.</p>
      ) : null}

      <section className="pb-8 pt-10 md:pt-16">
        <Container>
          <Link
            href={ROUTES.journal}
            className="inline-flex min-h-11 items-center font-mono text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-meta)] text-[#e6e6e6] transition-colors hover:text-orange"
          >
            ← Go back
          </Link>
          <Text variant="meta" className="mt-6 text-orange">
            Category
          </Text>
          <Text as="h1" variant="h1" className="mt-3 text-[#e6e6e6]">
            {data.term.title}
          </Text>
          {"description" in data.term && data.term.description ? (
            <Text variant="body" className="mt-4 max-w-2xl text-muted-foreground">
              {data.term.description}
            </Text>
          ) : null}
        </Container>
      </section>

      <KnowledgeGrid
        title={FIGMA_KNOWLEDGE_TITLE}
        posts={data.posts}
        categories={data.categories}
        activeCategory={data.term.slug}
        emptyMessage={`No published posts in ${data.term.title} yet.`}
      />
    </>
  );
}
