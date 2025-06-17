'use client';

import { format } from 'date-fns';
import { useOverlay } from "@/hooks/useOverlay";
import { useActivityReservationMutation } from '@/apis/activity/activity.query';

import Button from '@/components/button/Button';
import ConfirmModal from "@/components/modal/ConfirmModal";

type ReservationBtnProps = {
  pricePerPerson: number;
  onReserve?: () => void;
  isReady: boolean;
  onDateClick?: () => void;
  isMine?: boolean;
  activityId: number;
  selectedDate: Date | null;
  selectedTime: string | null;
  guestCount: number;
  availableSchedule: {
    date: string;
    times: {
      id: number;
      startTime: string;
    }[];
  }[];
};

export default function ReservationBtn({
  pricePerPerson,
  onReserve,
  isReady,
  onDateClick,
  isMine = false,
  activityId,
  selectedDate,
  selectedTime,
  guestCount,
  availableSchedule,
}: ReservationBtnProps) {
  if (!isMine) return null;

  const { overlay } = useOverlay();
  const { mutate: reserveActivity } = useActivityReservationMutation();

  const handleReserve = () => {
  const scheduleId = findScheduleId(selectedDate, selectedTime, availableSchedule);

  if (!scheduleId) {
    return;
  }

  reserveActivity(
    {
      activityId,
      payload: {
        scheduleId,
        headCount: guestCount,
      },
    },
    {
      onSuccess: () => {
        overlay(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <ConfirmModal
              message="예약이 완료되었습니다."
            />
          </div>
        );
      },
    }
  );
};

  const formattedDateTime = selectedDate && selectedTime
    ? (() => {
        const [start, end] = selectedTime.split('~');
        return `${format(selectedDate, 'yy/MM/dd')} ${start.trim()} ~ ${end?.trim() ?? getEndTime(start.trim())}`;
      })()
    : null;

  return (
    <div className="py-2 px-[24px] bg-white border-t border-gray-100">
      <div className="mb-1 flex justify-between items-center max-w-[700px] mx-auto w-full mobile:max-w-[400px]">
        <div>
          <span className="text-24-b text-gray-950">
            ₩ {pricePerPerson.toLocaleString()}{' '}
          </span>
          <span className="text-20-m text-gray-500">/ 인</span>
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onDateClick?.();
          }}
          className="text-16-b text-brand-500 underline cursor-pointer"
        >
          {formattedDateTime ?? '날짜 선택하기'}
        </a>
      </div>

      <div className="flex justify-center">
        <Button
          size="calendar"
          variant={isReady ? 'primary' : 'secondary'}
          fullWidth
          rounded
          onClick={handleReserve}
          disabled={!isReady}
        >
          예약하기
        </Button>
      </div>
    </div>
  );
}

function getEndTime(startTime: string): string {
  const [hour, minute] = startTime.split(':').map(Number);
  const endHour = hour + 1;
  return `${String(endHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function findScheduleId(
  selectedDate: Date | null,
  selectedTime: string | null,
  availableSchedule: ReservationBtnProps["availableSchedule"]
): number | null {
  if (!selectedDate || !selectedTime) return null;

  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  const [start] = selectedTime.split('~');

  const daySchedule = availableSchedule.find((s) => s.date === formattedDate);
  const matchedTime = daySchedule?.times.find((t) => t.startTime === start.trim());

  return matchedTime?.id ?? null;
}
