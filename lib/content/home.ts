import { demoCategories, demoHome, demoNav, demoPosts } from "@/lib/content/demo";
import { CACHE_TAGS } from "@/lib/constants";
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
  usingDemoContent: boolean;
};

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

    return {
      settings,
      home: {
        ...demoHome,
        ...home,
        title: home?.title || demoHome.title,
        knowledgeTitle: home?.knowledgeTitle || demoHome.knowledgeTitle,
      },
      posts: hasCmsPosts ? posts : demoPosts,
      categories: categories?.length ? categories : demoCategories,
      navigation: settings?.navigation?.length
        ? settings.navigation
        : demoNav,
      usingDemoContent: !hasCmsPosts,
    };
  } catch {
    return {
      settings: null,
      home: demoHome,
      posts: demoPosts,
      categories: demoCategories,
      navigation: demoNav,
      usingDemoContent: true,
    };
  }
}
