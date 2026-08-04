import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Stagger } from "@/components/motion/Stagger";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Motion/Stagger",
  component: Stagger,
  tags: ["autodocs"],
  decorators: [darkSurface],
} satisfies Meta<typeof Stagger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stagger className="space-y-3">
      {["One", "Two", "Three"].map((item) => (
        <p key={item} data-stagger-item className="text-white">
          {item}
        </p>
      ))}
    </Stagger>
  ),
};
