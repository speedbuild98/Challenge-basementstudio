import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { demoNav } from "@/lib/content/demo";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Layout/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    navigation: demoNav,
    activeHref: "/",
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
