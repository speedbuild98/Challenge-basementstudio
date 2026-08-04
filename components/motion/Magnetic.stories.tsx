import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Motion/Magnetic",
  component: Magnetic,
  tags: ["autodocs"],
  decorators: [darkSurface],
} satisfies Meta<typeof Magnetic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Magnetic>
      <Button href="#contact" variant="contact">
        Contact Us
      </Button>
    </Magnetic>
  ),
};
