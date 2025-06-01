import { AxiosInstance } from "axios";

import axiosInstance from "../instance";
import {
  PostAuthLoginPayloadType,
  PostAuthLoginResultType,
  PostAuthTokensResultType,
} from "@/apis/auth/auth.schema";
import { HTTP_METHODS } from "@/constants/httpMethod";
import { ApiRequestParams } from "@/types/common";

class AuthService {
  fetcher: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.fetcher = instance;
  }

  /**
   * 로그인
   */
  postAuthLogin({
    payload,
    options,
  }: ApiRequestParams<PostAuthLoginPayloadType>) {
    return this.fetcher<PostAuthLoginResultType>({
      url: "/auth/login",
      method: HTTP_METHODS.POST,
      data: payload,
      ...options,
    });
  }

  /**
   * 토큰 재발급
   */
  postAuthToken(options?: ApiRequestParams<object>) {
    return this.fetcher<PostAuthTokensResultType>({
      url: "/auth/tokens",
      method: HTTP_METHODS.POST,
      ...options,
    });
  }
}

const authService = new AuthService(axiosInstance);

export default authService;
