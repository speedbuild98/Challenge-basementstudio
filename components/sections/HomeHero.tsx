import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { Container } from "@/components/layout/Container";
import { AnimatedGlow } from "@/components/motion/AnimatedGlow";
import { HeroIntro } from "@/components/motion/HeroIntro";
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
      <AnimatedGlow />
      <Container className="relative z-10">
        <HeroIntro>
          {eyebrow ? (
            <Text
              variant="meta"
              className="mb-4 text-orange"
              data-hero-meta
            >
              {eyebrow}
            </Text>
          ) : null}
          <Text
            as="h1"
            variant="display"
            className="max-w-[16ch] text-balance text-white"
            data-hero-title
          >
            {title}
          </Text>

          {featured ? (
            <div
              className="mx-auto mt-16 max-w-[902px] md:mt-20"
              data-hero-media
            >
              <FeaturedPost post={featured} />
            </div>
          ) : null}
        </HeroIntro>
      </Container>
    </section>
  );
}
