import { Meta, StoryObj } from "@storybook/nextjs-vite";

import Logo from "@/components/logo/Logo";

const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: () => <Logo />,
};
