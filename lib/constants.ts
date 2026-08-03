export const SITE_NAME = "Editorial";

export const ROUTES = {
  home: "/",
  studio: "/studio",
  post: (slug: string) => `/blog/${slug}`,
  category: (slug: string) => `/category/${slug}`,
  tag: (slug: string) => `/tag/${slug}`,
} as const;

/** Cache tags used with Next.js `revalidateTag` / Sanity fetch tags. */
export const CACHE_TAGS = {
  posts: "posts",
  post: (slug: string) => `post:${slug}`,
  authors: "authors",
  categories: "categories",
  tags: "tags",
  siteSettings: "siteSettings",
  homePage: "homePage",
} as const;
