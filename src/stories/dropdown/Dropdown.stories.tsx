import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Dropdown } from "@/components/dropdown/Dropdown";
import "../../styles/globals.css";

interface DropdownExampleProps<T> {
  label?: string;
  placeholder?: string;
  selectedItem?: T;
  optionList?: Array<T>;
  onSelect?: (value: T) => void;
}
function DropdownExample({
  label,
  placeholder = "옵션을 선택해 주세요",
  selectedItem,
  optionList = [],
  onSelect,
}: DropdownExampleProps<string>) {
  return (
    <Dropdown>
      <Dropdown.Label label={label} />
      <div className="relative">
        <Dropdown.Selected
          placeholder={placeholder}
          selected={selectedItem}
          disabled={optionList.length === 0}
        />
        <Dropdown.SelectArea>
          {optionList.map((el) => (
            <Dropdown.Item key={el} onSelect={() => onSelect?.(el)}>
              {el}
            </Dropdown.Item>
          ))}
        </Dropdown.SelectArea>
      </div>
    </Dropdown>
  );
}

const meta = {
  title: "Components/Dropdown",
  component: DropdownExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleDropdown: Story = {
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
