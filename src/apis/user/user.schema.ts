import { UserType } from "../../types/user";

export type GetUserResultType = UserType;

export interface PostUserPayloadType {
  payload: {
    email: string;
    nickname: string;
    password: string;
  };
}

export type PostUserResultType = UserType;

export interface PatchUserPayloadType {
  payload?: {
    nickname?: string;
    profileImageUrl?: string;
    newPassword?: string;
  };
}

export type PatchUserResultType = UserType;

export interface PostUserImageResultType {
  profileImageUrl: string;
}
