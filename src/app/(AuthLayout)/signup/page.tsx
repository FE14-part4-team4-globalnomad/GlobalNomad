"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

import { usePostUserMutation } from "@/apis/user/user.query";
import KakaoIcon from "@/assets/icons/social/icon_kakao.svg";
import Input from "@/components/input/Input";
import Logo from "@/components/logo/Logo";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useOverlay } from "@/hooks/useOverlay";

export default function SignupPage() {
  const router = useRouter();
  const { overlay } = useOverlay();
  const signupMutation = usePostUserMutation();
  const [formValue, setFormValue] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // const VALIDATION_RULES = {
  //   email: {
  //     validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  //     errorMessage: "잘못된 이메일입니다.",
  //   },
  //   password: {
  //     validate: (value: string) => value.length >= 8,
  //     errorMessage: "8자 이상 입력해주세요.",
  //   },
  //   passwordConfirm: {
  //     validate: (value: string) => value === formValue.password,
  //     errorMessage: "비밀번호가 일치하지 않습니다.",
  //   },
  // };

  const onChangeFormValue = (e: ChangeEvent<HTMLFormElement>) => {
    const { id, value } = e.target;
    setFormValue({ ...formValue, [id]: value });
  };

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    const { passwordConfirm, ...payload } = formValue;
    if (!payload.password || payload.password !== passwordConfirm) return;
    signupMutation.mutate(
      { payload: payload },
      {
        onSuccess: (res) => {
          if (res.id) {
            const onConfirm = () => router.push("/signin");
            overlay(
              <ConfirmModal
                message="가입이 완료되었습니다"
                onConfirm={onConfirm}
              />,
            );
          }
        },
        onError: (error) => {
          const errMsg =
            error.response?.data?.message ||
            "회원가입에 실패하였습니다.\n다시 시도해주세요.";
          overlay(<ConfirmModal message={errMsg} />);
        },
      },
    );
  };

  const KAKAO_SIGNUP_PATH = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI}&response_type=code&scope=profile_nickname`;

  return (
    <div className="min-h-screen pt-[65px] pb-[146px] flex flex-col justify-start tablet:justify-center items-center gap-[42px] tablet:gap-[62px]">
      <Logo />
      <div className="grid w-full max-w-[640px] px-[24px] tablet:px-[52px] gap-[20px]">
        <form
          className="grid gap-[24px] tablet:gap-[30px]"
          onChange={onChangeFormValue}
          onSubmit={handleSignup}
        >
          <div className="grid gap-[16px] tablet:gap-[20px]">
            <Input
              label="이메일"
              type="email"
              id="email"
              placeholder="이메일을 입력해 주세요"
            />
            <Input
              label="닉네임"
              type="text"
              id="nickname"
              placeholder="닉네임을 입력해 주세요"
            />
            <Input
              label="비밀번호"
              type="password"
              id="password"
              placeholder="8자 이상 입력해 주세요"
            />
            <Input
              label="비밀번호 확인"
              type="password"
              id="passwordConfirm"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
            />
          </div>
          <button type="submit">회원가입하기</button>
        </form>
        <div className="grid gap-[20px] tablet:gap-[30px]">
          <div className="flex justify-stretch items-center gap-[14px] text-16-m text-[#79747E]">
            <hr className="w-full border-gray-100" />
            <div className="shrink-0">SNS 계정으로 회원가입하기</div>
            <hr className="w-full border-gray-100" />
          </div>
          <div className="grid justify-stretch gap-[24px] tablet:gap-[30px]">
            <Link className="flex justify-center" href={KAKAO_SIGNUP_PATH}>
              <button className="flex justify-center items-center gap-[4px] text-16-m text-gray-600">
                <Image
                  src={KakaoIcon}
                  alt="카카오 회원가입 아이콘 이미지"
                  width={24}
                  height={24}
                />
                카카오 회원가입
              </button>
            </Link>
            <div className="flex justify-center gap-[4px] text-16-m text-gray-400">
              회원이신가요?
              <Link href="/signin" className="underline">
                로그인하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
