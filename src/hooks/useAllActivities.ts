import { useQuery } from "@tanstack/react-query";

import activityService from "@/apis/activity/activity.service";
import { SortOptionType } from "@/app/(DefaultLayout)/(MainLayout)/components/SortDropdown";
import { ActivityType } from "@/types/activity";

type UseAllActivitiesParams = {
  page: number;
  size: number;
  sort: SortOptionType["id"];
  keyword?: string;
};

type UseAllActivitiesResult = {
  activities: ActivityType[];
  totalCount: number;
};

export const useAllActivities = ({
  page,
  size,
  sort,
  keyword = "",
}: UseAllActivitiesParams) => {
  return useQuery<UseAllActivitiesResult>({
    queryKey: ["allActivities", page, size, sort, keyword],
    queryFn: async () => {
      const response = await activityService.getActivities({
        query: {
          method: "offset",
          page,
          size,
          sort,
          keyword: keyword || undefined,
        },
      });
      return {
        activities: response.data.activities,
        totalCount: response.data.totalCount,
      };
    },
  });
};