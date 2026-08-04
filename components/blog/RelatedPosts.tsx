import Link from "next/link";

import { PostImage } from "@/components/blog/PostImage";
import { Button } from "@/components/ui/Button";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { Text } from "@/components/ui/Text";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/lib/constants";
import { formatPostDate } from "@/lib/utils/format-date";
import type { PostCard } from "@/types/content";

type RelatedPostsProps = {
  posts: PostCard[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="mt-24 border-t border-white/10 pt-16 md:mt-32 md:pt-20">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
          <Text
            as="h2"
            variant="h1"
            className="shrink-0 text-white lg:w-[140px]"
          >
            Related
            <br />
            Posts
          </Text>

          <ul className="grid flex-1 gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <li key={post._id}>
                <article className="flex h-full flex-col justify-between rounded-[var(--radius-xl)] bg-[var(--color-card-frost-dark)] p-4">
                  <div className="flex flex-col gap-6">
                    <Link
                      href={ROUTES.post(post.slug)}
                      className="relative block h-[137px] overflow-hidden rounded-[var(--radius-md)]"
                      tabIndex={-1}
                      aria-hidden
                    >
                      <PostImage
                        post={post}
                        sizes="(max-width: 768px) 100vw, 436px"
                      />
                    </Link>
                    <div className="flex flex-col gap-4">
                      <Text
                        as="time"
                        variant="caption"
                        className="text-muted-foreground"
                        dateTime={post.publishedAt}
                      >
                        {formatPostDate(post.publishedAt)}
                      </Text>
                      <Text as="h3" variant="h2" className="text-white">
                        <Link
                          href={ROUTES.post(post.slug)}
                          className="transition-colors hover:text-orange"
                        >
                          {post.title}
                        </Link>
                      </Text>
                      {post.categories?.[0] ? (
                        <CategoryPill
                          label={post.categories[0].title}
                          href={ROUTES.category(post.categories[0].slug)}
                          tone="dark"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button href={ROUTES.post(post.slug)} variant="accent">
                      Read more
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
