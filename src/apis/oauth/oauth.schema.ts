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

export type SignupPayloadType = {
  nickname: string;
  redirectUri: string;
  token: string;
};

export type PostOauthSignupPayloadType =
  | {
      provider: "kakao";
      payload: SignupPayloadType;
    }
  | {
      provider: "google";
      payload: SignupPayloadType;
    };

export type PostOauthSignupResultType = { user: UserType } & TokenType;

export type SigninPayloadType = { redirectUri: string; token: string };

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
      payload: SigninPayloadType;
    };

export type PostOauthSigninResultType = PostOauthSignupResultType;

/**  카카오에 getTokenFromKakao로 요청하면 받을 수 있는 응답 값*/
export interface GetTokenFromKakaoResponse {
  token_type?: string;
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
  refresh_token_expires_in?: string;
  scope?: string;
  token?: string;
  id?: number;
}

/**  카카오에 getUserFromKakao로 요청하면 받을 수 있는 응답 값*/
export interface GetUserInfoFromKakaoResponse {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string; // 640x640
    thumbnail_image?: string; // 110x110
  };
}
