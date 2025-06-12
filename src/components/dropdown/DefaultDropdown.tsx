import { Dropdown } from "@/components/dropdown/Dropdown";

export interface DropdownProps<
  OptionType extends Array<{ id: string | number; title: string }>,
> {
  label?: string;
  placeholder?: string;
  selectedItem?: OptionType[number];
  optionList?: OptionType;
  onSelect?: (value: OptionType[number]) => void;
}
export default function DefaultDropdown<
  OptionType extends Array<{ id: string | number; title: string }>,
>({
  label,
  placeholder = "옵션을 선택해 주세요",
  selectedItem,
  optionList,
  onSelect,
}: DropdownProps<OptionType>) {
  // TODO: 모바일 대응 (select 태그 사용)
  return (
    <Dropdown>
      <Dropdown.Label label={label} />
      <div className="relative">
        <Dropdown.Selected
          placeholder={placeholder}
          selected={selectedItem?.title}
          disabled={!optionList}
        />
        <Dropdown.SelectArea>
          {optionList?.map((el: OptionType[number]) => (
            <Dropdown.Item key={el.id} onSelect={() => onSelect?.(el)}>
              {el.title}
            </Dropdown.Item>
          ))}
        </Dropdown.SelectArea>
      </div>
    </Dropdown>
  );
}
