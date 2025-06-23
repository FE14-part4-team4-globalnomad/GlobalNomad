import { useQuery } from "@tanstack/react-query";

import activityService from "@/apis/activity/activity.service";

export const useAllActivities = () => {
  return useQuery({
    queryKey: ["allActivities"],
    queryFn: () =>
      activityService
        .getActivities({
          query: {
            method: "offset",
            page: 1,
            size: 1000,
          },
        })
        .then((res) => res.data.activities),
  });
};
