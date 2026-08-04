import Link from "next/link";

import { PostImage } from "@/components/blog/PostImage";
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
  className?: string;
};

export function PostCard({
  post,
  variant = "media",
  className,
}: PostCardProps) {
  const href = ROUTES.post(post.slug);

  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-card-frost)] p-6 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] hover:-translate-y-1",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        {variant === "media" ? (
          <Link
            href={href}
            className="relative block h-[137px] overflow-hidden rounded-[var(--radius-md)]"
            tabIndex={-1}
            aria-hidden
          >
            <PostImage post={post} sizes="(max-width: 768px) 100vw, 436px" />
          </Link>
        ) : null}

        <div className="flex flex-col gap-4">
          <Text
            as="time"
            variant="caption"
            className="text-black/70"
            dateTime={post.publishedAt}
          >
            {formatPostDate(post.publishedAt)}
          </Text>
          <Text as="h3" variant="h2" className="text-black">
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
                    tone="light"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <Button href={href} variant="secondary">
          Read more
        </Button>
      </div>
    </article>
  );
}
