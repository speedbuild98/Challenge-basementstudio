import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PostImageClient } from "@/components/blog/PostImageClient";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Blog/PostImageClient",
  component: PostImageClient,
  tags: ["autodocs"],
  decorators: [darkSurface],
} satisfies Meta<typeof PostImageClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSrc: Story = {
  args: {
    src: "/brand/basement-logo.svg",
    alt: "basement logo",
  },
  render: (args) => (
    <div className="relative h-40 w-72 overflow-hidden rounded-md bg-white/5">
      <PostImageClient {...args} />
    </div>
  ),
};

export const Fallback: Story = {
  args: {
    src: null,
    alt: "Missing cover",
  },
  render: (args) => (
    <div className="relative h-40 w-72 overflow-hidden rounded-md">
      <PostImageClient {...args} />
    </div>
  ),
};
