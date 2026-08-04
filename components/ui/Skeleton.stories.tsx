import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "@/components/ui/Skeleton";
import { darkSurface, lightSurface } from "@/test/storybook/decorators";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: {
    className: "h-8 w-48",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  decorators: [darkSurface],
  args: { tone: "dark" },
};

export const Light: Story = {
  decorators: [lightSurface],
  args: { tone: "light" },
};
