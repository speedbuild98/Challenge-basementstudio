import { FilterBar } from "@/components/blog/FilterBar";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/ui/Text";
import type { CategoryRef, PostCard as PostCardType } from "@/types/content";

type KnowledgeGridProps = {
  title: string;
  posts: PostCardType[];
  categories: CategoryRef[];
  activeCategory?: string | null;
  emptyMessage?: string;
};

function uniqueById(posts: PostCardType[]) {
  const seen = new Set<string>();
  return posts.filter((post) => {
    if (seen.has(post._id)) return false;
    seen.add(post._id);
    return true;
  });
}

export function KnowledgeGrid({
  title,
  posts,
  categories,
  activeCategory = null,
  emptyMessage = "No posts published yet.",
}: KnowledgeGridProps) {
  const unique = uniqueById(posts);
  const withMedia = unique.filter((post) => post.coverUrl || post.coverImage);
  const withoutMedia = unique.filter(
    (post) => !post.coverUrl && !post.coverImage,
  );

  const mediaRow = withMedia.slice(0, 3);
  const mediaIds = new Set(mediaRow.map((post) => post._id));
  const textCandidates = [
    ...withoutMedia,
    ...unique.filter((post) => !mediaIds.has(post._id)),
  ];
  const textRow = uniqueById(textCandidates).slice(0, 3);

  return (
    <section className="bg-section-light text-section-light-fg">
      <Container className="py-16 md:py-24">
        <Reveal y={40}>
          <Text
            as="h2"
            variant="display"
            className="max-w-[12ch] text-balance text-black"
          >
            {title}
          </Text>
        </Reveal>

        <Reveal delay={0.08} y={20} className="mt-10 md:mt-14">
          <FilterBar categories={categories} activeSlug={activeCategory} />
        </Reveal>

        {!unique.length ? (
          <p className="mt-10 text-[length:var(--text-body)] text-black/70">
            {emptyMessage}
          </p>
        ) : (
          <Stagger className="mt-8 space-y-8" stagger={0.1}>
            <div className="grid gap-8 md:grid-cols-3">
              {mediaRow.map((post) => (
                <div key={post._id} data-stagger-item>
                  <PostCard post={post} variant="media" />
                </div>
              ))}
            </div>

            {textRow.length ? (
              <div className="grid gap-8 md:grid-cols-3">
                {textRow.map((post) => (
                  <div key={`text-${post._id}`} data-stagger-item>
                    <PostCard post={post} variant="text" />
                  </div>
                ))}
              </div>
            ) : null}
          </Stagger>
        )}
      </Container>
    </section>
  );
}
