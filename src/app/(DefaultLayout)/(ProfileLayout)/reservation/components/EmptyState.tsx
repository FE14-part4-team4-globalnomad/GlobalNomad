"use client";

import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";

interface EmptyStateProps {
  onClick: () => void;
}

function EmptyState({ onClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-5 gap-1">
      <Icon name="Empty" size={182} />
      <p className="text-18-m text-gray-600">아직 예약한 체험이 없어요</p>
      <Button size="empty" variant="primary" rounded onClick={onClick}>
        둘러보기
      </Button>
    </div>
  );
}

export default EmptyState;
