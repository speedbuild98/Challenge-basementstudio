import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { mockPostDetail } from "@/test/fixtures/post";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Blog/ArticleHeader",
  component: ArticleHeader,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    post: mockPostDetail,
  },
} satisfies Meta<typeof ArticleHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
