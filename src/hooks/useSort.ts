import { useState } from "react";

import type { SortOptionType } from "@/app/(DefaultLayout)/(MainLayout)/components/SortDropdown";

export const useSort = () => {
  const [sortOption, setSortOption] = useState<SortOptionType>({
    id: "latest",
    title: "최신순",
  });

  return { sortOption, setSortOption };
};
