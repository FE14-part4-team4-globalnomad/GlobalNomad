import { TokenType } from "../../types/auth";
import { UserType } from "../../types/user";

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

export type PostOauthSignupPayloadType =
  | {
      provider: "kakao";
      payload: {
        nickname: string;
        redirectUri: string;
        token: string;
      };
    }
  | {
      provider: "google";
      payload: {
        nickname: string;
        redirectUri?: string;
        token: string;
      };
    };

export type PostOauthSignupResultType = { user: UserType } & TokenType;

export type PostOauthSigninPayloadType =
  | {
      provider: "google";
      payload: {
        redirectUri?: string;
        token: string;
      };
    }
  | {
      provider: "kakao";
      payload: {
        redirectUri: string;
        token: string;
      };
    };

export type PostOauthSigninResultType = PostOauthSignupResultType;
