import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
<<<<<<< HEAD
=======
import { forwardRef, InputHTMLAttributes, useState } from "react";

import { cn } from "@/utils/classNames";
>>>>>>> a2b9340b78a2d037661545fa35591854d681aae3

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
<<<<<<< HEAD
  ({ id, label, error, type = "text", className, ...rest }, ref) => {
=======
  ({ id, label, error, type = "text", className, disabled, ...rest }, ref) => {
>>>>>>> a2b9340b78a2d037661545fa35591854d681aae3
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";

    return (
      <div className="flex flex-col">
<<<<<<< HEAD
        {label && <label htmlFor={id} className="text-16-m text-gray-950 mb-1">{label}</label>}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={isPasswordType ? (showPassword ? "text" : "password") : type}
            className={`
              h-[54px] w-full
              rounded-[16px] border
              px-2 py-[17.5px]
              text-14-m text-gray-950
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-brand-500
              ${error ? "border-red-500" : "border-gray-100"}
              ${className ?? ""}
            `}
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
        {error && (
          <p className="text-red-500 text-12-m mt-[6px]">{error}</p>
=======
        {label && (
          <label htmlFor={id} className="text-16-m text-gray-950 mb-1">
            {label}
          </label>
>>>>>>> a2b9340b78a2d037661545fa35591854d681aae3
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
<<<<<<< HEAD
  }
);

Input.displayName = "Input";
export default Input;
=======
  },
);

Input.displayName = "Input";
export default Input;
>>>>>>> a2b9340b78a2d037661545fa35591854d681aae3
