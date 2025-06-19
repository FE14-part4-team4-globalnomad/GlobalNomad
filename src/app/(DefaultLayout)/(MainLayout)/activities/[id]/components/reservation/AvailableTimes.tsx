"use client"

type AvailableTimesProps = {
  availableTimesForSelectedDate: string[];
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
};

export default function AvailableTimes({
  availableTimesForSelectedDate,
  selectedTime,
  setSelectedTime,
}: AvailableTimesProps) {
  return (
    <div className="mb-[24px] tablet:mb-[36px]">
      <div className="text-16-b text-gray-950 mb-[14px]">예약 가능한 시간</div>
      {availableTimesForSelectedDate.length === 0 ? (
        <div className="mt-[14px] text-16-m text-center text-gray-500">날짜를 선택해주세요.</div>
      ) : (
        <div className="space-y-1 text-16-m">
          {availableTimesForSelectedDate.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`w-full flex justify-center items-center rounded-3xl py-[16px] tablet:py-[14px] 
                ${
                  selectedTime === time 
                      ? "border-2 border-brand-500 text-brand-500 bg-brand-100" 
                      : "border border-gray-300 text-gray-950 bg-white"
                }`}
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}