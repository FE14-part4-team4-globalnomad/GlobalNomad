"use client";

import Image from "next/image";
import { useState } from "react";

import iconDelete from "@/assets/icons/any/icon_delete.svg?url";
import iconStarActive from "@/assets/icons/star/icon_star_active.svg?url";
import iconStarInactive from "@/assets/icons/star/icon_star_inactive.svg?url";
import Button from "@/components/button/Button";
import ModalWrapper from "@/components/modal/ModalWrapper";
import { useOverlay } from "@/hooks/useOverlay";
import { ReviewModalProps } from "@/types/reservation";

export default function ReviewModal({
  title,
  schedule,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const overlay = useOverlay();

  return (
    <ModalWrapper className="w-[38.5rem] h-[54.9rem] p-[30px] rounded-[30px] flex flex-col gap-[24px]">
      <div className="flex justify-end w-full">
        <button onClick={() => overlay.close()}>
          <Image src={iconDelete} alt="닫기 아이콘" width={24} height={24} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-[20px]">
        <div className="flex flex-col items-center gap-[6px] text-center">
          <p className="text-16-b text-brand-900">{title}</p>
          <p className="text-14-m text-gray-500">{schedule}</p>
        </div>

        <div className="flex justify-center gap-[8px]">
          {Array.from({ length: 5 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setRating(idx + 1)}
              className="text-yellow-400"
            >
              <Image
                src={rating > idx ? iconStarActive : iconStarInactive}
                alt={rating > idx ? "활성 별" : "비활성 별"}
                width={32}
                height={32}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Textarea */}
      <div className="flex flex-col gap-[12px] w-full">
        <div className="text-18-b text-black text-left">
          소중한 경험을 들려주세요
        </div>

        <div className="relative w-full">
          <textarea
            className="w-full min-h-[17.9rem] border border-gray-200 rounded-[8px] p-2 text-16-m text-gray-950 placeholder:text-gray-400 resize-none"
            placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
            maxLength={100}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end text-14-m text-gray-600">
          {content.length}/100
        </div>
      </div>

      {/* Section 3: Submit Button */}
      <div className="mt-auto">
        <Button size="reviewModal" onClick={() => onSubmit(rating, content)}>
          작성하기
        </Button>
      </div>
    </ModalWrapper>
  );
}
