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
 * Desktop Figma 19:1008 — 902×394 · pl-16 pr-8 py-8 · gap 48 · image 483×360.
 * Mobile Figma 155:4364 — 366×360 · p-16 · image 110 · stack · title 24 · no stroke (Glass).
 */
export function FeaturedPost({ post, className }: FeaturedPostProps) {
  const href = ROUTES.post(post.slug);

  return (
    <article
      className={cn(
        "glass-card-dark flex w-full max-w-[902px] flex-col justify-between overflow-hidden",
        "rounded-[11.424px] p-4 md:h-[394px] md:rounded-2xl md:p-0 md:py-2 md:pl-4 md:pr-2",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:h-full md:flex-row md:items-center md:gap-12">
        <Link
          href={href}
          className="relative h-[110px] w-full shrink-0 overflow-hidden rounded-md md:h-[360px] md:w-[483px]"
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

        <div className="flex w-full min-w-0 flex-1 flex-col md:h-[360px] md:max-w-[325px] md:flex-none md:justify-center md:gap-6">
          {/* Mobile copy gap 8 · Desktop stack gap 16 */}
          <div className="flex flex-col gap-2 md:gap-4">
            <Text
              as="time"
              variant="caption"
              className="leading-none text-[#c4c4c4]"
              dateTime={post.publishedAt}
            >
              {formatPostDate(post.publishedAt)}
            </Text>
            <Text
              as="h2"
              className={cn(
                "whitespace-pre-line text-[#e6e6e6]",
                // Mobile: 24/1.1/-3% · Desktop: 38/0.95/-4%
                "font-sans font-semibold tracking-[var(--tracking-h2)] [font-size:var(--text-h2)] [line-height:var(--leading-h2)] [font-weight:var(--font-weight-semibold)]",
                "md:tracking-[var(--tracking-h1)] md:[font-size:var(--text-h1)] md:[line-height:var(--leading-h1)]",
              )}
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
              <ul className="flex flex-wrap gap-1 md:gap-1">
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
                className="line-clamp-3 text-[#c4c4c4]"
              >
                {post.excerpt}
              </Text>
            ) : null}
          </div>

          <Magnetic strength={14} className="mt-4 inline-flex w-fit md:mt-0">
            <Button href={href} variant="accent">
              Read full blog post
            </Button>
          </Magnetic>
        </div>
      </div>
    </article>
  );
}
