import { AxiosInstance } from "axios";

import axiosInstance from "./instance";
import {
  GetUserResultType,
  PatchUserPayloadType,
  PatchUserResultType,
  PostUserImageResultType,
  PostUserPayloadType,
  PostUserResultType,
} from "@/types/user";

class UserService {
  fetcher: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.fetcher = instance;
  }

  /**
   * 회원가입
   */
  async postUser({ payload }: PostUserPayloadType) {
    return await this.fetcher.post<PostUserResultType>("/users", payload);
  }

  /**
   * 내 정보 조회
   */
  async getUser() {
    return await this.fetcher.get<GetUserResultType>("/users/me");
  }

  /**
   * 내 정보 수정
   */
  async patchUser({ payload }: PatchUserPayloadType) {
    return await this.fetcher.patch<PatchUserResultType>("/users/me", payload);
  }

  /**
   * 프로필 이미지 url 생성
   */
  async postUserImage(payload: FormData) {
    return await this.fetcher.post<PostUserImageResultType>(
      "/users/me/image",
      payload,
    );
  }
}

const userService = new UserService(axiosInstance);

export default userService;
