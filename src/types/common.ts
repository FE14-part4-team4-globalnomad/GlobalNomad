import { AxiosRequestConfig } from "axios";

export type ApiRequestParams<T> = {
  options?: AxiosRequestConfig;
} & T;
