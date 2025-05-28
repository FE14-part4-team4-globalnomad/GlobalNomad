import axios from "axios";

import { isTokenRequired } from "@/utils/axiosInterceptors";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const url = config.url ?? "";

  return {
    ...config,
    withCredentials: isTokenRequired(url),
  };
});

export default axiosInstance;
