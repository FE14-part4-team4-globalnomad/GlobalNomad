import { useEffect, useState } from "react";

import activityService from "@/apis/activity/activity.service";
import { ActivityType } from "@/types/activity";

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
