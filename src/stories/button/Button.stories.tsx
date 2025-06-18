import type { Meta, StoryObj } from "@storybook/nextjs";

import Button from "@/components/button/Button";
import type { ButtonProps } from "@/types/button";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: [
        "calendar",
        "chooseModal",
        "empty",
        "experienceRegister",
        "experienceRegister2",
        "modal",
        "myInfo",
        "reservation",
        "review",
        "reviewModal",
        "search",
        "sign",
      ],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
    fullWidth: {
      control: "boolean",
    },
    rounded: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "버튼",
    size: "sign",
    variant: "primary",
    fullWidth: false,
    rounded: true,
    disabled: false,
  },
};
