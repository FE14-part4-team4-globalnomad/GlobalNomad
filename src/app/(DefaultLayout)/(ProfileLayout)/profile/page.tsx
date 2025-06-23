"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { usePatchUserMutation, useUserQuery } from "@/apis/user/user.query";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { SIGNUP_VALIDATION_RULES } from "@/constants/auth";
import { useAuthStore } from "@/store/authStore";

const PROFILE_INITIAL_VALUE = {
  nickname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function ProfilePage() {
  const updateProfileMutation = usePatchUserMutation();
  const { data, isSuccess } = useUserQuery();
  const [formValue, setFormValue] = useState(PROFILE_INITIAL_VALUE);

  const profileImageUrl = useAuthStore((state) => state.tempProfileImageUrl);
  const updateProfileImage = useAuthStore((state) => state.setTempProfileImage);

  useEffect(() => {
    if (isSuccess && !!data) {
      const { nickname, email } = data;
      setFormValue({ ...formValue, nickname, email });
    }
  }, [data, isSuccess]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValue((prev) => ({ ...prev, [id]: value }));
  };

  const getErrorMessage = (id: keyof typeof formValue) => {
    const { validate, errorMessage } = SIGNUP_VALIDATION_RULES[id];
    const value = formValue[id];
    return validate(value, formValue) ? undefined : errorMessage;
  };

  const updateBtnDisabled = Object.entries(formValue).some(
    ([id, value]) =>
      !value || getErrorMessage(id as keyof typeof formValue) !== undefined,
  );

  const handleUpdateProfile = (e: FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      payload: { ...formValue, profileImageUrl },
    });
  };

  useEffect(() => {
    return () => updateProfileImage();
  }, []);

  return (
    <form
      className="w-full grid justify-stretch gap-[24px]"
      onSubmit={handleUpdateProfile}
    >
      <div className="grid gap-[4px]">
        <h1 className="text-18-b">내 정보</h1>
        <div className="text-14-m text-gray-500">
          닉네임과 비밀번호를 수정하실 수 있습니다.
        </div>
      </div>
      <Input
        label="닉네임"
        type="text"
        id="nickname"
        placeholder="닉네임을 입력해 주세요"
        error={getErrorMessage("nickname")}
        value={formValue.nickname}
        onChange={handleChange}
      />
      <Input
        label="이메일"
        type="email"
        id="email"
        value={formValue.email}
        disabled={true}
      />
      <Input
        label="비밀번호"
        type="password"
        id="password"
        placeholder="비밀번호를 입력해 주세요"
        error={getErrorMessage("password")}
        onChange={handleChange}
      />
      <Input
        label="비밀번호 확인"
        type="password"
        id="passwordConfirm"
        placeholder="비밀번호를 한 번 더 입력해 주세요"
        error={getErrorMessage("passwordConfirm")}
        onChange={handleChange}
      />
      <div className="flex justify-center">
        <Button type="submit" size="myInfo" disabled={updateBtnDisabled}>
          저장하기
        </Button>
      </div>
    </form>
  );
}

export default ProfilePage;
