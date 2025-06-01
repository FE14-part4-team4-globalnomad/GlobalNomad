import { AxiosInstance } from "axios";

import axiosInstance from "../instance";
import { HTTP_METHODS } from "@/constants/httpMethod";
import { ApiRequestParams } from "@/types/common";
import {
  PostOauthAppsPayload,
  PostOauthAppsResultType,
  PostOauthSigninPayloadType,
  PostOauthSigninResultType,
  PostOauthSignupPayloadType,
  PostOauthSignupResultType,
} from "@/types/oauth.schema";

class OauthService {
  fetcher: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.fetcher = instance;
  }

  /**
   * 간편 로그인 App 등록/수정
   *
   * Google, Kakao 간편 로그인을 위한 App 을 등록하거나 수정합니다.
   *
   * 이미 등록된 앱이 있을 경우 덮어씌워집니다.
   *
   * 요청 데이터 중 appKey 는 각 서비스에서 발급받은 인증 키 입니다.
   *
   * Google 의 경우에는 "클라이언트 id" 입니다.
   *
   * Kakao 의 경우에는 "REST API 키" 입니다.
   *
   * 실습을 위해 발급받은 키를 등록해주세요. 실제 서비스에서 사용 하는 키를 등록해서는 안됩니다.
   */
  postOauthApps({ payload, options }: ApiRequestParams<PostOauthAppsPayload>) {
    return this.fetcher<PostOauthAppsResultType>({
      url: "/oauth/apps",
      method: HTTP_METHODS.POST,
      data: payload,
      ...options,
    });
  }

  /**
   * 간편 회원가입
   *
   * @property {string} redirectUri
   *
   * Kakao 의 경우에는 필수입니다.
   *
   * 인가 코드를 얻을 때 사용하였던 redirect_uri 값을 그대로 사용합니다.
   *
   * @example http://localhost:3000/oauth/kakao
   *
   * @property {string} token
   *
   * 간편 로그인 과정을 통해 발급받은 토큰입니다.
   *
   * Google 의 경우에는 Google Id 토큰(JWT) 입니다. Kakao 의 경우에는 인가 코드 입니다.
   */
  postOauthSignup({
    provider,
    payload,
    options,
  }: ApiRequestParams<PostOauthSignupPayloadType>) {
    return this.fetcher<PostOauthSignupResultType>({
      url: `/oauth/sign-up/${provider}`,
      method: HTTP_METHODS.POST,
      data: payload,
      ...options,
    });
  }

  /**
   * 간편 로그인
   *
   * @property {string} redirectUri
   *
   * Kakao 의 경우에는 필수입니다.
   *
   * 인가 코드를 얻을 때 사용하였던 redirect_uri 값을 그대로 사용합니다.
   *
   * @example http://localhost:3000/oauth/kakao
   *
   * @property {string} token
   *
   * 간편 로그인 과정을 통해 발급받은 토큰입니다.
   *
   * Google 의 경우에는 Google Id 토큰(JWT) 입니다. Kakao 의 경우에는 인가 코드 입니다.
   */
  postOauthSignin({
    provider,
    payload,
    options,
  }: ApiRequestParams<PostOauthSigninPayloadType>) {
    return this.fetcher<PostOauthSigninResultType>({
      url: `/oauth/sign-in/${provider}`,
      method: HTTP_METHODS.POST,
      data: payload,
      ...options,
    });
  }
}

const oauthService = new OauthService(axiosInstance);

export default oauthService;
