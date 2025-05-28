import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스 이름을 병합하고 조건부로 적용하는 유틸리티 함수
 * @param classes 클래스 이름 또는 조건부 클래스 객체
 * @returns 병합된 클래스 이름 문자열
 */
export const cn = (...classes: Parameters<typeof clsx>) => {
  return twMerge(clsx(...classes));
};
