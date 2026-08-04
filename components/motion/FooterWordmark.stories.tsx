import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FooterWordmark } from "@/components/motion/FooterWordmark";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Motion/FooterWordmark",
  component: FooterWordmark,
  tags: ["autodocs"],
  decorators: [darkSurface],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FooterWordmark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
