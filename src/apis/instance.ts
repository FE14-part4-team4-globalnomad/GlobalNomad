import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const responseInterceptorForError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    if (typeof window !== "undefined") {
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
