import { FilterBar } from "@/components/blog/FilterBar";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text";
import type { CategoryRef, PostCard as PostCardType } from "@/types/content";

type KnowledgeGridProps = {
  title: string;
  posts: PostCardType[];
  categories: CategoryRef[];
  activeCategory?: string | null;
};

export function KnowledgeGrid({
  title,
  posts,
  categories,
  activeCategory = null,
}: KnowledgeGridProps) {
  const withMedia = posts.filter((post) => post.coverUrl || post.coverImage);
  const textOnly = posts.filter((post) => !post.coverUrl && !post.coverImage);

  // Prefer Figma rhythm: first row media cards, second row text cards when available
  const mediaRow = (withMedia.length ? withMedia : posts).slice(0, 3);
  const textRow =
    textOnly.length > 0
      ? textOnly.slice(0, 3)
      : posts.slice(3, 6).map((post) => ({ ...post }));

  return (
    <section className="bg-section-light text-section-light-fg">
      <Container className="py-16 md:py-24">
        <Text
          as="h2"
          variant="display"
          className="max-w-[12ch] text-balance text-black"
        >
          {title}
        </Text>

        <FilterBar
          categories={categories}
          activeSlug={activeCategory}
          className="mt-10 md:mt-14"
        />

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {mediaRow.map((post) => (
            <PostCard key={post._id} post={post} variant="media" />
          ))}
        </div>

        {textRow.length ? (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {textRow.map((post) => (
              <PostCard
                key={`text-${post._id}`}
                post={post}
                variant="text"
              />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
