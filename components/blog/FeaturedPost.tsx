import Link from "next/link";

import { PostImage } from "@/components/blog/PostImage";
import { Magnetic } from "@/components/motion/Magnetic";
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

/**
 * Figma 19:1008 — 902×394, gap 48, pl-16 pr-8 py-8, image 483×360, copy 325.
 */
export function FeaturedPost({ post, className }: FeaturedPostProps) {
  const href = ROUTES.post(post.slug);

  return (
    <article
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-white/20 bg-[var(--color-card-frost-dark)] p-4 backdrop-blur-md md:py-2 md:pl-4 md:pr-2",
        className,
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
        <Link
          href={href}
          className="relative aspect-[334/194] w-full overflow-hidden rounded-md md:aspect-auto md:h-[360px] md:w-[483px] md:shrink-0"
          tabIndex={-1}
          aria-hidden
        >
          <PostImage
            post={post}
            priority
            width={483}
            height={360}
            sizes="(max-width: 768px) 100vw, 483px"
          />
        </Link>

        <div className="flex w-full flex-col justify-center gap-6 py-2 md:h-[360px] md:max-w-[325px]">
          <div className="flex flex-col gap-4">
            <Text
              as="time"
              variant="caption"
              className="text-muted-foreground"
              dateTime={post.publishedAt}
            >
              {formatPostDate(post.publishedAt)}
            </Text>
            <Text
              as="h2"
              variant="h1"
              className="whitespace-pre-line text-white"
            >
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
              <Text
                variant="body"
                className="line-clamp-3 text-muted-foreground"
              >
                {post.excerpt}
              </Text>
            ) : null}
          </div>
          <Magnetic strength={14} className="inline-flex w-fit">
            <Button href={href} variant="accent">
              Read full blog post
            </Button>
          </Magnetic>
        </div>
      </div>
    </article>
  );
}
