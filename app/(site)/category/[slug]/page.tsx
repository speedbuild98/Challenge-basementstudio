import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KnowledgeGrid } from "@/components/sections/KnowledgeGrid";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text";
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
          <Text variant="meta" className="text-orange">
            Category
          </Text>
          <Text as="h1" variant="h1" className="mt-3 text-white">
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
        title="Knowledge Is Meant to Be Shared"
        posts={data.posts}
        categories={data.categories}
        activeCategory={data.term.slug}
        emptyMessage={`No published posts in ${data.term.title} yet.`}
      />
    </>
  );
}
