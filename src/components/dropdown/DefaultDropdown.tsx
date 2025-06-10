import { Dropdown } from "@/components/dropdown/Dropdown";

export interface DropdownProps<T> {
  label?: string;
  placeholder?: string;
  selectedItem?: T;
  optionList?: Array<T>;
  onSelect?: (value: T) => void;
  getKey?: (item: T) => string | number;
  getLabel?: (item: T) => string;
}
export default function DefaultDropdown<T extends string | object>({
  label,
  placeholder = "옵션을 선택해 주세요",
  selectedItem,
  optionList = [],
  onSelect,
  getKey = (item: T) => String(item),
  getLabel = (item: T) => String(item),
}: DropdownProps<T>) {
  return (
    <Dropdown>
      <Dropdown.Label label={label} />
      <div className="relative">
        <Dropdown.Selected
          placeholder={placeholder}
          selected={selectedItem ? getLabel(selectedItem) : ""}
          disabled={optionList.length === 0}
        />
        <Dropdown.SelectArea>
          {optionList.map((el) => (
            <Dropdown.Item key={getKey(el)} onSelect={() => onSelect?.(el)}>
              {getLabel(el)}
            </Dropdown.Item>
          ))}
        </Dropdown.SelectArea>
      </div>
    </Dropdown>
  );
}
