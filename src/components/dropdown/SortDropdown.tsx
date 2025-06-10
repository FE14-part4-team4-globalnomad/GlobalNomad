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
  // TODO: 모바일 대응 (select 태그 사용)
  return (
    <div className="w-[150px]">
      <Dropdown>
        <div className="relative">
          <Dropdown.Selected
            variant="no-outline"
            selected={selectedItem.title}
          />
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
