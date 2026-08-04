import { FilterBar } from "@/components/blog/FilterBar";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { KnowledgeGridList } from "@/components/sections/KnowledgeGridList";
import { Text } from "@/components/ui/Text";
import { formatKnowledgeTitle } from "@/lib/content/knowledge-title";
import { resolvePostCoverSrc } from "@/lib/content/post-image";
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

/**
 * Figma Desktop Blog 19:993 (light band):
 * pt 58 · title 755 · title→filters 192 · filters gap 40 · filters→grid 55 · grid gap 32
 * Mobile 155:4213: pt ~13 · title→filters ~155 · filters→grid ~11 · grid gap 12
 */
export function KnowledgeGrid({
  title,
  posts,
  categories,
  activeCategory = null,
  emptyMessage = "No posts published yet.",
}: KnowledgeGridProps) {
  const unique = uniqueById(posts).map((post) => ({
    ...post,
    coverSrc: resolvePostCoverSrc(post),
  }));
  const heading = formatKnowledgeTitle(title);

  return (
    <section
      id="knowledge"
      className="scroll-mt-24 bg-section-light text-section-light-fg"
    >
      <Container className="pb-16 pt-3 md:pb-[4.75rem] md:pt-[3.625rem]">
        <Reveal y={40}>
          <Text
            as="h2"
            variant="display"
            className="max-w-[14.4rem] whitespace-pre-line text-black md:max-w-[755px]"
          >
            {heading}
          </Text>
        </Reveal>

        {/* Mobile title→filters ~155 · Desktop 192 */}
        <Reveal delay={0.08} y={20} className="mt-[9.6875rem] md:mt-[12rem]">
          <FilterBar categories={categories} activeSlug={activeCategory} />
        </Reveal>

        {!unique.length ? (
          <p className="mt-8 text-[length:var(--text-body)] text-[#666] md:mt-[3.45rem]">
            {emptyMessage}
          </p>
        ) : (
          <KnowledgeGridList posts={unique} />
        )}
      </Container>
    </section>
  );
}
