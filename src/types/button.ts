import React from "react";

export type SizeVariant =
  | "calendar"
  | "chooseModal"
  | "empty"
  | "experienceRegister"
  | "experienceRegister2"
  | "modal"
  | "myInfo"
  | "reservation"
  | "review"
  | "reviewModal"
  | "search"
  | "sign";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: SizeVariant;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  rounded?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};
