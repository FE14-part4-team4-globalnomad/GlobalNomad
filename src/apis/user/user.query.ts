import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  PatchUserPayloadType,
  PostUserImageResultType,
  PostUserPayloadType,
  PostUserResultType,
} from "@/apis/user/user.schema";
import userService from "@/apis/user/user.service";

const usersQuery = {
  all: () => ["user"],
  me: () => ["me"],
  myInfoKey: () => [...usersQuery.all(), ...usersQuery.me()],
  myInfo: () =>
    queryOptions({
      queryKey: usersQuery.myInfoKey(),
      queryFn: () => userService.getUser().then((res) => res.data),
    }),
};

/**
 * 내 정보 조회
 */
export const useUserQuery = () => useQuery(usersQuery.myInfo());

/**
 * 회원가입
 */
export const usePostUserMutation = () =>
  useMutation<
    PostUserResultType,
    AxiosError<{ message: string }, unknown>,
    PostUserPayloadType
  >({
    mutationFn: (payload) =>
      userService.postUser(payload).then((res) => res.data),
  });

/**
 * 내 정보 수정
 */
export const usePatchUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PatchUserPayloadType) =>
      userService.patchUser(payload).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersQuery.me() });
    },
  });
};

/**
 * 프로필 이미지 업로드
 */
export const usePostUserImageMutation = () =>
  useMutation<PostUserImageResultType, unknown, { payload: FormData }>({
    mutationFn: (payload) =>
      userService.postUserImage(payload).then((res) => res.data),
  });
