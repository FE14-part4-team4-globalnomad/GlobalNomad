import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import "../../styles/globals.css";
import DropdownExample from "./DropdownExample";

const meta = {
  title: "Components/Dropdown/Default Dropdown",
  component: DropdownExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleDefaultDropdown: Story = {
  args: { label: "예제", optionList: ["A", "B", "C", "D", "E", "F", "G"] },
  render: (args) => {
    const [item, setItem] = useState<string>();
    return (
      <div className="w-[80vw] tablet:w-64">
        <DropdownExample
          label={args.label}
          optionList={args.optionList}
          selectedItem={item}
          onSelect={setItem}
        />
      </div>
    );
  },
};
