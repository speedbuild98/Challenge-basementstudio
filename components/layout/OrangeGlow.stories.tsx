import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrangeGlow } from "@/components/layout/OrangeGlow";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Layout/OrangeGlow",
  component: OrangeGlow,
  tags: ["autodocs"],
  decorators: [darkSurface],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof OrangeGlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative h-[420px] overflow-hidden bg-black">
      <OrangeGlow />
      <p className="relative z-10 p-8 text-white">Hero glow backdrop</p>
    </div>
  ),
};
