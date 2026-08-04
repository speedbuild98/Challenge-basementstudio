import type { SanityImageSource } from "@sanity/image-url";

import { urlForImage } from "@/lib/sanity/image";
import type { PostCard } from "@/types/content";

/** Resolve cover URL on the server — never import this from client components. */
export function resolvePostCoverSrc(
  post: PostCard,
  width = 1200,
  height = 675,
): string | null {
  if (post.coverUrl) return post.coverUrl;
  if (post.coverImage?.asset) {
    try {
      return urlForImage(post.coverImage as SanityImageSource)
        .width(width)
        .height(height)
        .fit("crop")
        .url();
    } catch {
      return null;
    }
  }
  return null;
}
