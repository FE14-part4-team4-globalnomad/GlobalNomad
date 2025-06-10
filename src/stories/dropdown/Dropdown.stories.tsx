import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import DefaultDropdown from "@/components/dropdown/DefaultDropdown";
import { ACTIVITY_SORT_FILTER } from "@/constants/activity";
import "../../styles/globals.css";

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

export const DefaultDropdownStringType: Story = {
  args: { label: "예제 1", optionList: ["A", "B", "C", "D", "E", "F", "G"] },
  render: (args) => {
    const [item, setItem] = useState<string>();
    return (
      <div className="w-[80vw] tablet:w-64">
        <DefaultDropdown<string>
          label={args.label}
          optionList={args.optionList as Array<string>}
          selectedItem={item}
          onSelect={(value: string) => setItem(value)}
        />
      </div>
    );
  },
};

type filterType = (typeof ACTIVITY_SORT_FILTER)[0];

export const DefaultDropdownObjectType: Story = {
  render: () => {
    const [item, setItem] = useState<filterType>();
    return (
      <div className="w-[80vw] tablet:w-64">
        <DefaultDropdown<filterType>
          label="예제 2"
          optionList={ACTIVITY_SORT_FILTER}
          selectedItem={item}
          onSelect={(value: filterType) => setItem(value)}
          getKey={(item: filterType) => item.id}
          getLabel={(item: filterType) => item.title}
        />
      </div>
    );
  },
};
