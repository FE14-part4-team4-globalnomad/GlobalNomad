import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserType } from "@/types/user";
import { deleteCookie, setCookie } from "@/utils/next-cookie";

interface AuthState {
  user?: UserType;
  isLoggedIn: boolean;
  setUser: (user?: UserType) => void; // 유저 정보 업데이트 (ex. 내 정보 수정)
  signIn: (user: UserType) => void; // 로그인
  signOut: () => void; // 로그아웃
}
const INITIAL_AUTH_STORE_VALUE = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  isLoggedIn: false,
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setUser: (user) => set({ user }),
      signIn: async (user) => {
        await setCookie("loggedIn", new Date().getTime().toString());
        set({ user, isLoggedIn: true });
      },
      signOut: async () => {
        await deleteCookie("loggedIn");
        set(INITIAL_AUTH_STORE_VALUE);
      },
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
    },
  ),
);
