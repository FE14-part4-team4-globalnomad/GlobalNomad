import { Meta, StoryObj } from "@storybook/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import Gnb from "@/components/gnb/Gnb";
import { useAuthStore } from "@/store/authStore";

const queryClient = new QueryClient();

const meta: Meta<typeof Gnb> = {
  title: "Components/Layout/Gnb",
  component: Gnb,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
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
