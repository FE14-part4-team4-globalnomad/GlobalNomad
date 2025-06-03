import React, { useRef } from "react";

import Input from "../input/Input";

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
      <div className="w-full relative">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = placeholder)}
          className="pl-[56px] pr-[150px] h-[64px] text-18-m"
        />
        <img
          src="/src/assets/icons/any/icon_search.svg"
          alt="검색 아이콘"
          className="absolute left-[20px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] text-gray-500"
        />
        <button
          onClick={handleSearch}
          className="absolute right-[12px] top-1/2 -translate-y-1/2 bg-brand-500 text-white rounded-[14px] px-[24px] py-[10px] text-16-b hover:bg-brand-600 transition cursor-pointer"
        >
          검색하기
        </button>
      </div>
    </div>
  );
}
