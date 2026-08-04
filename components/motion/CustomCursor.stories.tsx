import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CustomCursor } from "@/components/motion/CustomCursor";

const meta = {
  title: "Motion/CustomCursor",
  component: CustomCursor,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CustomCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-16 text-[#e6e6e6]">
      <CustomCursor />
      <p className="mb-2 font-mono text-xs uppercase tracking-[-0.01em] text-orange">
        Editorial cursor
      </p>
      <h1 className="mb-6 max-w-lg text-4xl font-semibold tracking-[-0.03em]">
        Orange core · glass ring
      </h1>
      <a
        href="#demo"
        className="mr-3 inline-flex bg-orange px-3 py-2 font-mono text-sm uppercase text-black"
      >
        Hover link
      </a>
      <button
        type="button"
        className="inline-flex bg-[#2e2e2e] px-3 py-2 font-mono text-sm uppercase text-[#e6e6e6]"
      >
        Click button
      </button>
      <div className="mt-16 rounded-2xl bg-[#e6e6e6] p-10 text-black">
        Light section — ring stays readable without blend hacks.
      </div>
    </div>
  ),
};
