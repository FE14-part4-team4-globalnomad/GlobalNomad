"use client";

import { usePostAuthLoginMutation } from "@/apis/auth/auth.query";
import { ChangeEvent, FormEvent, useState } from "react";

export default function LoginPage() {
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
    <div className="min-h-screen">
      <form
        className="grid"
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
    </div>
  );
}
