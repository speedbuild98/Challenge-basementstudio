import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text";
import { resolvePostCoverSrc } from "@/lib/content/post-image";
import type { PostCard as PostCardType } from "@/types/content";

type RelatedPostsProps = {
  posts: PostCardType[];
};

/**
 * Figma Blog Post 9:703 related:
 * title 38 / 133px · cards x≈508 · gap 32 · p-16
 * cards bottom → Desktop Footer (y=3193) = 108px
 */
export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  const items = posts.slice(0, 3).map((post) => ({
    ...post,
    coverSrc: resolvePostCoverSrc(post),
  }));

  return (
    <section className="mt-20 border-t border-white/10 pb-10 pt-12 md:mt-32 md:pb-[6.75rem] md:pt-20">
      <Container>
        {/* Figma 9:703: title 38 stacked 133px · gap ~101 · cards p-16 gap 32 */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-[6.3rem]">
          <Text
            as="h2"
            variant="h1"
            className="shrink-0 whitespace-pre-line text-white md:w-[133px]"
          >
            {"Related\nPosts"}
          </Text>

          <ul className="grid min-w-0 flex-1 gap-3 md:grid-cols-3 md:gap-8">
            {items.map((post) => (
              <li key={post._id} className="min-w-0">
                <PostCard post={post} variant="media" tone="dark" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
