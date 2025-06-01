import { TokenType } from "../../types/auth";
import { UserType } from "@/types/user";

export interface PostAuthLoginPayloadType {
  payload: {
    email: string;
    password: string;
  };
}

export type PostAuthLoginResultType = { user: UserType } & TokenType;

export type PostAuthTokensResultType = TokenType;
