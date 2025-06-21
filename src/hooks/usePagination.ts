import { useState } from "react";

export const usePagination = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  return { currentPage, setCurrentPage };
};
