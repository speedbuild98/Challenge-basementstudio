import type { MetadataRoute } from "next";

import { CACHE_TAGS } from "@/lib/constants";
import { sanityFetch } from "@/lib/sanity/fetch";
import { sitemapEntriesQuery } from "@/lib/sanity/queries/posts";
import { getSiteUrl } from "@/lib/site";

type SitemapPayload = {
  posts: Array<{ slug: string; _updatedAt?: string; publishedAt?: string }>;
  categories: Array<{ slug: string; _updatedAt?: string }>;
  tags: Array<{ slug: string; _updatedAt?: string }>;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  let payload: SitemapPayload = { posts: [], categories: [], tags: [] };
  try {
    payload = await sanityFetch<SitemapPayload>({
      query: sitemapEntriesQuery,
      tags: [CACHE_TAGS.posts, CACHE_TAGS.categories, CACHE_TAGS.tags],
      revalidate: 300,
    });
  } catch (error) {
    console.error("[sitemap] Sanity fetch failed", error);
  }

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const post of payload.posts ?? []) {
    entries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt || post.publishedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const category of payload.categories ?? []) {
    entries.push({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: category._updatedAt
        ? new Date(category._updatedAt)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  for (const tag of payload.tags ?? []) {
    entries.push({
      url: `${baseUrl}/tag/${tag.slug}`,
      lastModified: tag._updatedAt ? new Date(tag._updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    });
  }

  return entries;
}
