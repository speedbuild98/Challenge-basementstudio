import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PostCard } from "@/components/blog/PostCard";
import { mockPost } from "@/test/fixtures/post";
import { darkSurface, lightSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Blog/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  args: {
    post: mockPost,
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightMedia: Story = {
  decorators: [lightSurface],
  args: { tone: "light", variant: "media" },
};

export const LightText: Story = {
  decorators: [lightSurface],
  args: { tone: "light", variant: "text" },
};

export const DarkRelated: Story = {
  decorators: [darkSurface],
  args: { tone: "dark", variant: "media" },
};
