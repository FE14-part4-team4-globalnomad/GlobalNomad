import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface CustomInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({
  label,
  placeholder,
  type = "text",
  error,
  value,
  onChange,
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const actualType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="flex flex-col gap-[1rem]">
      {label && (
        <label className="text-16-b text-gray-950 mt-[2.4rem] ">{label}</label>
      )}
      <div className="relative">
        <input
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full h-[5.4rem] px-[2rem] py-[1.6rem]
            border ${error ? "border-red-500" : "border-gray-100"}
            rounded-[1.6rem] text-16-m focus:outline-none focus:ring-2 focus:ring-brand-500
          `}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
