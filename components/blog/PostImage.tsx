import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils/cn";
import type { PostCard } from "@/types/content";

type PostImageProps = {
  post: PostCard;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

function resolveSrc(post: PostCard) {
  if (post.coverUrl) return post.coverUrl;
  if (post.coverImage?.asset) {
    try {
      return urlForImage(post.coverImage as SanityImageSource)
        .width(1200)
        .height(675)
        .url();
    } catch {
      return null;
    }
  }
  return null;
}

export function PostImage({
  post,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: PostImageProps) {
  const src = resolveSrc(post);
  const alt = post.coverImage?.alt || post.title;

  if (!src) {
    return (
      <div
        className={cn("bg-dark-grey size-full", className)}
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
