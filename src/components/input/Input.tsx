import { Eye, EyeOff } from "lucide-react";
import { forwardRef, InputHTMLAttributes, useState } from "react";

import { cn } from "@/utils/classNames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, type = "text", className, disabled, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";

    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={id} className="text-16-m text-gray-950 mb-1">
            {label}
          </label>
        )}
        <div className="relative text-14-m">
          <input
            id={id}
            ref={ref}
            type={isPasswordType ? (showPassword ? "text" : "password") : type}
            disabled={disabled}
            className={cn(
              "h-[54px] w-full rounded-[16px] border px-2 py-[17.5px] placeholder:text-gray-400 focus:outline-non",
              "focus:outline-none focus:ring-2 focus:ring-brand-500",
              error ? "border-red-500" : "border-gray-100",
              disabled
                ? "text-gray-600 bg-gray-25 cursor-not-allowed"
                : "text-gray-950 focus:ring-brand-500",
              className,
            )}
            {...rest}
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-12-m mt-[6px]">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
