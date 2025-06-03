import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  PostOauthAppsPayload,
  PostOauthAppsResultType,
  PostOauthSigninResultType,
  PostOauthSignupResultType,
  SigninPayloadType,
  SignupPayloadType,
} from "@/apis/oauth/oauth.schema";
import oauthService from "@/apis/oauth/oauth.service";

const oauthQuery = {
  all: () => ["kakao"],
  tokenInfoKey: (authCode: string) => [...oauthQuery.all(), "token", authCode],
  tokenInfo: (authCode: string) =>
    queryOptions({
      queryKey: oauthQuery.tokenInfoKey(authCode),
      queryFn: () =>
        oauthService.getTokenFromKakao(authCode).then((res) => res.data),
    }),
  userInfoKey: (accessToken: string) => [
    ...oauthQuery.all(),
    "user",
    accessToken,
  ],
  userInfo: (accessToken: string) =>
    queryOptions({
      queryKey: oauthQuery.userInfoKey(accessToken),
      queryFn: () =>
        oauthService.getUserFromKakao(accessToken).then((res) => res.data),
    }),
};

/**
 * Kakao: AuthCode → AccessToken
 */
export const useGetTokenFromKakaoQuery = (authCode: string) =>
  useQuery({ ...oauthQuery.tokenInfo(authCode), enabled: !!authCode });

/**
 * Kakao: AccessToken → User Info
 */
export const useGetUserFromKakaoQuery = (accessToken: string) =>
  useQuery({ ...oauthQuery.userInfo(accessToken), enabled: !!accessToken });

/**
 * 간편 로그인 App 등록/수정
 */
export const usePostOauthAppsMutation = () =>
  useMutation<
    PostOauthAppsResultType,
    AxiosError<{ message: string }, unknown>,
    PostOauthAppsPayload
  >({
    mutationFn: (payload) =>
      oauthService.postOauthApps(payload).then((res) => res.data),
  });

/**
 * 간편 회원가입
 */
export const usePostOauthSignupMutation = (provider: "google" | "kakao") =>
  useMutation<
    PostOauthSignupResultType,
    AxiosError<{ message: string }, unknown>,
    SignupPayloadType
  >({
    mutationFn: (payload: SignupPayloadType) =>
      oauthService
        .postOauthSignup({ provider, payload })
        .then((res) => res.data),
  });

/**
 * 간편 로그인
 */
export const usePostOauthSigninMutation = (provider: "google" | "kakao") =>
  useMutation<
    PostOauthSigninResultType,
    AxiosError<{ message: string }, unknown>,
    SigninPayloadType
  >({
    mutationFn: (payload: SigninPayloadType) =>
      oauthService
        .postOauthSignin({ provider, payload })
        .then((res) => res.data),
  });
