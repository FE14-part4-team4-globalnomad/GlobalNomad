import { UserType } from "./user";

export interface TokenType {
  refreshToken: string;
  accessToken: string;
}

//* ------------------- Payload & Result Type -------------------
export interface PostAuthLoginPayloadType {
  email: string;
  password: string;
}

export type PostAuthLoginResultType = { user: UserType } & TokenType;

export type PostAuthTokensResultType = TokenType;
