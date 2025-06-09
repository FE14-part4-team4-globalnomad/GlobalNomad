import { ButtonProps, SizeVariant } from "@/types/button";

const sizeStyles: Record<SizeVariant, string> = {
  calendar:
    "mobile:w-[327px] mobile:h-[50px] mobile:text-14-m tablet:w-[695px] tablet:h-[50px] tablet:text-16-m desktop:w-[135px] desktop:h-[50px] desktop:text-16-m",

  chooseModal:
    "mobile:w-[113px] mobile:h-[41px] mobile:text-14-m tablet:w-[135px] tablet:h-[47px] tablet:text-16-m desktop:w-[135px] desktop:h-[47px] desktop:text-16-m",

  empty:
    "mobile:w-[182px] mobile:h-[19px] mobile:text-16-m tablet:w-[182px] tablet:h-[19px] tablet:text-16-m desktop:w-[182px] desktop:h-[19px] desktop:text-16-m",

  experienceRegister:
    "mobile:w-[138px] mobile:h-[48px] mobile:text-16-m tablet:w-[138px] tablet:h-[48px] tablet:text-16-m desktop:w-[138px] desktop:h-[48px] desktop:text-16-m",

  experienceRegister2:
    "mobile:w-[120px] mobile:h-[41px] mobile:text-14-m tablet:w-[120px] tablet:h-[41px] tablet:text-14-m desktop:w-[120px] desktop:h-[41px] desktop:text-14-m",

  modal:
    "mobile:w-[180px] mobile:h-[41px] mobile:text-14-m tablet:w-[200px] tablet:h-[47px] tablet:text-16-m desktop:w-[200px] desktop:h-[47px] desktop:text-16-m",

  myInfo:
    "mobile:w-[157.5px] mobile:h-[48px] mobile:text-14-m tablet:w-[120px] tablet:h-[41px] tablet:text-16-m desktop:w-[120px] desktop:h-[41px] desktop:text-16-m",

  reservation:
    "mobile:w-[157.5px] mobile:h-[37px] mobile:text-14-m tablet:w-[232px] tablet:h-[37px] tablet:text-14-m desktop:w-[71px] desktop:h-[29px] desktop:text-14-m",

  review:
    "mobile:w-[309px] mobile:h-[37px] mobile:text-14-m tablet:w-[476px] tablet:h-[37px] tablet:text-14-m desktop:w-[71px] desktop:h-[29px] desktop:text-14-m",

  reviewModal:
    "mobile:w-[279px] mobile:h-[41px] mobile:text-14-m tablet:w-[325px] tablet:h-[54px] tablet:text-16-m desktop:w-[325px] desktop:h-[54px] desktop:text-16-m",

  search:
    "mobile:w-[85px] mobile:h-[41px] mobile:text-14-m tablet:w-[120px] tablet:h-[50px] tablet:text-16-m desktop:w-[120px] desktop:h-[50px] desktop:text-16-m",

  sign: "mobile:w-[328px] mobile:h-[54px] mobile:text-16-m tablet:w-[640px] tablet:h-[54px] tablet:text-16-m desktop:w-[640px] desktop:h-[54px] desktop:text-16-m",
};

const variantStyles = {
  primary: "bg-brand-500 text-white",
  secondary: "bg-gray-200 text-[#EDEEF2]",
  outline: "bg-white text-[#707177] border border-[#C6C8CF]",
} as const;

function mergeClasses(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

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

  const finalClassName = mergeClasses(
    baseStyle,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth && "w-full",
    rounded && "rounded",
    className,
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalClassName}
      disabled={disabled}
      style={rounded ? { borderRadius: "16px" } : undefined}
    >
      {children}
    </button>
  );
}
