import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeGridList } from "@/components/sections/KnowledgeGridList";
import { demoPosts } from "@/lib/content/demo";
import { lightSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Sections/KnowledgeGridList",
  component: KnowledgeGridList,
  tags: ["autodocs"],
  decorators: [lightSurface],
  args: {
    posts: demoPosts,
  },
} satisfies Meta<typeof KnowledgeGridList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
