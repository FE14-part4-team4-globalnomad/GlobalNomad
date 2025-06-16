import { AxiosInstance } from "axios";

import axiosInstance from "../instance";
import {
  GetUserResultType,
  PatchUserPayloadType,
  PatchUserResultType,
  PostUserImageResultType,
  PostUserPayloadType,
  PostUserResultType,
} from "@/apis/user/user.schema";
import { HTTP_METHODS } from "@/constants/httpMethod";
import { ApiRequestParams } from "@/types/common";

class UserService {
  fetcher: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.fetcher = instance;
  }

  /**
   * 회원가입
   */
  postUser({ payload, options }: ApiRequestParams<PostUserPayloadType>) {
    return this.fetcher<PostUserResultType>({
      url: "/users",
      method: HTTP_METHODS.POST,
      data: payload,
      ...options,
    });
  }

  /**
   * 내 정보 조회
   */
  getUser(params?: ApiRequestParams<object>) {
    const options = params?.options;

    return this.fetcher<GetUserResultType>({
      url: "/users/me",
      method: HTTP_METHODS.GET,
      ...options,
    });
  }

  /**
   * 내 정보 수정
   */
  patchUser({ payload, options }: ApiRequestParams<PatchUserPayloadType>) {
    return this.fetcher<PatchUserResultType>({
      url: "/users/me",
      method: HTTP_METHODS.PATCH,
      data: payload,
      ...options,
    });
  }

  /**
   * 프로필 이미지 url 생성
   */
  postUserImage({
    payload,
    options,
  }: ApiRequestParams<{ payload: { image: File } }>) {
    return this.fetcher<PostUserImageResultType>({
      url: "/users/me/image",
      method: HTTP_METHODS.POST,
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
      ...options,
    });
  }
}

const userService = new UserService(axiosInstance);

export default userService;
