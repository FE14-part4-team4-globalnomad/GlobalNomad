import { useEffect, useState } from "react";

import { ActivityType } from "@/types/activity";

export const useAutoSlider = (activities: ActivityType[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const extendedActivities =
    activities.length > 0 ? [...activities, activities[0]] : [];

  useEffect(() => {
    if (activities.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= activities.length) {
          return 1;
        }
        return prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [activities]);

  useEffect(() => {
    if (currentIndex === activities.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
        const slider = document.getElementById("slider-track");
        if (slider) {
          slider.style.transition = "none";
          slider.style.transform = `translateX(0%)`;
          void slider.offsetWidth;
          slider.style.transition = "";
        }
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, activities.length]);

  return { currentIndex, extendedActivities };
};
