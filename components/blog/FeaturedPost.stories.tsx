import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { mockPost } from "@/test/fixtures/post";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Blog/FeaturedPost",
  component: FeaturedPost,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    post: mockPost,
  },
} satisfies Meta<typeof FeaturedPost>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
