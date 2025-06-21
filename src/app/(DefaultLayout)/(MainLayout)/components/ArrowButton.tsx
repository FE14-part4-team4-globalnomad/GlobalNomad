import { Icon } from "@/components/icon/Icon";
import { ArrowButtonProps } from "@/types/arrowButton";

export default function ArrowButton({ onClick }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-[54px] h-[54px] rounded-full bg-white border border-black/30 drop-shadow-card flex items-center justify-center transition"
    >
      {/* <Image src={IconArrowNext} alt="arrow" width={24} height={24} /> */}
      <Icon name="ArrowBack" className="rotate-180" />
    </button>
  );
}
