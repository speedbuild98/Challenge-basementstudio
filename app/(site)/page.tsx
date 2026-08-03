import type { Metadata } from "next";

import { HomeHero } from "@/components/sections/HomeHero";
import { KnowledgeGrid } from "@/components/sections/KnowledgeGrid";
import { getHomePageData } from "@/lib/content/home";

export async function generateMetadata(): Promise<Metadata> {
  const { home, settings } = await getHomePageData();

  return {
    title: settings?.title || "basement. Journal",
    description:
      settings?.description ||
      home.intro ||
      "Research, insights, and the science behind building brands & websites.",
  };
}

export default async function HomePage() {
  const { home, posts, categories, usingDemoContent } = await getHomePageData();

  const featured =
    posts.find((post) => post.isFeatured) || posts[0] || null;
  const gridPosts = posts.filter((post) => post._id !== featured?._id);

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
        featured={featured}
      />
      <KnowledgeGrid
        title={home.knowledgeTitle || "Knowledge Is Meant to Be Shared"}
        posts={gridPosts.length ? gridPosts : posts}
        categories={categories}
      />
    </>
  );
}
