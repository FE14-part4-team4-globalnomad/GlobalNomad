"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import {
  useGetTokenFromKakaoQuery,
  useGetUserFromKakaoQuery,
  usePostOauthSignupMutation,
} from "@/apis/oauth/oauth.query";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useOverlay } from "@/hooks/useOverlay";

export default function OauthSignupPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const router = useRouter();

  const { data: tokenData, isSuccess: isTokenFetched } =
    useGetTokenFromKakaoQuery(code);

  const { data: userData, isSuccess: isUserFetched } = useGetUserFromKakaoQuery(
    tokenData?.access_token || "",
  );

  const kakaoSignupMutation = usePostOauthSignupMutation("kakao");
  const { overlay } = useOverlay();

  const handleKakaoLogin = async () => {
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI;
    if (!(code && isTokenFetched && isUserFetched && redirectUri)) return;
    kakaoSignupMutation.mutate(
      {
        token: code,
        nickname: userData.properties.nickname,
        redirectUri,
      },
      {
        onSuccess: () => router.push("/"),
        onError: (error) => {
          const message =
            error.response?.data.message ||
            "카카오 회원가입에 실패하였습니다.\n다시 시도해 주세요.";
          overlay(<ConfirmModal message={message} />);
          router.push("/signup");
        },
      },
    );
  };

  useEffect(() => {
    handleKakaoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, isTokenFetched, isUserFetched]);

  return <div></div>;
}
