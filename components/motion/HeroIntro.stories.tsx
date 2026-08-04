import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeroIntro } from "@/components/motion/HeroIntro";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Motion/HeroIntro",
  component: HeroIntro,
  tags: ["autodocs"],
  decorators: [darkSurface],
} satisfies Meta<typeof HeroIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HeroIntro>
      <p data-hero-meta className="mb-2 text-orange">
        Journal
      </p>
      <h1 data-hero-title className="text-4xl text-white">
        Research, insights, and the science behind building brands.
      </h1>
    </HeroIntro>
  ),
};
