import { demoPosts } from "@/lib/content/demo";
import { getDemoArticleBySlug } from "@/lib/content/demo-article";
import { CACHE_TAGS } from "@/lib/constants";
import { sanityFetch } from "@/lib/sanity/fetch";
import { postBySlugQuery, postsQuery, postSlugsQuery } from "@/lib/sanity/queries/posts";
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
  } catch {
    // fall through to demo
  }
  return demoPosts.map((post) => post.slug);
}

export async function getArticlePageData(
  slug: string,
): Promise<ArticlePageData | null> {
  try {
    const [post, allPosts] = await Promise.all([
      sanityFetch<PostDetail | null>({
        query: postBySlugQuery,
        params: { slug },
        tags: [CACHE_TAGS.post(slug), CACHE_TAGS.posts],
      }),
      sanityFetch<PostCard[]>({
        query: postsQuery,
        tags: [CACHE_TAGS.posts],
      }),
    ]);

    if (post && allPosts?.length) {
      return buildNeighbors(post, allPosts, false);
    }
  } catch {
    // demo fallback
  }

  const demoPost = getDemoArticleBySlug(slug);
  if (!demoPost) return null;
  return buildNeighbors(demoPost, demoPosts, true);
}

function buildNeighbors(
  post: PostDetail,
  allPosts: PostCard[],
  usingDemoContent: boolean,
): ArticlePageData {
  const ordered = [...allPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const index = ordered.findIndex((item) => item.slug === post.slug);
  const previous = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;
  const next = index > 0 ? ordered[index - 1] : null;

  const categoryIds = new Set(post.categories?.map((category) => category._id));
  const related = ordered
    .filter((item) => item.slug !== post.slug)
    .filter((item) =>
      item.categories?.some((category) => categoryIds.has(category._id)),
    )
    .slice(0, 3);

  const relatedFallback =
    related.length > 0
      ? related
      : ordered.filter((item) => item.slug !== post.slug).slice(0, 3);

  return {
    post,
    previous,
    next,
    related: relatedFallback,
    usingDemoContent,
  };
}
