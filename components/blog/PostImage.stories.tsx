import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PostImage } from "@/components/blog/PostImage";
import { mockPost } from "@/test/fixtures/post";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Blog/PostImage",
  component: PostImage,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    post: mockPost,
    width: 640,
    height: 360,
  },
  render: (args) => (
    <div className="relative h-[220px] w-full max-w-xl overflow-hidden rounded-md">
      <PostImage {...args} className="object-cover" />
    </div>
  ),
} satisfies Meta<typeof PostImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
