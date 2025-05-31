import { TokenType } from "./auth";
import { UserType } from "./user";

//* ------------------- Payload & Result Type -------------------
export interface PostOauthAppsPayload {
  payload: {
    appKey: string;
    provider: "google" | "kakao";
  };
}

export interface PostOauthAppsResultType {
  id: 0;
  teamId: string;
  appKey: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostOauthSignupPayloadType {
  provider: "google" | "kakao";
  payload: {
    nickname: string;
    redirectUri: string;
    token: string;
  };
}

export type PostOauthSignupResultType = { user: UserType } & TokenType;

export interface PostOauthSigninPayloadType {
  provider: "google" | "kakao";
  payload: {
    redirectUri: string;
    token: string;
  };
}

export type PostOauthSigninResultType = PostOauthSignupResultType;
