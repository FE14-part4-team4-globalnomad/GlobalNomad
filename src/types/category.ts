import { ReactNode } from "react";

export type Category = {
  id: string;
  label: string;
  icon: ReactNode;
};

export type CategoryFilterProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};
