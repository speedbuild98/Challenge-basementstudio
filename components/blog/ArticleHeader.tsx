import Link from "next/link";

import { PostImage } from "@/components/blog/PostImage";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { Text } from "@/components/ui/Text";
import { ROUTES } from "@/lib/constants";
import { formatPostDate } from "@/lib/utils/format-date";
import type { PostDetail } from "@/types/content";

type ArticleHeaderProps = {
  post: PostDetail;
};

/**
 * Figma Blog Post 9:703 / Mobile 158:4873:
 * go-back @181 desktop / @96 mobile · stack gap 60 · cover 1372×472
 */
export function ArticleHeader({ post }: ArticleHeaderProps) {
  const authors =
    post.authors?.map((author) => author.name).filter(Boolean).join(", ") ||
    null;

  return (
    <header className="pt-[2.75rem] md:pt-[6.75rem]">
      <div className="flex flex-col gap-2">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-mono text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-meta)] text-white transition-colors hover:text-orange"
        >
          ← Go back
        </Link>
        <div className="border-t border-white/15" />
      </div>

      <div className="mt-[3.75rem] flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <Text
          as="h1"
          variant="h1"
          className="max-w-[12ch] text-balance text-white lg:max-w-[304px]"
        >
          {post.title}
        </Text>

        <div className="flex max-w-[553px] flex-col gap-6">
          {post.intro ? (
            <Text variant="h2Regular" className="text-white">
              {post.intro}
            </Text>
          ) : null}
          {post.excerpt ? (
            <Text variant="body" className="text-white">
              {post.excerpt}
            </Text>
          ) : null}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:pl-[min(50%,503px)]">
        <div className="flex flex-wrap items-center gap-2">
          <Text
            as="time"
            variant="caption"
            className="text-white"
            dateTime={post.publishedAt}
          >
            {formatPostDate(post.publishedAt)}
          </Text>
          {authors ? (
            <>
              <span className="size-1 bg-muted-foreground" aria-hidden />
              <Text variant="caption" className="text-white">
                {authors}
              </Text>
            </>
          ) : null}
        </div>
        {post.categories?.length ? (
          <ul className="flex flex-wrap gap-1">
            {post.categories.map((category) => (
              <li key={category._id}>
                <CategoryPill
                  label={category.title}
                  href={ROUTES.category(category.slug)}
                  tone="dark"
                  className="text-white"
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="relative mt-8 aspect-[366/126] w-full overflow-hidden border border-white/20 md:mt-14 md:aspect-[1372/472]">
        <PostImage
          post={post}
          priority
          width={1600}
          height={900}
          sizes="(max-width: 1200px) 100vw, 1372px"
        />
        <span className="absolute left-0 top-0 size-px bg-white" aria-hidden />
        <span className="absolute right-0 top-0 size-px bg-white" aria-hidden />
        <span className="absolute bottom-0 left-0 size-px bg-white" aria-hidden />
        <span className="absolute bottom-0 right-0 size-px bg-white" aria-hidden />
      </div>
    </header>
  );
}
