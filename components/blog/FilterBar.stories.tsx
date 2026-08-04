import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FilterBar } from "@/components/blog/FilterBar";
import { demoCategories } from "@/lib/content/demo";
import { lightSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Blog/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  decorators: [lightSurface],
  args: {
    categories: demoCategories,
  },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPosts: Story = {};
export const ActiveCategory: Story = {
  args: { activeSlug: "web-design" },
};
