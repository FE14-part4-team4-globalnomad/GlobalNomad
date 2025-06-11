import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  PostAuthLoginPayloadType,
  PostAuthLoginResultType,
  PostAuthTokensResultType,
} from "@/apis/auth/auth.schema";
import authService from "@/apis/auth/auth.service";
import { useAuthStore } from "@/store/authStore";
import { updateHeaderWithToken } from "@/utils/axiosInterceptors";

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
      const { user, accessToken } = result;
      signIn(user, accessToken);
      updateHeaderWithToken(accessToken);
    },
  });
};

/**
 * 토큰 재발급 Mutation
 */
export const usePostAuthTokenMutation = () => {
  const setToken = useAuthStore((state) => state.setToken);
  return useMutation<PostAuthTokensResultType>({
    mutationFn: () => authService.postAuthToken().then((res) => res.data),
    onSuccess: (result) => {
      const { accessToken, refreshToken } = result;
      setToken(accessToken, refreshToken);
      updateHeaderWithToken(accessToken);
    },
  });
};
