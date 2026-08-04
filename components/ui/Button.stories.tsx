import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/Button";
import { darkSurface, lightSurface } from "@/test/storybook/decorators";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Read more",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  decorators: [darkSurface],
  args: { variant: "accent", href: "/blog/hello" },
};

export const Secondary: Story = {
  decorators: [lightSurface],
  args: { variant: "secondary", href: "/blog/hello" },
};

export const Contact: Story = {
  decorators: [darkSurface],
  args: { variant: "contact", children: "Contact Us", href: "#contact" },
};

export const Ghost: Story = {
  decorators: [darkSurface],
  args: { variant: "ghost", children: "Menu" },
};
