import type { Meta, StoryObj } from "@storybook/nextjs";

import SideMenu from "@/components/sidemenu/SideMenu";

const meta: Meta<typeof SideMenu> = {
  title: "Components/SideMenu",
  component: SideMenu,
};

export default meta;
type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {};
