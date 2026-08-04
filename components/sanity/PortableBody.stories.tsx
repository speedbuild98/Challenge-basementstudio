import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { PortableTextBlock } from "@portabletext/types";

import { PortableBody } from "@/components/sanity/PortableBody";
import { darkSurface } from "@/test/storybook/decorators";

const sampleBody = [
  {
    _type: "block",
    _key: "h2",
    style: "h2",
    markDefs: [],
    children: [
      { _type: "span", _key: "s0", text: "Why this matters", marks: [] },
    ],
  },
  {
    _type: "block",
    _key: "p1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "Portable Text keeps article content editable in Sanity while staying typed in the frontend.",
        marks: [],
      },
    ],
  },
] as PortableTextBlock[];

const meta = {
  title: "Sanity/PortableBody",
  component: PortableBody,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    value: sampleBody,
  },
} satisfies Meta<typeof PortableBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
