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
import { useAuthStore } from "@/store/authStore";

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
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: (payload: PatchUserPayloadType) =>
      userService.patchUser(payload).then((res) => res.data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: usersQuery.me() });
      setUser(res);
    },
  });
};

/**
 * 프로필 이미지 업로드
 */
export const usePostUserImageMutation = () => {
  const setImage = useAuthStore((state) => state.setTempProfileImage);
  return useMutation<
    PostUserImageResultType,
    unknown,
    { payload: { image: File } }
  >({
    mutationFn: (payload) =>
      userService.postUserImage(payload).then((res) => res.data),
    onSuccess: ({ profileImageUrl }) => setImage(profileImageUrl),
  });
};
