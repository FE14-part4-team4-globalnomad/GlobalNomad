import { Dropdown } from "./Dropdown";
import { ACTIVITY_SORT_FILTER } from "@/constants/activity";

type SortOptionType = (typeof ACTIVITY_SORT_FILTER)[0];
interface SortDropdownProps<T> {
  label?: string;
  placeholder?: string;
  selectedItem: T;
  onSelect?: (value: T) => void;
}
export default function SortDropdown({
  selectedItem,
  onSelect,
}: SortDropdownProps<SortOptionType>) {
  return (
    <div className="w-[150px]">
      <Dropdown variant="no-outline">
        <div className="relative">
          <Dropdown.Selected selected={selectedItem.text} />
          <Dropdown.SelectArea>
            {ACTIVITY_SORT_FILTER.map(({ value, text }) => (
              <Dropdown.Item
                key={value}
                onSelect={() => onSelect?.({ value, text })}
              >
                {text}
              </Dropdown.Item>
            ))}
          </Dropdown.SelectArea>
        </div>
      </Dropdown>
    </div>
  );
}
