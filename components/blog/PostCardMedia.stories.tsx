import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PostCardMedia } from "@/components/blog/PostCardMedia";
import { lightSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Blog/PostCardMedia",
  component: PostCardMedia,
  tags: ["autodocs"],
  decorators: [lightSurface],
  args: {
    href: "/blog/hello",
    src: "/brand/basement-logo.svg",
    alt: "Demo cover",
  },
} satisfies Meta<typeof PostCardMedia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
