import { useEffect, useState } from "react";

import { Dropdown } from "@/components/dropdown/Dropdown";
import { TIME_OPTIONS } from "@/utils/timeoptions";

interface TimeSelectDropdownProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TimeSelectDropdown({
  label,
  value,
  onChange,
  placeholder,
}: TimeSelectDropdownProps) {
  const selectedOption = TIME_OPTIONS.find((t) => t.id === value);

  const [responsivePlaceholder, setResponsivePlaceholder] = useState("00:00");

  // 반응형 placeholder 결정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setResponsivePlaceholder("00:00");
      } else {
        setResponsivePlaceholder("0:00");
      }
    };

    handleResize(); // mount 시 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-[6px] w-[150px]">
      {label && <label className="text-14-m text-gray-800">{label}</label>}
      <Dropdown>
        <div className="relative">
          <Dropdown.Selected
            variant="no-outline"
            selected={
              selectedOption?.title || placeholder || responsivePlaceholder
            }
          />
          <Dropdown.SelectArea>
            {TIME_OPTIONS.map(({ id, title }) => (
              <Dropdown.Item key={id} onSelect={() => onChange(id)}>
                {title}
              </Dropdown.Item>
            ))}
          </Dropdown.SelectArea>
        </div>
      </Dropdown>
    </div>
  );
}
