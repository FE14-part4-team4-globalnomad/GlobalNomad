import { Icon } from "../icon/Icon";
import { PaginationProps } from "@/types/pagination";
import { cn } from "@/utils/classNames";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages < 1) return null;

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
        className="flex items-center justify-center"
      >
        {/* <Image
          src={currentPage === 1 ? BackArrowGray : BackArrowBlack}
          alt="이전 페이지"
          width={7}
          height={11}
        /> */}
        <Icon
          name="ArrowPagination"
          size={40}
          className={currentPage === 1 ? "text-gray-300" : "text-gray-950"}
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
                ? "text-black font-bold border-b-[0.2rem] border-brand-500 cursor-pointer"
                : "text-gray-300 font-medium cursor-pointer"
            }
`}
        >
          {page}
        </button>
      ))}

      {/* ▶️ 다음 버튼 */}
      <button
        onClick={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
        disabled={currentPage >= totalPages}
        className="flex items-center justify-center"
      >
        {/* <Image
          src={currentPage >= totalPages ? NextArrowGray : NextArrowBlack}
          alt="다음 페이지"
          width={7}
          height={11}
        /> */}
        <Icon
          name="ArrowPagination"
          size={40}
          className={cn(
            "rotate-180",
            currentPage >= totalPages ? "text-gray-300" : "text-gray-950",
          )}
        />
      </button>
    </div>
  );
}
