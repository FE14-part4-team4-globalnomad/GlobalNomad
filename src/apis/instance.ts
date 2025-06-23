import axios from "axios";

import {
  responseInterceptorForError,
  updateHeaderWithToken,
} from "@/utils/axiosInterceptors";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(updateHeaderWithToken);

axiosInstance.interceptors.response.use(
  (res) => res,
  responseInterceptorForError,
);

export default axiosInstance;
