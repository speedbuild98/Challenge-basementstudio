import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MobileNav } from "@/components/layout/MobileNav";
import { demoNav } from "@/lib/content/demo";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Layout/MobileNav",
  component: MobileNav,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    items: demoNav,
    activeHref: "/",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof MobileNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
