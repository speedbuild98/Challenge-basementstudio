import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Container } from "@/components/layout/Container";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    children: <div className="bg-white/10 p-4">Container content</div>,
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Narrow: Story = { args: { width: "narrow" } };
export const Wide: Story = { args: { width: "wide" } };
