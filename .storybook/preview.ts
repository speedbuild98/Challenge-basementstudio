import type { Preview } from "@storybook/nextjs-vite";

import "../app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "black",
      values: [
        { name: "black", value: "#000000" },
        { name: "section-light", value: "#e6e6e6" },
        { name: "white", value: "#ffffff" },
      ],
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
