import type { Metadata } from "next";

import { HomeHero } from "@/components/sections/HomeHero";
import { KnowledgeGrid } from "@/components/sections/KnowledgeGrid";
import { getHomePageData } from "@/lib/content/home";
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { home, settings } = await getHomePageData();
  const title =
    settings?.seo?.title || settings?.title || "basement. Journal";
  const description =
    settings?.seo?.description ||
    settings?.description ||
    home.intro ||
    "Research, insights, and the science behind building brands & websites.";
  const url = getSiteUrl();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function HomePage() {
  const { home, posts, categories, featured, usingDemoContent } =
    await getHomePageData();

  const gridPosts = featured
    ? posts.filter((post) => post._id !== featured._id)
    : posts;

  return (
    <>
      {usingDemoContent ? (
        <p className="sr-only">
          Showing design-aligned demo content until Sanity posts are published.
        </p>
      ) : null}
      <HomeHero
        title={
          home.title ||
          "Research, insights, and the science behind building brands & websites."
        }
        eyebrow={home.eyebrow}
        featured={featured}
      />
      <KnowledgeGrid
        title={home.knowledgeTitle || "Knowledge Is Meant to Be Shared"}
        posts={gridPosts.length ? gridPosts : posts}
        categories={categories}
        emptyMessage="Publish posts in Sanity Studio to populate the journal."
      />
    </>
  );
}
