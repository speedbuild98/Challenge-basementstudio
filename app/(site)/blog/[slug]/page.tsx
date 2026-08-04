import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { PrevNextNav } from "@/components/blog/PrevNextNav";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Container } from "@/components/layout/Container";
import { PortableBody } from "@/components/sanity/PortableBody";
import { getArticlePageData, getPostSlugs } from "@/lib/content/post";
import { SITE_NAME } from "@/lib/constants";
import { urlForImage } from "@/lib/sanity/image";
import { getSiteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils/safe-json-ld";
import type { SanityImageSource } from "@sanity/image-url";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

function resolveOgImage(data: NonNullable<Awaited<ReturnType<typeof getArticlePageData>>>) {
  const og = data.post.seo?.ogImage;
  if (og?.asset) {
    try {
      return urlForImage(og as SanityImageSource).width(1200).height(630).url();
    } catch {
      // fall through
    }
  }
  if (data.post.coverImage?.asset) {
    try {
      return urlForImage(data.post.coverImage as SanityImageSource)
        .width(1200)
        .height(630)
        .url();
    } catch {
      return undefined;
    }
  }
  if (data.post.coverUrl) return `${getSiteUrl()}${data.post.coverUrl}`;
  return undefined;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticlePageData(slug);
  if (!data) return { title: "Not found" };

  const title = data.post.seo?.title || data.post.title;
  const description =
    data.post.seo?.description ||
    data.post.intro ||
    data.post.excerpt ||
    undefined;
  const url = `${getSiteUrl()}/blog/${slug}`;
  const image = resolveOgImage(data);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      publishedTime: data.post.publishedAt,
      modifiedTime: data.post._updatedAt || undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const data = await getArticlePageData(slug);
  if (!data) notFound();

  const { post, previous, next, related, usingDemoContent } = data;
  const url = `${getSiteUrl()}/blog/${post.slug}`;
  const image = resolveOgImage(data);

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
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              datePublished: post.publishedAt,
              dateModified: post._updatedAt || post.publishedAt,
              description: post.intro || post.excerpt,
              image: image ? [image] : undefined,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": url,
              },
              url,
              author: post.authors?.map((author) => ({
                "@type": "Person",
                name: author.name,
              })),
              publisher: {
                "@type": "Organization",
                name: SITE_NAME,
                logo: {
                  "@type": "ImageObject",
                  url: `${getSiteUrl()}/brand/basement-logo.svg`,
                },
              },
            }),
          }}
        />
      </article>
    </>
  );
}
