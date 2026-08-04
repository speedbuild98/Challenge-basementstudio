import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArchiveSkeleton } from "@/components/skeleton/ArchiveSkeleton";
import { lightSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Skeleton/ArchiveSkeleton",
  component: ArchiveSkeleton,
  tags: ["autodocs"],
  decorators: [lightSurface],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ArchiveSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
