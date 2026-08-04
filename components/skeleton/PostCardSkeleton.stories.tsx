import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PostCardSkeleton } from "@/components/skeleton/PostCardSkeleton";
import { lightSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Skeleton/PostCardSkeleton",
  component: PostCardSkeleton,
  tags: ["autodocs"],
  decorators: [lightSurface],
} satisfies Meta<typeof PostCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Media: Story = { args: { variant: "media" } };
export const TextOnly: Story = { args: { variant: "text" } };
