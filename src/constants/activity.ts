export const ACTIVITY_CATEGORIES = [
  "문화 · 예술",
  "식음료",
  "스포츠",
  "투어",
  "관광",
  "웰빙",
];

export type SortOptionId =
  | "latest"
  | "price_asc"
  | "price_desc"
  | "most_reviewed";

export interface SortOption {
  id: SortOptionId;
  title: string;
}

export const ACTIVITY_SORT_FILTER: SortOption[] = [
  { id: "latest", title: "최신순" },
  { id: "price_asc", title: "가격 낮은 순" },
  { id: "price_desc", title: "가격 높은 순" },
  { id: "most_reviewed", title: "인기순" },
];
