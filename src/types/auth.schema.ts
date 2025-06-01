import { UserType } from "./user.schema";

export interface TokenType {
  refreshToken: string;
  accessToken: string;
}

//* ------------------- Payload & Result Type -------------------
export interface PostAuthLoginPayloadType {
  payload: {
    email: string;
    password: string;
  };
}

export type PostAuthLoginResultType = { user: UserType } & TokenType;

export type PostAuthTokensResultType = TokenType;
