import { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";

import Gnb from "@/components/gnb/Gnb";
import { useAuthStore } from "@/store/authStore";

const meta: Meta<typeof Gnb> = {
  title: "Components/Layout/Gnb",
  component: Gnb,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Gnb>;

export const LoggedOut: Story = {
  render: () => {
    useAuthStore.setState({ isLoggedIn: false });
    return <Gnb />;
  },
};

export const LoggedIn: Story = {
  render: () => {
    useAuthStore.setState({ isLoggedIn: true });
    return <Gnb />;
  },
};
