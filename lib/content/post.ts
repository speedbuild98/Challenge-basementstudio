import { demoPosts } from "@/lib/content/demo";
import { getDemoArticleBySlug } from "@/lib/content/demo-article";
import { CACHE_TAGS } from "@/lib/constants";
import { allowDemoContent } from "@/lib/site";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  neighboringPostsQuery,
  postBySlugQuery,
  postsQuery,
  postSlugsQuery,
  relatedPostsQuery,
} from "@/lib/sanity/queries/posts";
import type { PostCard, PostDetail } from "@/types/content";

export type ArticlePageData = {
  post: PostDetail;
  previous: PostCard | null;
  next: PostCard | null;
  related: PostCard[];
  usingDemoContent: boolean;
};

export async function getPostSlugs(): Promise<string[]> {
  try {
    const rows = await sanityFetch<Array<{ slug: string }>>({
      query: postSlugsQuery,
      tags: [CACHE_TAGS.posts],
      revalidate: 60,
    });
    if (rows?.length) return rows.map((row) => row.slug);
  } catch (error) {
    console.error("[content/post] slug fetch failed", error);
  }
  if (allowDemoContent()) return demoPosts.map((post) => post.slug);
  return [];
}

export async function getArticlePageData(
  slug: string,
): Promise<ArticlePageData | null> {
  try {
    const post = await sanityFetch<PostDetail | null>({
      query: postBySlugQuery,
      params: { slug },
      tags: [CACHE_TAGS.post(slug), CACHE_TAGS.posts],
    });

    if (post) {
      const categoryIds =
        post.categories?.map((category) => category._id).filter(Boolean) ?? [];

      const [neighbors, related] = await Promise.all([
        sanityFetch<{ newer: PostCard | null; older: PostCard | null }>({
          query: neighboringPostsQuery,
          params: { publishedAt: post.publishedAt },
          tags: [CACHE_TAGS.posts],
        }),
        categoryIds.length
          ? sanityFetch<PostCard[]>({
              query: relatedPostsQuery,
              params: { slug: post.slug, categoryIds },
              tags: [CACHE_TAGS.posts],
            })
          : Promise.resolve([] as PostCard[]),
      ]);

      let relatedPosts = related ?? [];
      if (!relatedPosts.length) {
        const recent = await sanityFetch<PostCard[]>({
          query: postsQuery,
          tags: [CACHE_TAGS.posts],
        });
        relatedPosts = (recent ?? [])
          .filter((item) => item.slug !== post.slug)
          .slice(0, 3);
      }

      return {
        post,
        previous: neighbors?.older ?? null,
        next: neighbors?.newer ?? null,
        related: relatedPosts.slice(0, 3),
        usingDemoContent: false,
      };
    }
  } catch (error) {
    console.error("[content/post] article fetch failed", error);
    if (!allowDemoContent()) throw error;
  }

  if (!allowDemoContent()) return null;

  const demoPost = getDemoArticleBySlug(slug);
  if (!demoPost) return null;
  return buildDemoNeighbors(demoPost);
}

function buildDemoNeighbors(post: PostDetail): ArticlePageData {
  const ordered = [...demoPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const index = ordered.findIndex((item) => item.slug === post.slug);
  const previous =
    index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;
  const next = index > 0 ? ordered[index - 1] : null;

  const categoryIds = new Set(post.categories?.map((category) => category._id));
  const related = ordered
    .filter((item) => item.slug !== post.slug)
    .filter((item) =>
      item.categories?.some((category) => categoryIds.has(category._id)),
    )
    .slice(0, 3);

  return {
    post,
    previous,
    next,
    related:
      related.length > 0
        ? related
        : ordered.filter((item) => item.slug !== post.slug).slice(0, 3),
    usingDemoContent: true,
  };
}
