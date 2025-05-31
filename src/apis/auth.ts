import { AxiosInstance } from "axios";

import axiosInstance from "./instance";
import {
  PostAuthLoginPayloadType,
  PostAuthLoginResultType,
  PostAuthTokensResultType,
} from "@/types/auth";

class AuthService {
  fetcher: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.fetcher = instance;
  }

  /**
   * 로그인
   */
  async postAuthLogin(payload: PostAuthLoginPayloadType) {
    return await this.fetcher.post<PostAuthLoginResultType>(
      "/auth/login",
      payload,
    );
  }

  /**
   * 토큰 재발급
   */
  async postAuthToken() {
    return await this.fetcher.post<PostAuthTokensResultType>("/auth/tokens");
  }
}

const authService = new AuthService(axiosInstance);

export default authService;
