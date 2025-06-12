"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { usePostAuthTokenMutation } from "@/apis/auth/auth.query";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useOverlay } from "@/hooks/useOverlay";
import { useAuthStore } from "@/store/authStore";

export default function RefreshPage() {
  const router = useRouter();
  const { overlay } = useOverlay();
  const updateTokenMutation = usePostAuthTokenMutation();
  const signOut = useAuthStore((state) => state.signOut);
  useEffect(() => {
    updateTokenMutation.mutate(undefined, {
      onSuccess: () => router.back(),
      onError: () => {
        const modalMsg = "토큰 재발급에 실패하였습니다.\n다시 로그인해 주세요.";
        overlay(<ConfirmModal message={modalMsg} />);
        signOut();
        router.push("/signin");
      },
    });
  }, []);
  return <></>;
}
