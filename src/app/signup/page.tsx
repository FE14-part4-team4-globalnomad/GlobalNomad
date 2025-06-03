"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

import { usePostUserMutation } from "@/apis/user/user.query";
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
      },
    );
  };

  return (
    <div className="min-h-screen">
      {/* TODO: UI 작업 */}
      <form
        className="grid"
        onChange={onChangeFormValue}
        onSubmit={handleSignup}
      >
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" placeholder="이메일을 입력해 주세요" />
        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" placeholder="닉네임을 입력해 주세요" />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="8자 이상 입력해 주세요"
        />
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
        />
        <button type="submit">회원가입하기</button>
      </form>
    </div>
  );
}
