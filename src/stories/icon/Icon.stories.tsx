import type { Meta, StoryObj } from "@storybook/nextjs";

import * as svg from "@/assets/icons";
import { Icon } from "@/components/icon/Icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [...Object.keys(svg), "NONE"],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconExample1: Story = {
  args: {
    name: "Calendar",
    size: 40,
    color: "black",
  },
};
export const IconExample2: Story = {
  args: {
    name: "Calendar",
    size: 40,
    className: "text-brand-500",
  },
};
