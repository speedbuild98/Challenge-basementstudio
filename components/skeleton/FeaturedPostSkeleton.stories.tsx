import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FeaturedPostSkeleton } from "@/components/skeleton/FeaturedPostSkeleton";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Skeleton/FeaturedPostSkeleton",
  component: FeaturedPostSkeleton,
  tags: ["autodocs"],
  decorators: [darkSurface],
} satisfies Meta<typeof FeaturedPostSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
