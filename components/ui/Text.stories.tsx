import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Text } from "@/components/ui/Text";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "UI/Text",
  component: Text,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    children: "basement.studio",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = { args: { variant: "display", as: "h1" } };
export const H1: Story = { args: { variant: "h1", as: "h1" } };
export const H2: Story = { args: { variant: "h2", as: "h2" } };
export const Body: Story = { args: { variant: "body" } };
export const Meta: Story = { args: { variant: "meta", children: "Journal" } };
export const Caption: Story = {
  args: { variant: "caption", children: "Dec 3, 2025" },
};
