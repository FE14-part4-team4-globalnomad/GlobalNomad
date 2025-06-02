import { InputHTMLAttributes, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, type = "text", className, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  return (
    <div className="flex flex-col">
      <label className="text-16-m text-gray-950 mb-1">{label}</label>
      <div className="relative">
        <input
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
      )}
    </div>
  );
}

export default Input;
