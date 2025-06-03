import Image from "next/image";

import BackArrowBlack from "@/assets/icons/arrow/icon_back_pagination_black.png";
import BackArrowGray from "@/assets/icons/arrow/icon_back_pagination_gray.png";
import NextArrowBlack from "@/assets/icons/arrow/icon_next_pagination_black.png";
import NextArrowGray from "@/assets/icons/arrow/icon_next_pagination_gray.png";
import { PaginationProps } from "@/types/pagination";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const generatePageRange = (): number[] => {
    const totalToShow = 5;
    const half = Math.floor(totalToShow / 2);

    let start = Math.max(currentPage - half, 1);
    let end = start + totalToShow - 1;

    // 끝 범위 넘지 않도록 보정
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - totalToShow + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const paginationRange = generatePageRange();

  return (
    <div className="flex items-center justify-center gap-[0.4rem]">
      {/* ◀️ 이전 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-[4rem] h-[4rem] disabled:opacity-50 flex items-center justify-center  ${currentPage === 1 ? "opacity-50" : "cursor-pointer"}`}
      >
        <Image
          src={currentPage === 1 ? BackArrowGray : BackArrowBlack}
          alt="이전 페이지"
          width={7}
          height={11}
        />
      </button>

      {/* 페이지 번호 */}
      {paginationRange.map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`w-[4rem] h-[4rem] flex items-center justify-center text-[1.4rem] leading-none 
            ${
              page === currentPage
                ? "text-[var(--black)] font-bold border-b-[0.2rem] border-[var(--brand-500)] cursor-pointer"
                : "text-[var(--gray-300)] font-medium cursor-pointer"
            }
`}
        >
          {page}
        </button>
      ))}

      {/* ▶️ 다음 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-[4rem] h-[4rem] disabled:opacity-50 flex items-center justify-center  ${
          currentPage === totalPages ? "opacity-50" : "cursor-pointer"
        }`}
      >
        <Image
          src={currentPage === totalPages ? NextArrowGray : NextArrowBlack}
          alt="다음 페이지"
          width={7}
          height={11}
        />
      </button>
    </div>
  );
}
