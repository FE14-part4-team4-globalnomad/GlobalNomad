import { AxiosError, InternalAxiosRequestConfig } from "axios";

import axiosInstance from "@/apis/instance";
import { useAuthStore } from "@/store/authStore";

const excludedPaths = ["/oauth"];

/**
 * 특정 URL이 토큰 인증이 **필요한** 경로인지 여부를 판단합니다.
 *
 * @param url 현재 요청 URL
 * @returns true: 토큰 필요 / false: 토큰 불필요
 */
export const isTokenRequired = (url?: string): boolean => {
  if (!url) return true; // URL 없으면 보호 가정
  return !excludedPaths.some((path) => url.includes(path));
};

/**
 * 로그인 및 토큰 재발급 시 axios header 업데이트
 * @param accessToken
 */
export const updateHeaderWithToken = (accessToken: string) => {
  const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  };
  axiosInstance.interceptors.request.use(requestInterceptor);
};

/**
 * 에러 처리를 위한 response interceptor
 * @param error
 * @returns
 */
export const responseInterceptorForError = async (error: AxiosError) => {
  if (error.response?.status !== 401 || typeof window === "undefined")
    return Promise.reject(error);
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    updateHeaderWithToken(accessToken);
    return Promise.reject(error);
  }
  const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.set("Authorization", "");
    useAuthStore.getState().signOut();
    return config;
  };
  axiosInstance.interceptors.request.use(requestInterceptor);
  return Promise.reject(error);
};
