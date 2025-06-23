import Image from "next/image";

import bus from "@/assets/icons/category/icon_bus.svg?url";
import food from "@/assets/icons/category/icon_food.svg?url";
import music from "@/assets/icons/category/icon_music.svg?url";
import tour from "@/assets/icons/category/icon_tour.svg?url";
import wellbeing from "@/assets/icons/category/icon_wellbeing.svg?url";
import { Category, CategoryFilterProps as Props } from "@/types/category";

const categories: Category[] = [
  {
    id: "culture",
    label: "문화 · 예술",
    icon: <Image src={music} alt="문화·예술" width={20} height={20} />,
  },
  {
    id: "food",
    label: "식음료",
    icon: <Image src={food} alt="식음료" width={20} height={20} />,
  },
  {
    id: "tour",
    label: "투어",
    icon: <Image src={tour} alt="투어" width={20} height={20} />,
  },
  {
    id: "sightseeing",
    label: "관광",
    icon: <Image src={bus} alt="관광" width={20} height={20} />,
  },
  {
    id: "wellbeing",
    label: "웰빙",
    icon: <Image src={wellbeing} alt="웰빙" width={20} height={20} />,
  },
];

export default function CategoryFilter({ onSelect }: Props) {
  return (
    <div className="flex gap-2 w-[58rem] h-[4.4rem] ">
      {categories.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className="flex flex-row items-center justify-center gap-1 border border-gray-200 rounded-full text-sm h-full px-1.5"
        >
          <div className="flex items-center justify-center shrink-0">
            {icon}
          </div>
          <span className="text-xs whitespace-nowrap">{label}</span>
        </button>
      ))}
    </div>
  );
}
