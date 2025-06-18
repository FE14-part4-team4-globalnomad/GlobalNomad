import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  previewHead: (head) => `
    ${head}
  <style type="text/css">
    @font-face {
      font-family: "Pretendard";
      font-weight: 500;
      src: url("/fonts/Pretendard-Medium.woff2") format("woff2");
    }
    @font-face {
      font-family: "Pretendard";
      font-weight: 600;
      src: url("/fonts/Pretendard-SemiBold.woff2") format("woff2");
    }
    @font-face {
      font-family: "Pretendard";
      font-weight: 700;
      src: url("/fonts/Pretendard-Bold.woff2") format("woff2");
    }
  </style>
  `,
  webpackFinal: async (config) => {
    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;
      if (!test) return false;
      return test.test(".svg");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as { [key: string]: any };

    imageRule.exclude = /\.svg?$/;

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
export default config;
