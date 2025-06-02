import { Search as SearchIcon } from "lucide-react";
import React, { useState } from "react";

type SearchProps = {
  placeholder?: string;
  onSearch: (keyword: string) => void;
};

export function Search({ placeholder = "내가 원하는 체험은", onSearch }: SearchProps) {
  const [keyword, setKeyword] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(keyword.trim());
    }
  };

  const handleClick = () => {
    onSearch(keyword.trim());
  };

  return (
    <div className="w-full flex flex-col items-center">
        <h2 className="text-32-b mb-[36px] text-gray-950">
            무엇을 체험하고 싶으신가요?
        </h2>
        <div className={`
            flex items-center 
            bg-white rounded-[24px] shadow-[0px_4px_24px_rgba(0,0,0,0.05)] border-gray-500 
            py-1 pl-[32px] pr-[12px] 
            w-full
            focus-within:ring-2 focus-within:ring-brand-500
        `}>
            <SearchIcon className="text-gray-950 mr-1" size={24} />
            <input
                type="text"
                placeholder={placeholder}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`
                    flex-grow bg-transparent focus:outline-none 
                    text-18-m text-gray-800 
                    placeholder-gray-500 caret-brand-500
                `}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = placeholder)}
            />
            <button
                onClick={handleClick}
                className={`
                    bg-brand-500 text-white rounded-[14px]
                    px-[32px] py-[15px] 
                    text-16-b 
                    hover:bg-brand-500 transition cursor-pointer
                `}
            >
                검색하기
            </button>
        </div>
    </div>
  );
};