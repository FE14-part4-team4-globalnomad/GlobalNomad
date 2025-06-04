"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

import { usePostAuthLoginMutation } from "@/apis/auth/auth.query";
import KakaoIcon from "@/assets/icons/social/icon_kakao.svg";
import Input from "@/components/input/Input";
import Logo from "@/components/logo/Logo";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useOverlay } from "@/hooks/useOverlay";

const SIGNIN_INITIAL_VALUE = { email: "", password: "" };
const VALIDATION_RULES = {
  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: "이메일 형식으로 작성해주세요.",
  },
  password: {
    validate: (value: string) => value.length >= 8,
    errorMessage: "8자 이상 입력해주세요.",
  },
};

export default function SigninPage() {
  const { overlay } = useOverlay();
  const loginMutation = usePostAuthLoginMutation();
  const [formValue, setFormValue] = useState(SIGNIN_INITIAL_VALUE);

  const onChangeFormValue = (e: ChangeEvent<HTMLFormElement>) => {
    const { id, value } = e.target;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { payload: formValue },
      {
        onError: (error) => {
          const errMsg =
            error.response?.data?.message ||
            "로그인에 실패하였습니다.\n다시 시도해주세요.";
          overlay(<ConfirmModal message={errMsg} />);
        },
      },
    );
  };

  const getErrorMessage = (id: keyof typeof SIGNIN_INITIAL_VALUE) => {
    const { validate, errorMessage } = VALIDATION_RULES[id];
    const value = formValue[id];
    const isValid = validate(value);
    return isValid ? undefined : errorMessage;
  };

  const signinBtnDisabled =
    Object.entries(formValue).filter(
      ([id, value]) =>
        value.length === 0 || getErrorMessage(id as keyof typeof formValue),
    ).length > 0;

  const KAKAO_LOGIN_PATH = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&response_type=code&scope=profile_nickname`;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-[42px] tablet:gap-[62px]">
      <Logo />
      <div className="grid w-full max-w-[640px] px-[24px] tablet:px-[52px] gap-[20px]">
        <form
          className="grid gap-[24px] tablet:gap-[30px]"
          onChange={onChangeFormValue}
          onSubmit={handleSignin}
        >
          <div className="grid gap-[16px] tablet:gap-[20px]">
            <Input
              label="이메일"
              type="email"
              id="email"
              placeholder="이메일을 입력해 주세요"
              error={getErrorMessage("email")}
            />
            <Input
              label="비밀번호"
              type="password"
              id="password"
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>
          <button type="submit" disabled={signinBtnDisabled}>
            로그인하기
          </button>
        </form>
        <div className="grid gap-[20px] tablet:gap-[30px]">
          <div className="flex justify-stretch items-center gap-[14px] text-16-m text-[#79747E]">
            <hr className="w-full border-gray-100" />
            or
            <hr className="w-full border-gray-100" />
          </div>
          <div className="grid justify-stretch gap-[24px] tablet:gap-[30px] text-center">
            <Link className="flex justify-center" href={KAKAO_LOGIN_PATH}>
              <button className="flex justify-center items-center gap-[4px] text-16-m text-gray-600">
                <Image
                  src={KakaoIcon}
                  alt="카카오 로그인 아이콘 이미지"
                  width={24}
                  height={24}
                />
                카카오 로그인
              </button>
            </Link>
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
