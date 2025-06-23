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
    <div className="flex w-full mobile:w-[30rem] mobile:h-[3rem] h-[3.9rem] gap-[1rem]">
      {STATUS_LIST.map((status) => (
        <button
          key={status.value}
          onClick={() => setSelectedStatus(status.value)}
          className={`px-[1rem] mobile:px-[0.5rem] py-[0.5rem] border-[1px] rounded-[100px] text-16-m mobile:text-11-m ${
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
