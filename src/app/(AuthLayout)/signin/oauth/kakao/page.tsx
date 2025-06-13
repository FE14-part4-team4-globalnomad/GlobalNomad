"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { usePostOauthSigninMutation } from "@/apis/oauth/oauth.query";

export default function OauthSigninPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const router = useRouter();
  const kakaoLoginMutation = usePostOauthSigninMutation("kakao");

  const handleKakaoLogin = async () => {
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI;
    if (!code || !redirectUri) return;
    kakaoLoginMutation.mutate(
      { redirectUri, token: code },
      {
        onSuccess: () => router.push("/"),
        onError: (error) =>
          router.push(error.response?.status === 403 ? "/signup" : "/signin"),
      },
    );
  };

  useEffect(() => {
    handleKakaoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return <div></div>;
}
