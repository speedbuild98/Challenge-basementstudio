#!/usr/bin/env node
/**
 * Seed our Sanity project from basement.studio's public dataset.
 *
 * Source (read-only public API):
 *   project 9syto90m / dataset production
 *
 * Target (requires write token):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk... npm run seed:basement
 *   npm run seed:basement -- --dry-run
 *   npm run seed:basement -- --limit=8
 */

import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";
import { basename } from "node:path";

const SOURCE_PROJECT = "9syto90m";
const SOURCE_DATASET = "production";
const SOURCE_API = `https://${SOURCE_PROJECT}.api.sanity.io/v2025-01-01/data/query/${SOURCE_DATASET}`;

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const limitArg = [...args].find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;

const targetProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const targetDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!dryRun && !writeToken) {
  console.error(`
Missing SANITY_API_WRITE_TOKEN.

1. Open https://www.sanity.io/manage/project/${targetProjectId}/api#tokens
2. Create token with Editor permissions
3. Run:
   SANITY_API_WRITE_TOKEN=sk... npm run seed:basement
`);
  process.exit(1);
}

if (!targetProjectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}

const target = createClient({
  projectId: targetProjectId,
  dataset: targetDataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  token: writeToken,
  useCdn: false,
});

const imageCache = new Map();

async function querySource(groq) {
  const url = `${SOURCE_API}?query=${encodeURIComponent(groq)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Source query failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return json.result;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

function portableToPlain(blocks) {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block?._type === "block")
    .map((block) =>
      (block.children || []).map((child) => child.text || "").join(""),
    )
    .filter(Boolean)
    .join("\n\n");
}

function textBlock(text, style = "normal", key) {
  return {
    _type: "block",
    _key: key || hashKey(text + style),
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: hashKey(`${text}-span`),
        text,
        marks: [],
      },
    ],
  };
}

function hashKey(input) {
  return createHash("sha1").update(String(input)).digest("hex").slice(0, 12);
}

async function uploadImageFromUrl(url, filenameHint) {
  if (!url) return null;
  if (imageCache.has(url)) return imageCache.get(url);
  if (dryRun) {
    const fake = { _type: "image", asset: { _type: "reference", _ref: "image-dry-run" } };
    imageCache.set(url, fake);
    return fake;
  }

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ! image download failed: ${url}`);
    return null;
  }
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const buffer = Buffer.from(await res.arrayBuffer());
  const ext = contentType.includes("png")
    ? "png"
    : contentType.includes("webp")
      ? "webp"
      : contentType.includes("gif")
        ? "gif"
        : "jpg";
  const filename = `${slugify(filenameHint || basename(url)) || "image"}.${ext}`;
  const asset = await target.assets.upload("image", buffer, {
    filename,
    contentType,
  });
  const image = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
  imageCache.set(url, image);
  return image;
}

async function resolveSourceImageUrl(imageField) {
  if (!imageField) return null;
  if (imageField.asset?.url) return imageField.asset.url;
  const ref = imageField.asset?._ref;
  if (!ref) return null;
  const asset = await querySource(
    `*[_id=="${ref}"][0]{url}`,
  );
  return asset?.url || null;
}

function transformContent(content, uploadedInlineImages) {
  if (!Array.isArray(content)) return [];

  const out = [];
  for (const item of content) {
    if (!item?._type) continue;

    if (item._type === "block") {
      out.push({
        ...item,
        markDefs: (item.markDefs || []).map((def) =>
          def._type === "link"
            ? def
            : { ...def, _type: "link", href: def.href || "#" },
        ),
      });
      continue;
    }

    if (item._type === "image") {
      const uploaded = uploadedInlineImages.get(item._key || item.asset?._ref);
      if (uploaded) {
        out.push({
          _type: "image",
          _key: item._key || hashKey(item.asset._ref),
          ...uploaded,
          alt: item.alt || "Article image",
          caption: item.caption || undefined,
        });
      }
      continue;
    }

    if (item._type === "codeBlock") {
      const code = (item.files || [])
        .map((file) => file.code || "")
        .filter(Boolean)
        .join("\n\n");
      if (code) {
        out.push({
          _type: "block",
          _key: item._key || hashKey(code.slice(0, 40)),
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: hashKey(`${item._key}-code`),
              marks: ["code"],
              text: code,
            },
          ],
        });
      }
      continue;
    }

    if (item._type === "quoteWithAuthor") {
      const quote = portableToPlain(item.quote) || item.text || "";
      const author = item.authorName || item.author || "";
      if (quote) out.push(textBlock(`“${quote}”`, "blockquote", item._key));
      if (author) out.push(textBlock(author, "normal", `${item._key}-by`));
      continue;
    }

    if (item._type === "sideNote") {
      const note = portableToPlain(item.body || item.content) || item.text;
      if (note) out.push(textBlock(`Note: ${note}`, "normal", item._key));
      continue;
    }

    if (item._type === "videoEmbed" || item._type === "codeSandbox") {
      out.push(
        textBlock(
          `[Embedded ${item._type} omitted in seed import]`,
          "normal",
          item._key,
        ),
      );
    }
  }

  return out;
}

