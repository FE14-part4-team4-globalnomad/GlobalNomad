import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  PostOauthAppsPayload,
  PostOauthAppsResultType,
  PostOauthSigninResultType,
  PostOauthSignupResultType,
} from "@/apis/oauth/oauth.schema";
import oauthService from "@/apis/oauth/oauth.service";

type PayloadType = { nickname: string; redirectUri: string; token: string };
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
    PayloadType
  >({
    mutationFn: (payload: PayloadType) =>
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
    PayloadType
  >({
    mutationFn: (payload: PayloadType) =>
      oauthService
        .postOauthSignin({ provider, payload })
        .then((res) => res.data),
  });
