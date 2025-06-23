import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import activityService from "@/apis/activity/activity.service";

export const usePostActivityImage = () => {
  function getAccessToken() {
    try {
      const raw = localStorage.getItem("auth-storage");
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      return parsed.state?.accessToken || null;
    } catch (err) {
      console.error("토큰 파싱 실패", err);
      return null;
    }
  }
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const token = getAccessToken();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/activities/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data.activityImageUrl;
    },
  });
};

export const useGetActivityById = (id: number) => {
  return useQuery({
    queryKey: ["activity", id],
    queryFn: () => activityService.getActivity({ activityId: id }),
    enabled: !!id,
    select: (data) => data.data,
  });
};
