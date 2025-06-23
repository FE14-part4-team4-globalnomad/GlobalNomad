import { useEffect, useState } from "react";

export const useResponsiveSlider = () => {
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 1280) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(4);
      }
    };

    const updateItemsPerPage = () => {
      if (window.innerWidth < 769) {
        setItemsPerPage(6);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(8);
      }
    };

    updateItemsPerSlide();
    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerSlide);
    window.addEventListener("resize", updateItemsPerPage);
    return () => {
      window.removeEventListener("resize", updateItemsPerSlide);
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  return { itemsPerSlide, itemsPerPage };
};
