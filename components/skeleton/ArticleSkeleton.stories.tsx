import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleSkeleton } from "@/components/skeleton/ArticleSkeleton";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Skeleton/ArticleSkeleton",
  component: ArticleSkeleton,
  tags: ["autodocs"],
  decorators: [darkSurface],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ArticleSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
