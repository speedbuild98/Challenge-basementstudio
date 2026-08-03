import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { Container } from "@/components/layout/Container";
import { OrangeGlow } from "@/components/layout/OrangeGlow";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/ui/Text";
import type { PostCard } from "@/types/content";

type HomeHeroProps = {
  title: string;
  featured?: PostCard | null;
};

export function HomeHero({ title, featured }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
      <OrangeGlow />
      <Container className="relative z-10">
        <Reveal>
          <Text
            as="h1"
            variant="display"
            className="max-w-[16ch] text-balance text-white"
          >
            {title}
          </Text>
        </Reveal>

        {featured ? (
          <Reveal delay={0.08} className="mx-auto mt-16 max-w-[902px] md:mt-20">
            <FeaturedPost post={featured} />
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
