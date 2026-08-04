import Link from "next/link";

import { PostCardMedia } from "@/components/blog/PostCardMedia";
import { Button } from "@/components/ui/Button";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { Text } from "@/components/ui/Text";
import { ROUTES } from "@/lib/constants";
import { formatPostDate } from "@/lib/utils/format-date";
import { cn } from "@/lib/utils/cn";
import type { PostCard as PostCardType } from "@/types/content";

type PostCardProps = {
  post: PostCardType;
  variant?: "media" | "text";
  /** light = knowledge grid; dark = article related */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Figma Blog Post Small:
 * desktop light media 436×400 p-24 · text 436×250 p-24 · image 137
 * mobile light p-16 · image 110 · gap 16 · related dark p-16
 * No cover → text layout (no brand/empty placeholder).
 */
export function PostCard({
  post,
  variant = "media",
  tone = "light",
  className,
}: PostCardProps) {
  const href = ROUTES.post(post.slug);
  const isDark = tone === "dark";
  const coverSrc = post.coverSrc ?? post.coverUrl ?? null;
  const showImage = variant === "media" && Boolean(coverSrc);

  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between overflow-hidden rounded-2xl border backdrop-blur-xl transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] hover:-translate-y-1",
        isDark
          ? "border-white/20 bg-[var(--color-card-frost-dark)] p-4"
          : "border-black/[0.06] bg-[var(--color-card-frost)] p-4 md:p-6",
        !isDark && showImage && "md:min-h-[400px]",
        !isDark && !showImage && "md:min-h-[250px]",
        isDark && showImage && "md:min-h-[400px]",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col",
          showImage ? "gap-4 md:gap-6" : "gap-4",
        )}
      >
        {showImage && coverSrc ? (
          <PostCardMedia
            href={href}
            src={coverSrc}
            alt={post.coverImage?.alt || post.title}
          />
        ) : null}

        {/* Figma copy stack gap 16 · date #666 13 · title 24/1.1/-3% */}
        <div className="flex flex-col gap-4">
          <Text
            as="time"
            variant="caption"
            className={cn(
              "leading-none",
              isDark ? "text-muted-foreground" : "text-[#666]",
            )}
            dateTime={post.publishedAt}
          >
            {formatPostDate(post.publishedAt)}
          </Text>
          <Text
            as="h3"
            variant="h2"
            className={cn(
              "line-clamp-2 tracking-[var(--tracking-h2)]",
              isDark ? "text-white" : "text-black",
            )}
          >
            <Link
              href={href}
              className="transition-colors duration-[var(--duration-fast)] hover:text-orange focus-visible:text-orange"
            >
              {post.title}
            </Link>
          </Text>
          {post.categories?.length ? (
            <ul className="flex flex-wrap gap-1">
              {post.categories.map((category) => (
                <li key={category._id}>
                  <CategoryPill
                    label={category.title}
                    href={ROUTES.category(category.slug)}
                    tone={isDark ? "dark" : "light"}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Button href={href} variant={isDark ? "accent" : "secondary"}>
          Read more
        </Button>
      </div>
    </article>
  );
}
