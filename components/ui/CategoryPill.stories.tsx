import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CategoryPill } from "@/components/ui/CategoryPill";
import { darkSurface, lightSurface } from "@/test/storybook/decorators";

const meta = {
  title: "UI/CategoryPill",
  component: CategoryPill,
  tags: ["autodocs"],
  args: {
    label: "Design",
    href: "/category/design",
  },
} satisfies Meta<typeof CategoryPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  decorators: [lightSurface],
  args: { tone: "light" },
};

export const Dark: Story = {
  decorators: [darkSurface],
  args: { tone: "dark" },
};
