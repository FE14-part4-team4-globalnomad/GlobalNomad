"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

import { usePostAuthLoginMutation } from "@/apis/auth/auth.query";
import KakaoIcon from "@/assets/icons/social/icon_kakao.svg";
import Logo from "@/components/logo/Logo";

// const VALIDATION_RULES = {
//   email: {
//     validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
//     errorMessage: "이메일 형식으로 작성해주세요.",
//   },
//   password: {
//     validate: (value: string) => value.length >= 8,
//     errorMessage: "8자 이상 입력해주세요.",
//   },
// };

export default function SigninPage() {
  const loginMutation = usePostAuthLoginMutation();
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const onChangeFormValue = (e: ChangeEvent<HTMLFormElement>) => {
    const { id, value } = e.target;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ payload: formValue });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-[42px] tablet:gap-[62px]">
      <Logo />
      <div className="grid w-full max-w-[640px] px-[24px] tablet:px-[52px] gap-[20px]">
        <form
          className="grid gap-[16px]"
          onChange={onChangeFormValue}
          onSubmit={handleLogin}
        >
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" placeholder="이메일을 입력해 주세요" />
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해 주세요"
          />
          <button type="submit">로그인하기</button>
        </form>
        <div className="grid gap-[20px] tablet:gap-[30px]">
          <div className="flex justify-stretch items-center gap-[14px] text-16-m text-[#79747E]">
            <hr className="w-full border-gray-100" />
            or
            <hr className="w-full border-gray-100" />
          </div>
          <div className="grid justify-stretch gap-[24px] tablet:gap-[30px]">
            <button className="flex justify-center items-center gap-[4px] text-16-m text-gray-600">
              <Image
                src={KakaoIcon}
                alt="카카오 로그인 아이콘 이미지"
                width={24}
                height={24}
              />
              카카오 로그인
            </button>
            <div className="flex justify-center gap-[4px] text-16-m text-gray-400">
              회원이 아니신가요?
              <Link href="/signup" className="underline">
                회원가입하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
