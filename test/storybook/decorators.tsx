import type { Decorator } from "@storybook/nextjs-vite";

export const darkSurface: Decorator = (Story) => (
  <div className="min-h-[240px] bg-black p-6 text-[#e6e6e6]">
    <Story />
  </div>
);

export const lightSurface: Decorator = (Story) => (
  <div className="min-h-[240px] bg-[#e6e6e6] p-6 text-black">
    <Story />
  </div>
);
