import { demoCategories, demoPosts } from "@/lib/content/demo";
import { CACHE_TAGS } from "@/lib/constants";
import { allowDemoContent } from "@/lib/site";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  categoriesQuery,
  categoryBySlugQuery,
  tagBySlugQuery,
} from "@/lib/sanity/queries/categories";
import {
  postsByCategoryQuery,
  postsByTagQuery,
} from "@/lib/sanity/queries/posts";
import type { CategoryRef, PostCard, TagRef } from "@/types/content";

export type TaxonomyArchiveData = {
  kind: "category" | "tag";
  term: CategoryRef | TagRef;
  posts: PostCard[];
  categories: CategoryRef[];
  usingDemoContent: boolean;
};

export async function getCategoryArchive(
  slug: string,
): Promise<TaxonomyArchiveData | null> {
  try {
    const [term, posts, categories] = await Promise.all([
      sanityFetch<CategoryRef | null>({
        query: categoryBySlugQuery,
        params: { slug },
        tags: [CACHE_TAGS.categories],
      }),
      sanityFetch<PostCard[]>({
        query: postsByCategoryQuery,
        params: { slug },
        tags: [CACHE_TAGS.posts, CACHE_TAGS.categories],
      }),
      sanityFetch<CategoryRef[]>({
        query: categoriesQuery,
        tags: [CACHE_TAGS.categories],
      }),
    ]);

    if (term) {
      return {
        kind: "category",
        term,
        posts: posts ?? [],
        categories: categories ?? [],
        usingDemoContent: false,
      };
    }
  } catch (error) {
    console.error("[content/taxonomy] category fetch failed", error);
    if (!allowDemoContent()) throw error;
  }

  if (!allowDemoContent()) return null;

  const term = demoCategories.find((category) => category.slug === slug);
  if (!term) return null;

  return {
    kind: "category",
    term,
    posts: demoPosts.filter((post) =>
      post.categories?.some((category) => category.slug === slug),
    ),
    categories: demoCategories,
    usingDemoContent: true,
  };
}

export async function getTagArchive(
  slug: string,
): Promise<TaxonomyArchiveData | null> {
  try {
    const [term, posts, categories] = await Promise.all([
      sanityFetch<TagRef | null>({
        query: tagBySlugQuery,
        params: { slug },
        tags: [CACHE_TAGS.tags],
      }),
      sanityFetch<PostCard[]>({
        query: postsByTagQuery,
        params: { slug },
        tags: [CACHE_TAGS.posts, CACHE_TAGS.tags],
      }),
      sanityFetch<CategoryRef[]>({
        query: categoriesQuery,
        tags: [CACHE_TAGS.categories],
      }),
    ]);

    if (term) {
      return {
        kind: "tag",
        term,
        posts: posts ?? [],
        categories: categories ?? [],
        usingDemoContent: false,
      };
    }
  } catch (error) {
    console.error("[content/taxonomy] tag fetch failed", error);
    if (!allowDemoContent()) throw error;
  }

  return null;
}
