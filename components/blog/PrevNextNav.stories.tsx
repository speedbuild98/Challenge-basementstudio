import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PrevNextNav } from "@/components/blog/PrevNextNav";
import { mockPosts } from "@/test/fixtures/post";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Blog/PrevNextNav",
  component: PrevNextNav,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    previous: mockPosts[0],
    next: mockPosts[1],
  },
} satisfies Meta<typeof PrevNextNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Both: Story = {};
export const PreviousOnly: Story = { args: { next: null } };
export const NextOnly: Story = { args: { previous: null } };
