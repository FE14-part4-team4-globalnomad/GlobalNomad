import type { Preview } from "@storybook/nextjs";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    options: {
      storySort: {
        order: [
          "Foundation",
          "Common Components",
          "Components",
          [
            "Layout",
            ["Logo", "Gnb", "SideMenu", "Footer"],
            "Card",
            "Calendar",
            "Search",
          ],
        ],
      },
    },
  },
};

export default preview;
