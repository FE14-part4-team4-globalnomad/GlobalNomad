import axios from "axios";

import { responseInterceptorForError } from "@/utils/axiosInterceptors";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  responseInterceptorForError,
);

export default axiosInstance;
