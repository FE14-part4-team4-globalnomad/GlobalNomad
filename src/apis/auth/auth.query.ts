import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  PostAuthLoginPayloadType,
  PostAuthLoginResultType,
  PostAuthTokensResultType,
} from "@/apis/auth/auth.schema";
import authService from "@/apis/auth/auth.service";
import { useAuthStore } from "@/store/authStore";

/**
 * 로그인 Mutation
 */
export const usePostAuthLoginMutation = () => {
  const signIn = useAuthStore((state) => state.signIn);
  return useMutation<
    PostAuthLoginResultType,
    AxiosError<{ message: string }, unknown>,
    PostAuthLoginPayloadType
  >({
    mutationFn: (payload) =>
      authService.postAuthLogin(payload).then((res) => res.data),
    onSuccess: (result: PostAuthLoginResultType) => {
      const { user, accessToken, refreshToken } = result;
      signIn(user, accessToken, refreshToken);
    },
  });
};

/**
 * 토큰 재발급 Mutation
 */
export const usePostAuthTokenMutation = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  return useMutation<PostAuthTokensResultType>({
    mutationFn: () =>
      authService
        .postAuthToken({
          options: { headers: { Authorization: `Bearer ${refreshToken}` } },
        })
        .then((res) => res.data),
    onSuccess: (result) => {
      const { accessToken, refreshToken } = result;
      setToken(accessToken, refreshToken);
    },
  });
};
