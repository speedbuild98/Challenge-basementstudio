import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Reveal } from "@/components/motion/Reveal";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Motion/Reveal",
  component: Reveal,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    children: <p className="text-2xl text-white">Revealed content</p>,
  },
} satisfies Meta<typeof Reveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
