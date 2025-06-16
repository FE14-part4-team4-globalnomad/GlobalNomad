interface CustomTextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

export default function CustomTextarea({
  label,
  placeholder,
  value,
  onChange,
  error,
}: CustomTextareaProps) {
  return (
    <div className="flex flex-col gap-[1rem]">
      {label && (
        <label className="text-16-b text-gray-950 mt-[2.4rem] ">{label}</label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className={`
          w-full px-3 py-2
          border ${error ? "border-red-500" : "border-gray-100"}
          rounded-[1.6rem] text-16-m focus:outline-none focus:ring-2 focus:ring-brand-500
          resize-none
        `}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
