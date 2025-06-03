import React, { useRef } from "react";

type SearchProps = {
  placeholder?: string;
  onSearch: (keyword: string) => void;
};

export function Search({ placeholder = "내가 원하는 체험은", onSearch }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const keyword = inputRef.current?.value.trim() ?? "";
    if (!keyword) return;
    onSearch(keyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-32-b mb-[36px] text-gray-950">무엇을 체험하고 싶으신가요?</h2>
      <div
        className={`
          flex items-center py-1 pl-[32px] pr-[12px] w-full focus-within:ring-2 focus-within:ring-brand-500
          bg-white rounded-[24px] shadow-[0px_4px_24px_rgba(0,0,0,0.05)] border-gray-500 
        `}
      >
        <img src="/src/assets/icons/any/icon_search.svg" alt="검색 아이콘" className="mr-1 w-[24px] h-[24px]" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent focus:outline-none text-18-m text-gray-800 placeholder-gray-500 caret-brand-500"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = placeholder)}
        />
        <button
          onClick={handleSearch}
          className="bg-brand-500 text-white rounded-[14px] px-[32px] py-[15px] text-16-b hover:bg-brand-500 transition cursor-pointer"
        >
          검색하기
        </button>
      </div>
    </div>
  );
}