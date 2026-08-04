import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { Container } from "@/components/layout/Container";
import { AnimatedGlow } from "@/components/motion/AnimatedGlow";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { Text } from "@/components/ui/Text";
import { formatHeroTitle } from "@/lib/content/hero-title";
import type { PostCard } from "@/types/content";

type HomeHeroProps = {
  title: string;
  eyebrow?: string | null;
  featured?: PostCard | null;
};

/**
 * Figma Desktop Blog (19:993) / Mobile Blog (155:4213):
 * desktop: title@171 · featured@671 (~296 below title) · light@1350 (~286 after card)
 * mobile: title@63 · featured@307 (~100 below title) · light@768 (~101 after card)
 */
export function HomeHero({ title, eyebrow, featured }: HomeHeroProps) {
  const heroTitle = formatHeroTitle(title);

  return (
    <section className="relative overflow-hidden pb-[6.3rem] pt-3 md:pb-[17.875rem] md:pt-[6.125rem]">
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
            className="max-w-[13.9em] whitespace-pre-line text-white"
            data-hero-title
          >
            {heroTitle}
          </Text>

          {featured ? (
            <div
              className="mx-auto mt-[6.25rem] w-full max-w-[902px] md:mt-[18.5rem]"
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
