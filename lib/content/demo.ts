import type { CategoryRef, HomePageContent, NavItem, PostCard } from "@/types/content";

export const demoNav: NavItem[] = [
  { label: "Showcase", href: "#" },
  { label: "Services", href: "#" },
  { label: "People", href: "#" },
  { label: "Laboratory", href: "#" },
  { label: "Blog", href: "/" },
  { label: "Ventures", href: "#" },
];

export const demoCategories: CategoryRef[] = [
  { _id: "cat-web", title: "Web Design", slug: "web-design" },
  { _id: "cat-dev", title: "Development", slug: "development" },
  { _id: "cat-brand", title: "Branding", slug: "branding" },
];

export const demoHome: HomePageContent = {
  title: "Research, insights, and the science behind building brands & websites.",
  knowledgeTitle: "Knowledge Is Meant to Be Shared",
};

export const demoPosts: PostCard[] = [
  {
    _id: "demo-1",
    title: "Creating Daylight - The Devex",
    slug: "creating-daylight-the-devex",
    excerpt:
      "We’re thrilled to unveil our latest advancement in gene therapy, poised to transform the landscape of treatment for rare genetic conditions.",
    publishedAt: "2025-01-03",
    isFeatured: true,
    coverUrl: "/demo/featured-daylight.jpg",
    categories: [demoCategories[1], demoCategories[0]],
  },
  {
    _id: "demo-2",
    title: "Shipping Ship: Behind the Particle Shader Effect for Vercel’s Conf",
    slug: "shipping-ship-particle-shader",
    publishedAt: "2025-12-03",
    coverUrl: "/demo/post-ship.jpg",
    categories: [demoCategories[1], demoCategories[0]],
  },
  {
    _id: "demo-3",
    title: "New Digital HQ: Part 1",
    slug: "new-digital-hq-part-1",
    publishedAt: "2023-02-03",
    coverUrl: "/demo/featured-daylight.jpg",
    categories: [demoCategories[1], demoCategories[0]],
  },
  {
    _id: "demo-4",
    title: "Creating Daylight: The Shadows",
    slug: "creating-daylight-the-shadows",
    publishedAt: "2025-03-26",
    coverUrl: "/demo/post-ship.jpg",
    categories: [demoCategories[2], demoCategories[0]],
  },
  {
    _id: "demo-5",
    title: "GSAP & Next.js Setup: The BSMNT Way",
    slug: "gsap-nextjs-setup-bsmnt-way",
    publishedAt: "2025-01-03",
    coverUrl: "/demo/post-ship.jpg",
    categories: [demoCategories[2], demoCategories[0]],
  },
  {
    _id: "demo-6",
    title: "Navigating the Future Within the Next.js App Router",
    slug: "navigating-future-nextjs-app-router",
    publishedAt: "2025-05-23",
    coverUrl: "/demo/featured-daylight.jpg",
    categories: [demoCategories[1], demoCategories[0]],
  },
  {
    _id: "demo-7",
    title: "KidSuper World: Bringing Paints to Life With R3F",
    slug: "kidsuper-world-r3f",
    publishedAt: "2025-12-31",
    coverUrl: "/demo/article-inline.jpg",
    categories: [demoCategories[2], demoCategories[0]],
  },
];
