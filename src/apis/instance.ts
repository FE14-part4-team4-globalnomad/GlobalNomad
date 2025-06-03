// import { isTokenRequired } from "@/utils/axiosInterceptors";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// TODO: localStorage 사용 제거
const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  // const url = config.url ?? "";
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return {
    ...config,
    // withCredentials: isTokenRequired(url),
  };
};

axiosInstance.interceptors.request.use(requestInterceptor);

const responseInterceptorForError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    if (typeof window !== "undefined") {
      // 토큰 만료시 localStorage 비우기
      const requestInterceptor = (config: InternalAxiosRequestConfig) => {
        config.headers["Authorization"] = "";
        localStorage.clear();
        return config;
      };
      axiosInstance.interceptors.request.use(requestInterceptor);
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (res) => res,
  responseInterceptorForError,
);

export default axiosInstance;
