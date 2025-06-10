import { Dropdown } from "./Dropdown";
import { ACTIVITY_SORT_FILTER } from "@/constants/activity";

type SortOptionType = (typeof ACTIVITY_SORT_FILTER)[0];
interface SortDropdownProps<T> {
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
          <Dropdown.Selected selected={selectedItem.title} />
          <Dropdown.SelectArea>
            {ACTIVITY_SORT_FILTER.map(({ id, title }) => (
              <Dropdown.Item
                key={id}
                onSelect={() => onSelect?.({ id, title })}
              >
                {title}
              </Dropdown.Item>
            ))}
          </Dropdown.SelectArea>
        </div>
      </Dropdown>
    </div>
  );
}
