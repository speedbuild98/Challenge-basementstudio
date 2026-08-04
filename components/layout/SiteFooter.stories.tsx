import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Layout/SiteFooter",
  component: SiteFooter,
  tags: ["autodocs"],
  decorators: [darkSurface],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
