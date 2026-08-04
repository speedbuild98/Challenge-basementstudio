import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HomeHero } from "@/components/sections/HomeHero";
import { demoHome } from "@/lib/content/demo";
import { mockPost } from "@/test/fixtures/post";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Sections/HomeHero",
  component: HomeHero,
  tags: ["autodocs"],
  decorators: [darkSurface],
  parameters: { layout: "fullscreen" },
  args: {
    title: demoHome.title!,
    eyebrow: "Journal",
    featured: mockPost,
  },
} satisfies Meta<typeof HomeHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
