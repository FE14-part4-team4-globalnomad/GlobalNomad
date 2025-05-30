import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "GlobalNomad Design System",
    // brandImage: require("./logo.png"),
    fontBase: "Pretendard",
    fontCode: "monospace",
  }),
});
