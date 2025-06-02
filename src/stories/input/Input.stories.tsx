import type { Meta, StoryObj } from "@storybook/nextjs";

import Input from "../../components/input/Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일을 입력해주세요",
  },
};

export const Password: Story = {
  args: {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
  },
};

export const WithError: Story = {
  args: {
    label: "이메일",
    error: "이메일 형식이 잘못되었습니다",
    placeholder: "이메일을 입력해주세요",
  },
};
