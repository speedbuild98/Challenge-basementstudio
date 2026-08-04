import Link from "next/link";

import { PostImage } from "@/components/blog/PostImage";
import { Button } from "@/components/ui/Button";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { Text } from "@/components/ui/Text";
import { ROUTES } from "@/lib/constants";
import { formatPostDate } from "@/lib/utils/format-date";
import { cn } from "@/lib/utils/cn";
import type { PostCard } from "@/types/content";

type FeaturedPostProps = {
  post: PostCard;
  className?: string;
};

export function FeaturedPost({ post, className }: FeaturedPostProps) {
  const href = ROUTES.post(post.slug);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-card-frost-dark)] p-2 pl-4",
        className,
      )}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <Link
          href={href}
          className="relative aspect-[482/360] w-full overflow-hidden rounded-[var(--radius-md)] md:max-w-[482px] md:shrink-0"
          tabIndex={-1}
          aria-hidden
        >
          <PostImage
            post={post}
            priority
            sizes="(max-width: 768px) 100vw, 482px"
          />
        </Link>

        <div className="flex max-w-[325px] flex-col justify-center gap-6 py-4 pr-2 md:min-h-[360px]">
          <div className="flex flex-col gap-4">
            <Text
              as="time"
              variant="caption"
              className="text-muted-foreground"
              dateTime={post.publishedAt}
            >
              {formatPostDate(post.publishedAt)}
            </Text>
            <Text as="h2" variant="h1" className="text-white whitespace-pre-line">
              <Link
                href={href}
                className="transition-colors duration-[var(--duration-fast)] hover:text-orange"
              >
                {post.title.includes(" - ")
                  ? post.title.replace(" - ", "\n- ")
                  : post.title}
              </Link>
            </Text>
            {post.categories?.length ? (
              <ul className="flex flex-wrap gap-1">
                {post.categories.map((category) => (
                  <li key={category._id}>
                    <CategoryPill
                      label={category.title}
                      href={ROUTES.category(category.slug)}
                      tone="dark"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
            {post.excerpt ? (
              <Text variant="body" className="text-muted-foreground">
                {post.excerpt}
              </Text>
            ) : null}
          </div>
          <Button href={href} variant="accent">
            Read full blog post
          </Button>
        </div>
      </div>
    </article>
  );
}
