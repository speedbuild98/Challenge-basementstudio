import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KnowledgeGrid } from "@/components/sections/KnowledgeGrid";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text";
import { getTagArchive } from "@/lib/content/taxonomy";
import { getSiteUrl } from "@/lib/site";

type TagPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getTagArchive(slug);
  if (!data) return { title: "Tag not found" };

  const title = `${data.term.title} · Journal`;
  const description = `Articles tagged ${data.term.title}.`;
  const url = `${getSiteUrl()}/tag/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const data = await getTagArchive(slug);
  if (!data) notFound();

  return (
    <>
      <section className="pb-8 pt-10 md:pt-16">
        <Container>
          <Text variant="meta" className="text-orange">
            Tag
          </Text>
          <Text as="h1" variant="h1" className="mt-3 text-white">
            {data.term.title}
          </Text>
        </Container>
      </section>

      <KnowledgeGrid
        title="Knowledge Is Meant to Be Shared"
        posts={data.posts}
        categories={data.categories}
        emptyMessage={`No published posts tagged ${data.term.title} yet.`}
      />
    </>
  );
}
