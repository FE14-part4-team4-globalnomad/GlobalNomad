import { Meta, StoryObj } from "@storybook/nextjs";

import Logo from "@/components/logo/Logo";

const meta: Meta<typeof Logo> = {
  title: "Components/Layout/Logo",
  component: Logo,
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: () => <Logo />,
};
