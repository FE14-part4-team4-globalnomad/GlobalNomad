'use client'

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
    <div className="mb-[24px]">
      <div className="text-16-b text-gray-950 mb-[14px]">예약 가능한 시간</div>
      {availableTimesForSelectedDate.length === 0 ? (
        <div className="text-center text-gray-500">선택한 날짜에는 예약 가능한 시간이 없습니다.</div>
      ) : (
        <div className="space-y-1 text-16-m">
          {availableTimesForSelectedDate.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`w-full rounded-3xl px-[128px] py-[16px] ${
                selectedTime === time 
                    ? 'border-2 border-brand-500 text-brand-500 bg-brand-100' 
                    : 'border border-gray-300 text-gray-950 bg-white'
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