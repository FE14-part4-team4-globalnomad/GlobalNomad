import { HtmlHTMLAttributes } from "react";

import { cn } from "@/utils/classNames";

interface ModalWrapperProps extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function ModalWrapper({
  className = "",
  children,
}: ModalWrapperProps) {
  return (
    <div className="fixed z-10 inset-0 bg-dimmed flex justify-center items-center">
      <div
        className={cn(
          "bg-white py-[20px] px-[24px] tablet:py-[24px] tablet:px-[30px]",
          "rounded-[24px] tablet:rounded-[30px]",
          "grid justify-center items-center",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
