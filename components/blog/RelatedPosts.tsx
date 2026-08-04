import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text";
import { resolvePostCoverSrc } from "@/lib/content/post-image";
import type { PostCard as PostCardType } from "@/types/content";

type RelatedPostsProps = {
  posts: PostCardType[];
};

/**
 * Desktop 9:703 — title 38 stacked 133px · gap ~101 · cards p-16 gap 32 · pb 108.
 * Mobile 158:4873 — title single line · gap 12 · stacked cards gap 12.
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
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-[6.3rem]">
          <Text
            as="h2"
            variant="h1"
            className="shrink-0 text-[#e6e6e6] md:w-[133px] md:whitespace-pre-line"
          >
            <span className="md:hidden">Related Posts</span>
            <span className="hidden md:inline">{"Related\nPosts"}</span>
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
