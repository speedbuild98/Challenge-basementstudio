import { demoCategories, demoHome, demoNav, demoPosts } from "@/lib/content/demo";
import { CACHE_TAGS } from "@/lib/constants";
import { allowDemoContent } from "@/lib/site";
import { sanityFetch } from "@/lib/sanity/fetch";
import { categoriesQuery } from "@/lib/sanity/queries/categories";
import { postsQuery } from "@/lib/sanity/queries/posts";
import { homePageQuery, siteSettingsQuery } from "@/lib/sanity/queries/settings";
import type {
  CategoryRef,
  HomePageContent,
  NavItem,
  PostCard,
  SiteSettings,
} from "@/types/content";

export type HomePageData = {
  settings: SiteSettings | null;
  home: HomePageContent;
  posts: PostCard[];
  categories: CategoryRef[];
  navigation: NavItem[];
  featured: PostCard | null;
  usingDemoContent: boolean;
};

function demoHomeData(): HomePageData {
  return {
    settings: null,
    home: demoHome,
    posts: demoPosts,
    categories: demoCategories,
    navigation: demoNav,
    featured: demoPosts.find((post) => post.isFeatured) || demoPosts[0] || null,
    usingDemoContent: true,
  };
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const [settings, home, posts, categories] = await Promise.all([
      sanityFetch<SiteSettings | null>({
        query: siteSettingsQuery,
        tags: [CACHE_TAGS.siteSettings],
      }),
      sanityFetch<HomePageContent | null>({
        query: homePageQuery,
        tags: [CACHE_TAGS.homePage],
      }),
      sanityFetch<PostCard[]>({
        query: postsQuery,
        tags: [CACHE_TAGS.posts],
      }),
      sanityFetch<CategoryRef[]>({
        query: categoriesQuery,
        tags: [CACHE_TAGS.categories],
      }),
    ]);

    const hasCmsPosts = Boolean(posts?.length);

    if (!hasCmsPosts) {
      if (!allowDemoContent()) {
        return {
          settings,
          home: {
            ...demoHome,
            ...home,
            title: home?.title || demoHome.title,
            knowledgeTitle: home?.knowledgeTitle || demoHome.knowledgeTitle,
          },
          posts: [],
          categories: categories ?? [],
          navigation: settings?.navigation?.length
            ? settings.navigation
            : demoNav,
          featured: null,
          usingDemoContent: false,
        };
      }
      return demoHomeData();
    }

    const featuredFromCms = home?.featuredPosts?.find(Boolean) || null;
    const featured =
      featuredFromCms ||
      posts.find((post) => post.isFeatured) ||
      posts[0] ||
      null;

    return {
      settings,
      home: {
        ...demoHome,
        ...home,
        title: home?.title || demoHome.title,
        knowledgeTitle: home?.knowledgeTitle || demoHome.knowledgeTitle,
        featuredPosts: home?.featuredPosts ?? null,
      },
      posts,
      categories: categories?.length ? categories : [],
      navigation: settings?.navigation?.length
        ? settings.navigation
        : demoNav,
      featured,
      usingDemoContent: false,
    };
  } catch (error) {
    console.error("[content/home] Sanity fetch failed", error);
    if (allowDemoContent()) return demoHomeData();
    throw error;
  }
}
