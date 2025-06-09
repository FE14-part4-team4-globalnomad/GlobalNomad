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
      updateHeaderWithToken(accessToken);
      signIn(user);
    },
  });
};

/**
 * 토큰 재발급 Mutation
 */
export const usePostAuthTokenMutation = () => {
  return useMutation<PostAuthTokensResultType>({
    mutationFn: () => authService.postAuthToken().then((res) => res.data),
    onSuccess: (result) => {
      const { accessToken } = result;
      updateHeaderWithToken(accessToken);
    },
  });
};
