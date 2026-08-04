import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AnimatedGlow } from "@/components/motion/AnimatedGlow";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Motion/AnimatedGlow",
  component: AnimatedGlow,
  tags: ["autodocs"],
  decorators: [darkSurface],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AnimatedGlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative h-[420px] overflow-hidden bg-black">
      <AnimatedGlow />
      <p className="relative z-10 p-8 text-white">Animated orange glow</p>
    </div>
  ),
};
