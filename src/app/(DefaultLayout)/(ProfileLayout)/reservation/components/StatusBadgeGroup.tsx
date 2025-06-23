"use client";

type StatusBadgeGroupProps = {
  selectedStatus: string | null;
  setSelectedStatus: (status: string) => void;
};

const STATUS_LIST = [
  { label: "예약 완료", value: "pending" },
  { label: "예약 취소", value: "canceled" },
  { label: "예약 승인", value: "confirmed" },
  { label: "예약 거절", value: "declined" },
  { label: "체험 완료", value: "completed" },
];

export default function StatusBadgeGroup({
  selectedStatus,
  setSelectedStatus,
}: StatusBadgeGroupProps) {
  return (
    <div className="w-[48.2rem] h-[3.9rem] flex gap-2">
      {STATUS_LIST.map((status) => (
        <button
          key={status.value}
          onClick={() => setSelectedStatus(status.value)}
          className={`w-[9rem] border text-16-m rounded-full ${
            selectedStatus === status.value
              ? "bg-[#333333] text-white border-[#333333]"
              : "border-[#d8d8d8] text-gray-950"
          }`}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}
