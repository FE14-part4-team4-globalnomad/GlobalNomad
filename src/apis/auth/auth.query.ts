import {
  PostAuthLoginPayloadType,
  PostAuthLoginResultType,
  PostAuthTokensResultType,
} from "@/apis/auth/auth.schema";
import authService from "@/apis/auth/auth.service";
import { useSetUser } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**
 * 로그인 Mutation
 */
export const usePostAuthLoginMutation = () => {
  const router = useRouter();
  const setUser = useSetUser();
  return useMutation<
    PostAuthLoginResultType,
    unknown,
    PostAuthLoginPayloadType
  >({
    mutationFn: (payload) =>
      authService.postAuthLogin(payload).then((res) => res.data),
    onSuccess: (result: PostAuthLoginResultType) => {
      setUser(result.user);
      router.push("/");
    },
  });
};

/**
 * 토큰 재발급 Mutation
 */
export const usePostAuthTokenMutation = () =>
  useMutation<PostAuthTokensResultType>({
    mutationFn: () => authService.postAuthToken().then((res) => res.data),
  });
