import { useState } from "react";

import type { ActivityCategoryType } from "@/types/activity";

export const useCategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    ActivityCategoryType | ""
  >("");

  const handleCategorySelect = (id: string) => {
    const labelMap: Record<string, ActivityCategoryType> = {
      culture: "문화 · 예술",
      food: "식음료",
      tour: "투어",
      sightseeing: "관광",
      wellbeing: "웰빙",
    };
    setSelectedCategory(labelMap[id]);
  };

  return { selectedCategory, handleCategorySelect };
};
