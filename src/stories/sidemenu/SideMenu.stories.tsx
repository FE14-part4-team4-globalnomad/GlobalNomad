import type { Meta, StoryObj } from "@storybook/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SideMenu from "@/components/sidemenu/SideMenu";
import { useAuthStore } from "@/store/authStore";
import "../../styles/globals.css";

const meta: Meta<typeof SideMenu> = {
  title: "Components/SideMenu",
  component: SideMenu,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  render: () => {
    useAuthStore.setState({ isLoggedIn: false });
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <SideMenu />
      </QueryClientProvider>
    );
  },
};
