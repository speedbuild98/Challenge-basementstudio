import { PostImageClient } from "@/components/blog/PostImageClient";
import { resolvePostCoverSrc } from "@/lib/content/post-image";
import type { PostCard } from "@/types/content";

type PostImageProps = {
  post: PostCard;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

/** Server wrapper: resolves Sanity URLs, then hydrates the client image UI. */
export function PostImage({
  post,
  className,
  sizes,
  priority = false,
  width = 1200,
  height = 675,
}: PostImageProps) {
  const src = resolvePostCoverSrc(post, width, height);
  const alt = post.coverImage?.alt || post.title;

  return (
    <PostImageClient
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
