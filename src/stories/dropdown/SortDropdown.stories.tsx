import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import SortDropdown from "@/components/dropdown/SortDropdown";
import { ACTIVITY_SORT_FILTER } from "@/constants/activity";
import "../../styles/globals.css";

const meta = {
  title: "Components/Dropdown/Sort Filter Dropdown",
  component: SortDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SortDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

type filterType = (typeof ACTIVITY_SORT_FILTER)[0];

export const ExampleSortDropdown: Story = {
  args: {
    selectedItem: { id: "latest", title: "최신 등록 순" },
  },
  render: (args) => {
    const [item, setItem] = useState<filterType>(args.selectedItem);
    return (
      <div className="w-full min-w-32 tablet:min-w-68 flex justify-between items-center">
        <h2 className="text-18-b tablet:text-32-b">🛼 모든 체험</h2>
        <SortDropdown {...args} selectedItem={item} onSelect={setItem} />
      </div>
    );
  },
};
