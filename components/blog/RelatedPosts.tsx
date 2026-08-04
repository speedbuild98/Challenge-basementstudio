import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/ui/Text";
import { resolvePostCoverSrc } from "@/lib/content/post-image";
import type { PostCard as PostCardType } from "@/types/content";

type RelatedPostsProps = {
  posts: PostCardType[];
};

/**
 * Desktop 9:703 — title 38 stacked · gap ~101 · cards gap 32
 * Mobile 158:4873 — title 40 single line · title→cards 48 · stacked gap 12
 */
export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  const items = posts.slice(0, 3).map((post) => ({
    ...post,
    coverSrc: resolvePostCoverSrc(post, 872, 274),
  }));

  return (
    <section className="mt-20 border-t border-white/10 pb-10 pt-12 md:mt-32 md:pb-[6.75rem] md:pt-20">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-[6.3rem]">
          <Reveal y={18}>
            <Text
              as="h2"
              className="shrink-0 font-sans font-semibold tracking-[var(--tracking-display)] text-[#e6e6e6] [font-size:var(--text-display)] [font-weight:var(--font-weight-semibold)] [line-height:var(--leading-display)] md:w-[133px] md:whitespace-pre-line md:tracking-[var(--tracking-h1)] md:[font-size:var(--text-h1)] md:[line-height:var(--leading-h1)]"
            >
              <span className="md:hidden">Related Posts</span>
              <span className="hidden md:inline">{"Related\nPosts"}</span>
            </Text>
          </Reveal>

          <Stagger className="min-w-0 flex-1" y={18} stagger={0.09}>
            <ul className="grid gap-3 md:grid-cols-3 md:gap-8">
              {items.map((post) => (
                <li key={post._id} data-stagger-item className="min-w-0">
                  <PostCard post={post} variant="media" tone="dark" />
                </li>
              ))}
            </ul>
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
