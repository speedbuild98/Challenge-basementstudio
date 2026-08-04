import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HomeSkeleton } from "@/components/skeleton/HomeSkeleton";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Skeleton/HomeSkeleton",
  component: HomeSkeleton,
  tags: ["autodocs"],
  decorators: [darkSurface],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HomeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
