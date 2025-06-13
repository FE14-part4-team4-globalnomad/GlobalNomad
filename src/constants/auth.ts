export const SIGNUP_INITIAL_VALUE = {
  nickname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const SIGNUP_VALIDATION_RULES = {
  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: "잘못된 이메일입니다.",
  },
  nickname: {
    validate: (value: string) => value.length <= 10,
    errorMessage: "10 자 이하로 작성해주세요.",
  },
  password: {
    validate: (value: string) => value.length === 0 || value.length >= 8,
    errorMessage: "8자 이상 입력해주세요.",
  },
  passwordConfirm: {
    validate: (value: string, form: typeof SIGNUP_INITIAL_VALUE) =>
      value === form.password,
    errorMessage: "비밀번호가 일치하지 않습니다.",
  },
};

export const SIGNIN_INITIAL_VALUE = { email: "", password: "" };

export const SIGNIN_VALIDATION_RULES = {
  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: "이메일 형식으로 작성해주세요.",
  },
  password: {
    validate: (value: string) => value.length >= 8,
    errorMessage: "8자 이상 입력해주세요.",
  },
};