async function main() {
  console.log(`Source: ${SOURCE_PROJECT}/${SOURCE_DATASET}`);
  console.log(`Target: ${targetProjectId}/${targetDataset}${dryRun ? " (dry-run)" : ""}`);

  const [categories, people, posts] = await Promise.all([
    querySource(`*[_type=="postCategory"]{_id,title,"slug":slug.current}`),
    querySource(`*[_type=="person"]{_id,title,name,"slug":slug.current,bio,image{asset->{_id,url}}}`),
    querySource(`*[_type=="post"]|order(date desc){
      _id,title,intro,date,slug,
      heroImage{alt,asset->{_id,url}},
      authors[]->{_id,title,name,"slug":slug.current},
      categories[]->{_id,title,"slug":slug.current},
      content
    }`),
  ]);

  const selectedPosts = posts.slice(0, Number.isFinite(limit) ? limit : posts.length);
  console.log(
    `Fetched ${categories.length} categories, ${people.length} people, ${posts.length} posts → seeding ${selectedPosts.length}`,
  );

  // Categories
  for (const category of categories) {
    const slug = category.slug || slugify(category.title);
    const doc = {
      _id: `category-${slug}`,
      _type: "category",
      title: category.title,
      slug: { _type: "slug", current: slug },
      description: `Imported from basement.studio (${category.title})`,
    };
    console.log(`category: ${doc.title}`);
    if (!dryRun) await target.createOrReplace(doc);
  }

  // Authors referenced by selected posts
  const authorIds = new Set(
    selectedPosts.flatMap((post) => (post.authors || []).map((author) => author._id)),
  );
  const authors = people.filter((person) => authorIds.has(person._id));

  for (const person of authors) {
    const name = person.title || person.name || "Author";
    const slug = person.slug || slugify(name);
    let avatar;
    if (person.image?.asset?.url) {
      avatar = await uploadImageFromUrl(person.image.asset.url, `author-${slug}`);
      if (avatar) avatar.alt = name;
    }
    const doc = {
      _id: `author-${slug}`,
      _type: "author",
      name,
      slug: { _type: "slug", current: slug },
      bio: typeof person.bio === "string" ? person.bio : portableToPlain(person.bio),
      ...(avatar ? { avatar } : {}),
    };
    console.log(`author: ${doc.name}`);
    if (!dryRun) await target.createOrReplace(doc);
  }

  // Posts
  for (const [index, post] of selectedPosts.entries()) {
    const slug = post.slug?.current || post.slug;
    if (!slug) continue;

    console.log(`post (${index + 1}/${selectedPosts.length}): ${post.title}`);

    const heroUrl = post.heroImage?.asset?.url || null;
    let coverImage;
    if (heroUrl) {
      coverImage = await uploadImageFromUrl(heroUrl, `cover-${slug}`);
      if (coverImage) {
        coverImage.alt = post.heroImage?.alt || post.title;
      }
    }

    const inlineImages = new Map();
    for (const block of post.content || []) {
      if (block?._type !== "image") continue;
      const url =
        block.asset?.url ||
        (await resolveSourceImageUrl(block));
      if (!url) continue;
      const uploaded = await uploadImageFromUrl(url, `inline-${slug}-${block._key}`);
      if (uploaded) inlineImages.set(block._key || block.asset?._ref, uploaded);
    }

    const body = transformContent(post.content, inlineImages);
    const intro = portableToPlain(post.intro);
    const excerpt =
      intro.slice(0, 240) ||
      portableToPlain(body.filter((b) => b.style === "normal").slice(0, 1));

    const authorRefs = (post.authors || [])
      .map((author) => {
        const name = author.title || author.name;
        const authorSlug = author.slug || slugify(name);
        if (!authorSlug) return null;
        return {
          _type: "reference",
          _ref: `author-${authorSlug}`,
          _key: hashKey(authorSlug),
        };
      })
      .filter(Boolean);

    const categoryRefs = (post.categories || [])
      .map((category) => {
        const categorySlug = category.slug || slugify(category.title);
        if (!categorySlug) return null;
        return {
          _type: "reference",
          _ref: `category-${categorySlug}`,
          _key: hashKey(categorySlug),
        };
      })
      .filter(Boolean);

    const doc = {
      _id: `post-${slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: slug },
      intro: intro || undefined,
      excerpt: excerpt || undefined,
      publishedAt: post.date || new Date().toISOString(),
      isFeatured: index === 0,
      ...(coverImage ? { coverImage } : {}),
      authors: authorRefs,
      categories: categoryRefs,
      body,
      seo: {
        title: post.title,
        description: excerpt || undefined,
      },
    };

    if (!dryRun) await target.createOrReplace(doc);
  }

  // Singletons
  const home = {
    _id: "homePage",
    _type: "homePage",
    title:
      "Research, insights, and the science behind building brands & websites.",
    knowledgeTitle: "Knowledge Is Meant to Be Shared",
    featuredPosts: selectedPosts.slice(0, 1).map((post) => ({
      _type: "reference",
      _ref: `post-${post.slug?.current || post.slug}`,
      _key: hashKey(post.slug?.current || post.slug),
    })),
  };

  const settings = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "basement. Journal",
    description:
      "Research, insights, and the science behind building brands & websites.",
    navigation: [
      { _key: "n1", _type: "navItem", label: "Showcase", href: "#" },
      { _key: "n2", _type: "navItem", label: "Services", href: "#" },
      { _key: "n3", _type: "navItem", label: "People", href: "#" },
      { _key: "n4", _type: "navItem", label: "Laboratory", href: "#" },
      { _key: "n5", _type: "navItem", label: "Blog", href: "/" },
      { _key: "n6", _type: "navItem", label: "Ventures", href: "#" },
    ],
    footer: {
      text: "© basement.studio LLC. All rights reserved.",
      links: [
        { _key: "f1", _type: "navItem", label: "Home", href: "/" },
        { _key: "f2", _type: "navItem", label: "Blog", href: "/" },
      ],
    },
    seo: {
      title: "basement. Journal",
      description:
        "Research, insights, and the science behind building brands & websites.",
    },
  };

  console.log("singletons: homePage + siteSettings");
  if (!dryRun) {
    await target.createOrReplace(home);
    await target.createOrReplace(settings);
  }

  console.log(dryRun ? "Dry run complete." : "Seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
