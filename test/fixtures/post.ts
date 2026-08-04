import type { CategoryRef, PostCard, PostDetail } from "@/types/content";

export const mockCategory: CategoryRef = {
  _id: "cat-design",
  title: "Design",
  slug: "design",
};

export const mockPost: PostCard = {
  _id: "post-1",
  title: "How to build a brand system that scales",
  slug: "brand-system-that-scales",
  excerpt: "A short excerpt for testing.",
  publishedAt: "2025-12-03T12:00:00.000Z",
  coverUrl: "/brand/basement-logo.svg",
  coverSrc: "/brand/basement-logo.svg",
  categories: [mockCategory, { _id: "cat-case", title: "Case Study", slug: "case-study" }],
  authors: [{ _id: "author-1", name: "Jane Doe", slug: "jane-doe" }],
};

export const mockPostDetail: PostDetail = {
  ...mockPost,
  intro: "Intro paragraph for the article.",
  body: [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s1",
          text: "Hello from Portable Text.",
          marks: [],
        },
      ],
    },
  ],
};

export const mockPosts: PostCard[] = [
  mockPost,
  {
    ...mockPost,
    _id: "post-2",
    title: "Second related article about motion design systems",
    slug: "motion-design-systems",
    coverUrl: "/brand/basement-logo.svg",
    coverSrc: "/brand/basement-logo.svg",
  },
  {
    ...mockPost,
    _id: "post-3",
    title: "Third related article without a long title",
    slug: "third-related",
    coverUrl: null,
    coverSrc: null,
  },
];
