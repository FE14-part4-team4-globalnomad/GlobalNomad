import { Dropdown } from "@/components/dropdown/Dropdown";

interface DropdownExampleProps<T> {
  label?: string;
  placeholder?: string;
  selectedItem?: T;
  optionList?: Array<T>;
  onSelect?: (value: T) => void;
}
export default function DropdownExample({
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
