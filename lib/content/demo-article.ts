import type { PortableTextBlock } from "@portabletext/types";

import { demoCategories, demoPosts } from "@/lib/content/demo";
import type { PostDetail } from "@/types/content";

const block = (
  style: string,
  text: string,
  marks: Array<"strong" | "em"> = [],
): PortableTextBlock => ({
  _type: "block",
  _key: cryptoRandom(style + text.slice(0, 12)),
  style,
  markDefs: [],
  children: [
    {
      _type: "span",
      _key: cryptoRandom("span"),
      text,
      marks,
    },
  ],
});

/** Stable-enough keys for demo portable text (no crypto needed at build). */
function cryptoRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return `k${Math.abs(hash)}`;
}

function listBlock(items: string[]): PortableTextBlock {
  return {
    _type: "block",
    _key: cryptoRandom(items.join("|")),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: cryptoRandom(items[0] || "li"),
        text: items[0] || "",
        marks: [],
      },
    ],
  };
}

export const demoArticleBody: PortableTextBlock[] = [
  block("h2", "About debugging"),
  block(
    "h3",
    "If there's one golden rule we've learned, it would be to ensure quick and solid progress: you should STOP guessing. You need tools that give you detailed, quick, and accurate information to help you understand what’s happening, confirming your suspicions or proving you wrong.",
  ),
  block(
    "normal",
    "If there's one golden rule we've learned, it would be to ensure quick and solid progress: you should STOP guessing. You need tools that give you detailed, quick, and accurate information to help you understand what’s happening, confirming your suspicions or proving you wrong. In Daylight, we had three main goals to achieve: WebGL Scene, Animations, and HTML + WebGL integration. To tackle these, we created a set of tools to meet our needs:",
  ),
  ...["Debug state", "Leva + Mousetrap debug hotkeys", "Leverage the power of timeline visualization for animations"].map(
    (item) => listBlock([item]),
  ),
  block(
    "blockquote",
    "“A basement studio isn’t just a space—it’s a sanctuary where raw ideas take shape, echoing louder than self-doubt. It’s where creativity flows without limits, mistakes become lessons”",
  ),
  block("normal", "Marlon Pierce — Developer Engineer"),
  block(
    "normal",
    "We believe that the debugging experience could be better than console.log-driven development. It should also be thin enough to be your first fast alternative when facing an issue because, let's be honest, you'll always take the faster route in a rush. Our take here was to hide the debug state behind a ?debug param on the url, and a hook to listen to that state. This not only allows anyone to enable it without running the full dev environment but also enhances collaboration. Our designers can participate in the development process by tweaking Leva parameters, for example, making the final result even better.",
  ),
  block("h2", "Offscreen Canvas"),
  block(
    "normal",
    "The OffscreenCanvas API offers a way to detach the canvas context rendering steps from the main thread, resulting in significant performance boosts depending on your use-case. Or it leaves more room on the main thread reserved for magic, depending on how you see it.",
  ),
  block(
    "normal",
    "We have a bunch of canvases for Image sequences, WebGL, and noise overlay. Some of them don’t need to be document-synchronized, and some of them do. We needed a way to quickly set them up without caring about resizing, device pixel ratio, offscreen setup, and state management. React hooks are your friends here.",
  ),
];

export const demoArticle: PostDetail = {
  ...demoPosts[0],
  publishedAt: "2024-06-07",
  authors: [
    { _id: "a1", name: "Author X", role: "Engineer" },
    { _id: "a2", name: "Author X", role: "Designer" },
  ],
  categories: [demoCategories[0], demoCategories[1]],
  intro:
    "Discover how we enhanced our development process for the Daylight project, from debugging tips to performance boosts maintaining a clean codebase.",
  excerpt:
    "Welcome back to our Daylight blog series! If you liked our first post on creating those soft and warm shadows, hold on to your seat. In this second part, we will share with you how we enhanced our dev experience for the Daylight project.",
  coverUrl: "/demo/article-inline.jpg",
  body: demoArticleBody,
};

export function getDemoArticleBySlug(slug: string): PostDetail | null {
  if (slug === demoArticle.slug) return demoArticle;

  const card = demoPosts.find((post) => post.slug === slug);
  if (!card) return null;

  return {
    ...card,
    intro: card.excerpt || card.title,
    excerpt: card.excerpt,
    coverUrl: card.coverUrl || "/demo/featured-daylight.jpg",
    authors: [{ _id: "a1", name: "Author X" }],
    body: [
      block("h2", "Coming soon"),
      block(
        "normal",
        "This demo article mirrors the Figma layout. Publish a full Portable Text body in Sanity to replace this placeholder.",
      ),
      ...demoArticleBody.slice(0, 4),
    ],
  };
}
