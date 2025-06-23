import { useEffect, useState } from "react";

import activityService from "@/apis/activity/activity.service";
import { SortOptionType } from "@/app/(DefaultLayout)/(MainLayout)/components/SortDropdown";
import { ActivityType, ActivityCategoryType } from "@/types/activity";

export const useActivities = (
  category: ActivityCategoryType | "",
  sort: SortOptionType["id"],
  page: number,
  size: number,
) => {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await activityService.getActivities({
          query: {
            method: "offset",
            category: category || undefined,
            sort,
            page,
            size,
          },
        });
        setActivities(response.data.activities);
        setTotalPages(Math.ceil(response.data.totalCount / size));
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, [category, sort, page, size]);

  return { activities, totalPages };
};

export const usePopularActivities = () => {
  const [popularActivities, setPopularActivities] = useState<ActivityType[]>(
    [],
  );

  useEffect(() => {
    const fetchPopularActivities = async () => {
      try {
        const response = await activityService.getActivities({
          query: {
            method: "offset",
            sort: "most_reviewed",
          },
        });
        setPopularActivities(response.data.activities);
      } catch (error) {
        console.error("Error fetching popular activities:", error);
      }
    };
    fetchPopularActivities();
  }, []);

  return { popularActivities };
};
