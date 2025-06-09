"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { usePostOauthSignupMutation } from "@/apis/oauth/oauth.query";
import Input from "@/components/input/Input";
import Logo from "@/components/logo/Logo";

export default function OauthSignupPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const [nickname, setNickname] = useState("");

  const router = useRouter();
  const kakaoSignupMutation = usePostOauthSignupMutation("kakao");

  const handleKakaoSignup = async (e: FormEvent) => {
    e.preventDefault();
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI;
    if (!(code && redirectUri)) return;
    kakaoSignupMutation.mutate(
      { token: code, nickname, redirectUri },
      {
        onSuccess: () => router.push("/"),
        onError: (error) =>
          router.push(error.response?.status === 400 ? "/signin" : "/signup"),
      },
    );
  };

  const signupBtnDisabled = nickname.length === 0 && nickname.length > 10;

  return (
    <div className="min-h-screen pt-[65px] pb-[146px] flex flex-col justify-start tablet:justify-center items-center gap-[42px] tablet:gap-[62px]">
      <Logo />
      <form
        className="grid w-full max-w-[640px] px-[24px] tablet:px-[52px] gap-[24px] tablet:gap-[30px]"
        onSubmit={handleKakaoSignup}
      >
        <div className="grid gap-[16px] tablet:gap-[20px]">
          <Input
            label="닉네임"
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해 주세요"
            error={
              nickname.length > 10 ? "10 자 이하로 작성해주세요." : undefined
            }
            value={nickname}
            onChange={(e) => setNickname((e.target as HTMLInputElement).value)}
          />
        </div>
        <button type="submit" disabled={signupBtnDisabled}>
          회원가입하기
        </button>
      </form>
    </div>
  );
}
