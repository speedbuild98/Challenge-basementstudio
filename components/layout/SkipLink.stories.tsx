import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SkipLink } from "@/components/layout/SkipLink";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Layout/SkipLink",
  component: SkipLink,
  tags: ["autodocs"],
  decorators: [darkSurface],
  parameters: {
    docs: {
      description: {
        component: "Tab once to reveal the skip link.",
      },
    },
  },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
