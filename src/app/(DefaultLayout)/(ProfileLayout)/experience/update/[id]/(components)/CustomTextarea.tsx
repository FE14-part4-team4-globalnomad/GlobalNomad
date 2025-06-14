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
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-900">{label}</label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className={`
          w-full px-3 py-2
          border ${error ? "border-red-500" : "border-gray-300"}
          rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500
          resize-none
        `}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
