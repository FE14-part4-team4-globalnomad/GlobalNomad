export interface UserType {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

//* ------------------- Payload & Result Type -------------------
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
  payload: {
    nickname: string;
    profileImageUrl: string;
    newPassword: string;
  };
}

export type PatchUserResultType = UserType;

export interface PostUserImageResultType {
  profileImageUrl: string;
}
