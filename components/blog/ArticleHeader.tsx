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
 * Desktop Blog Post 9:703 — go-back · gap 60 · title 38 | intro 24 · cover 1372×472
 * Mobile 158:4873 — go-back@96 · title 40/0.9/-4% · intro 20 · excerpt 14 · cover 366×126
 */
export function ArticleHeader({ post }: ArticleHeaderProps) {
  const authors =
    post.authors?.map((author) => author.name).filter(Boolean).join(", ") ||
    null;

  return (
    <header className="pt-[2.75rem] md:pt-[6.75rem]">
      <div className="flex flex-col gap-3 md:gap-[60px]">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="inline-flex items-center py-1 font-mono text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-meta)] text-[#e6e6e6] transition-colors hover:text-orange"
          >
            ← Go back
          </Link>
          <div className="border-t border-white/15" />
        </div>

        {/* Mobile: title → ~101px → intro stack · Desktop: 304 | 553 */}
        <div className="flex flex-col gap-[6.375rem] lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <Text
            as="h1"
            className="max-w-[19.4rem] text-balance font-sans font-semibold tracking-[var(--tracking-display)] text-[#e6e6e6] [font-size:var(--text-display)] [font-weight:var(--font-weight-semibold)] [line-height:var(--leading-display)] lg:max-w-[304px] lg:tracking-[var(--tracking-h1)] lg:[font-size:var(--text-h1)] lg:[line-height:var(--leading-h1)]"
          >
            {post.title}
          </Text>

          <div className="flex max-w-[553px] flex-col gap-2 md:gap-6">
            {post.intro ? (
              <Text
                className="font-sans font-normal tracking-[var(--tracking-h2)] text-[#e6e6e6] [font-size:1.25rem] [font-weight:var(--font-weight-regular)] [line-height:1.1] md:tracking-[var(--tracking-h2)] md:[font-size:var(--text-h2)] md:[line-height:var(--leading-h2)]"
              >
                {post.intro}
              </Text>
            ) : null}
            {post.excerpt ? (
              <Text variant="body" className="text-[#e6e6e6]">
                {post.excerpt}
              </Text>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between lg:pl-[min(50%,503px)]">
        <div className="flex flex-wrap items-center gap-2">
          <Text
            as="time"
            variant="caption"
            className="text-[#e6e6e6]"
            dateTime={post.publishedAt}
          >
            {formatPostDate(post.publishedAt)}
          </Text>
          {authors ? (
            <>
              <span className="size-1 bg-[#c4c4c4]" aria-hidden />
              <Text variant="caption" className="text-[#e6e6e6]">
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
