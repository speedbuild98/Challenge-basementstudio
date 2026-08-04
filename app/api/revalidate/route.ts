import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { CACHE_TAGS } from "@/lib/constants";

const ALLOWED_STATIC_TAGS = new Set<string>([
  CACHE_TAGS.posts,
  CACHE_TAGS.authors,
  CACHE_TAGS.categories,
  CACHE_TAGS.tags,
  CACHE_TAGS.siteSettings,
  CACHE_TAGS.homePage,
]);

const MAX_TAGS = 20;
const MAX_TAG_LENGTH = 120;
const MAX_BODY_BYTES = 8_192;

function isAllowedTag(tag: string) {
  if (!tag || tag.length > MAX_TAG_LENGTH) return false;
  if (ALLOWED_STATIC_TAGS.has(tag)) return true;
  return /^(post|category|tag):[a-z0-9-]+$/i.test(tag);
}

/**
 * Sanity webhook target.
 * Body: { "tags": ["posts", "siteSettings", "post:my-slug"] }
 * Header: x-revalidate-secret
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Payload too large" }, { status: 413 });
  }

  let tags: string[] = [];

  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ message: "Payload too large" }, { status: 413 });
    }
    const body = JSON.parse(raw) as { tags?: unknown };
    if (!Array.isArray(body.tags)) {
      return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }
    tags = body.tags.filter((tag): tag is string => typeof tag === "string");
  } catch {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }

  if (!tags.length || tags.length > MAX_TAGS) {
    return NextResponse.json({ message: "Invalid tags" }, { status: 400 });
  }

  const accepted = [...new Set(tags)].filter(isAllowedTag);
  if (!accepted.length) {
    return NextResponse.json({ message: "No valid tags" }, { status: 400 });
  }

  for (const tag of accepted) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: true, count: accepted.length });
}
