import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { PrevNextNav } from "@/components/blog/PrevNextNav";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Container } from "@/components/layout/Container";
import { PortableBody } from "@/components/sanity/PortableBody";
import { getArticlePageData, getPostSlugs } from "@/lib/content/post";
import { SITE_NAME } from "@/lib/constants";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticlePageData(slug);
  if (!data) return { title: "Not found" };

  const title = data.post.seo?.title || data.post.title;
  const description =
    data.post.seo?.description || data.post.intro || data.post.excerpt || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: data.post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const data = await getArticlePageData(slug);
  if (!data) notFound();

  const { post, previous, next, related, usingDemoContent } = data;

  return (
    <>
      {usingDemoContent ? (
        <p className="sr-only">
          Showing design-aligned demo article content until Sanity publishes this
          slug.
        </p>
      ) : null}

      <article>
        <Container>
          <ArticleHeader post={post} />
        </Container>

        <Container className="mt-16 md:mt-24">
          <div className="mx-auto max-w-[904px]">
            <PortableBody value={post.body} />
            <PrevNextNav previous={previous} next={next} />
          </div>
        </Container>

        <RelatedPosts posts={related} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              datePublished: post.publishedAt,
              description: post.intro || post.excerpt,
              author: post.authors?.map((author) => ({
                "@type": "Person",
                name: author.name,
              })),
              publisher: {
                "@type": "Organization",
                name: SITE_NAME,
              },
            }),
          }}
        />
      </article>
    </>
  );
}
