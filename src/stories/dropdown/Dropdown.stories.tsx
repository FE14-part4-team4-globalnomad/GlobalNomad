import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import DefaultDropdown from "@/components/dropdown/DefaultDropdown";
import { ACTIVITY_SORT_FILTER } from "@/constants/activity";

const meta = {
  title: "Components/Dropdown/Default Dropdown",
  component: DefaultDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DefaultDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

type filterType = typeof ACTIVITY_SORT_FILTER;

export const DefaultDropdownExample: Story = {
  render: () => {
    const [item, setItem] = useState<filterType[number]>();
    return (
      <div className="w-[80vw] tablet:w-64">
        <DefaultDropdown<filterType>
          label="예제"
          optionList={ACTIVITY_SORT_FILTER}
          selectedItem={item}
          onSelect={(value: filterType[number]) => setItem(value)}
        />
      </div>
    );
  },
};
