import { ButtonProps, SizeVariant } from "@/types/button";
import { cn, cond } from "@/utils/classNames";

const sizeStyles: Record<SizeVariant, string> = {
  calendar:
    "w-[327px] h-[50px] text-14-m tablet:w-[695px] tablet:h-[50px] tablet:text-16-m desktop:w-[135px] desktop:h-[50px] desktop:text-16-m",

  chooseModal:
    "w-[113px] h-[41px] text-14-m tablet:w-[135px] tablet:h-[47px] tablet:text-16-m desktop:w-[135px] desktop:h-[47px] desktop:text-16-m",

  empty:
    "mobile:w-[182px] mobile:h-[54px] mobile:text-16-m tablet:w-[182px] tablet:h-[54px] tablet:text-16-m desktop:w-[182px] desktop:h-[54px] desktop:text-16-m",

  experienceRegister:
    "w-[138px] h-[48px] text-16-m tablet:w-[138px] tablet:h-[48px] tablet:text-16-m desktop:w-[138px] desktop:h-[48px] desktop:text-16-m",

  experienceRegister2:
    "w-[120px] h-[41px] text-14-m tablet:w-[120px] tablet:h-[41px] tablet:text-14-m desktop:w-[120px] desktop:h-[41px] desktop:text-14-m",

  modal:
    "min-w-[180px] h-[41px] text-14-m tablet:w-[200px] tablet:h-[47px] tablet:text-16-m",

  myInfo:
    "w-[157.5px] h-[48px] text-14-m tablet:w-[120px] tablet:h-[41px] tablet:text-16-m desktop:w-[120px] desktop:h-[41px] desktop:text-16-m",

  reservation:
    "mobile:w-[71px] mobile:h-[37px] mobile:text-14-m tablet:w-[71px] tablet:h-[37px] tablet:text-14-m desktop:w-[71px] desktop:h-[29px] desktop:text-14-m",

  review:
    "w-[309px] h-[37px] text-14-m tablet:w-[476px] tablet:h-[37px] tablet:text-14-m desktop:w-[71px] desktop:h-[29px] desktop:text-14-m",

  reviewModal:
    "w-[279px] h-[41px] text-14-m tablet:w-[325px] tablet:h-[54px] tablet:text-16-m desktop:w-[325px] desktop:h-[54px] desktop:text-16-m",

  search:
    "w-[85px] h-[41px] text-14-m tablet:w-[120px] tablet:h-[50px] tablet:text-16-m desktop:w-[120px] desktop:h-[50px] desktop:text-16-m",

  sign: "w-[328px] h-[54px] text-16-m tablet:w-[640px] tablet:h-[54px] tablet:text-16-m desktop:w-[640px] desktop:h-[54px] desktop:text-16-m",
};

const variantStyles = {
  primary: "bg-brand-500 text-white",
  secondary: "bg-gray-200 text-gray-600",
  outline: "bg-white text-[#707177] border border-[#C6C8CF]",
} as const;

export default function Button({
  children,
  onClick,
  disabled = false,
  size = "sign",
  variant = "primary",
  fullWidth = false,
  rounded = true,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyle =
    "font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const finalClassName = cn(
    baseStyle,
    sizeStyles[size],
    variantStyles[variant],
    cond(fullWidth, "w-full"),
    cond(rounded, "rounded-[16px]"),
    className,
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
