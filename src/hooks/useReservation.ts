import { useState, useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';

import { useActivityAvailableScheduleQuery } from '@/apis/activity/activity.query';
import { ActivityScheduleTimeType } from '@/types/activity';

type UseReservationProps = {
  pricePerPerson: number;
  initialGuestCount?: number;
  initialDate?: Date;
  activityId: number;
};

export default function useReservation({
  pricePerPerson,
  initialGuestCount = 1,
  initialDate = new Date(),
  activityId,
}: UseReservationProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  // 🔁 예약 가능 일정 불러오기 (달력에서 보고 있는 달 기준)
  const { data: schedule } = useActivityAvailableScheduleQuery({
    activityId,
    query: {
      year: String(currentYear),
      month: String(currentMonth + 1).padStart(2, '0'),
    },
  });

  const availableDates: Record<string, string[]> = useMemo(() => {
    return schedule?.reduce((acc, cur) => {
      const dateKey = format(parseISO(cur.date), 'yyyy-MM-dd');
      acc[dateKey] = cur.times.map(t => `${t.startTime}~${t.endTime}`);
      return acc;
    }, {} as Record<string, string[]>) ?? {};
  }, [schedule]);

  const [availableTimesForSelectedDate, setAvailableTimesForSelectedDate] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimesForSelectedDate([]);
      setSelectedTime('');
      return;
    }

    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const times = availableDates[dateKey] || [];
    setAvailableTimesForSelectedDate(times);

    if (!times.includes(selectedTime)) {
      setSelectedTime(times[0] || '');
    }
  }, [selectedDate, availableDates]);

  const handleDecrease = () => {
    if (guestCount > 1) setGuestCount(guestCount - 1);
  };

  const handleIncrease = () => {
    setGuestCount(guestCount + 1);
  };

  const handlePrevMonth = () => {
    const newMonth = currentMonth - 1;
    if (newMonth < 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth + 1;
    if (newMonth > 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const total = guestCount * pricePerPerson;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;

  const selectedScheduleId = useMemo(() => {
    if (!selectedDate || !selectedTime) return null;

    const [startTime] = selectedTime.split('~');
    const dateKey = format(selectedDate, 'yyyy-MM-dd');

    const daySchedule = schedule?.find(s => format(parseISO(s.date), 'yyyy-MM-dd') === dateKey);
    const match = daySchedule?.times.find(t => t.startTime === startTime);

    return match?.id ?? null;
  }, [selectedDate, selectedTime, schedule]);


  return {
    selectedDate,
    setSelectedDate,
    guestCount,
    handleDecrease,
    handleIncrease,
    selectedTime,
    setSelectedTime,
    currentYear,
    currentMonth,
    handlePrevMonth,
    handleNextMonth,
    total,
    daysInMonth,
    startDay,
    prevMonthDays,
    totalCells,
    availableTimesForSelectedDate,
    availableDates,
    selectedScheduleId,
  };
}