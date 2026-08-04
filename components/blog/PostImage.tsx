"use client";

import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { useState } from "react";

import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils/cn";
import type { PostCard } from "@/types/content";

type PostImageProps = {
  post: PostCard;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

function resolveSrc(post: PostCard, width: number, height: number) {
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

function BrandPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center bg-black",
        className,
      )}
      aria-hidden
    >
      <Image
        src="/brand/basement-logo.svg"
        alt=""
        width={123}
        height={46}
        className="h-6 w-auto opacity-90 md:h-7"
      />
    </div>
  );
}

export function PostImage({
  post,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  width = 1200,
  height = 675,
}: PostImageProps) {
  const src = resolveSrc(post, width, height);
  const [failed, setFailed] = useState(false);
  const alt = post.coverImage?.alt || post.title;

  if (!src || failed) {
    return <BrandPlaceholder className={className} />;
  }

  return (
    <>
      {/* Fallback under the image if remote asset paints blank/fails */}
      <BrandPlaceholder className={cn("absolute inset-0", className)} />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
        onError={() => setFailed(true)}
      />
    </>
  );
}
