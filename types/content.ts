import type { PortableTextBlock } from "@portabletext/types";

export type CategoryRef = {
  _id: string;
  title: string;
  slug: string;
};

export type AuthorRef = {
  _id: string;
  name: string;
  slug?: string | null;
  role?: string | null;
};

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
  isFeatured?: boolean | null;
  coverImage?: {
    alt?: string | null;
    asset?: unknown;
    url?: string | null;
  } | null;
  /** Local/demo image path when Sanity asset is absent */
  coverUrl?: string | null;
  categories?: CategoryRef[] | null;
  authors?: AuthorRef[] | null;
};

export type PostDetail = PostCard & {
  intro?: string | null;
  body?: PortableTextBlock[] | null;
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SiteSettings = {
  title?: string | null;
  description?: string | null;
  navigation?: NavItem[] | null;
  footer?: {
    text?: string | null;
    links?: NavItem[] | null;
  } | null;
};

export type HomePageContent = {
  title?: string | null;
  eyebrow?: string | null;
  intro?: string | null;
  knowledgeTitle?: string | null;
  featuredPosts?: PostCard[] | null;
};
