import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { Container } from "@/components/layout/Container";
import { OrangeGlow } from "@/components/layout/OrangeGlow";
import { Text } from "@/components/ui/Text";
import type { PostCard } from "@/types/content";

type HomeHeroProps = {
  title: string;
  eyebrow?: string | null;
  featured?: PostCard | null;
};

export function HomeHero({ title, eyebrow, featured }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
      <OrangeGlow />
      <Container className="relative z-10">
        {eyebrow ? (
          <Text variant="meta" className="mb-4 text-orange">
            {eyebrow}
          </Text>
        ) : null}
        {/* LCP: keep H1 + featured statically visible (no Motion opacity:0). */}
        <Text
          as="h1"
          variant="display"
          className="max-w-[16ch] text-balance text-white"
        >
          {title}
        </Text>

        {featured ? (
          <div className="mx-auto mt-16 max-w-[902px] md:mt-20">
            <FeaturedPost post={featured} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
