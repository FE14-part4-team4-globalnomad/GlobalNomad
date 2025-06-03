"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { usePostOauthSigninMutation } from "@/apis/oauth/oauth.query";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useOverlay } from "@/hooks/useOverlay";

export default function OauthSigninPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  const kakaoLoginMutation = usePostOauthSigninMutation("kakao");
  const { overlay } = useOverlay();

  const handleKakaoLogin = async () => {
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI;
    if (!code || !redirectUri) return;
    kakaoLoginMutation.mutate(
      { redirectUri, token: code },
      {
        onSuccess: () => router.push("/"),
        onError: (error) => {
          const message =
            error.response?.data.message ||
            "카카오 로그인에 실패하였습니다.\n다시 시도해 주세요.";
          overlay(<ConfirmModal message={message} />);
          router.push("/signin");
        },
      },
    );
  };

  useEffect(() => {
    handleKakaoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return <div></div>;
}
