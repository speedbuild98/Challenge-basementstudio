import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { JsonLd } from "@/components/motion/JsonLd";
import { darkSurface } from "@/test/storybook/decorators";

const meta = {
  title: "Motion/JsonLd",
  component: JsonLd,
  tags: ["autodocs"],
  decorators: [darkSurface],
  args: {
    data: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Demo article",
    },
  },
  render: (args) => (
    <div>
      <p className="mb-4 text-sm text-white/70">
        JSON-LD is injected as a script tag (inspect DOM).
      </p>
      <JsonLd {...args} />
    </div>
  ),
} satisfies Meta<typeof JsonLd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
