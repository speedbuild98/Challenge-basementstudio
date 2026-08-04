import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeGrid } from "@/components/sections/KnowledgeGrid";
import { demoCategories, demoPosts } from "@/lib/content/demo";
import { lightSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Sections/KnowledgeGrid",
  component: KnowledgeGrid,
  tags: ["autodocs"],
  decorators: [lightSurface],
  parameters: { layout: "fullscreen" },
  args: {
    title: "Knowledge Is Meant to Be Shared",
    posts: demoPosts,
    categories: demoCategories,
  },
} satisfies Meta<typeof KnowledgeGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filtered: Story = {
  args: { activeCategory: "web-design" },
};
