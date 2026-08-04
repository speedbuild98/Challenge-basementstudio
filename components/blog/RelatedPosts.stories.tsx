import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { mockPosts } from "@/test/fixtures/post";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Blog/RelatedPosts",
  component: RelatedPosts,
  tags: ["autodocs"],
  decorators: [darkSurface],
  parameters: { layout: "fullscreen" },
  args: {
    posts: mockPosts,
  },
} satisfies Meta<typeof RelatedPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
