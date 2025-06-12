import { useState, useEffect } from 'react';
import { format } from 'date-fns';

type UseReservationProps = {
  pricePerPerson: number;
  initialGuestCount?: number;
  initialDate?: Date;
  availableDates: Record<string, string[]>;
};

function isDateAvailable(date: Date, availableDates: Record<string, string[]>) {
  const dateKey = format(date, 'yyyy-MM-dd');
  return dateKey in availableDates;
}

function findFirstAvailableDate(availableDates: Record<string, string[]>): Date | null {
  const sortedKeys = Object.keys(availableDates).sort();
  return sortedKeys.length > 0 ? new Date(sortedKeys[0]) : null;
}

export default function useReservation({
  pricePerPerson,
  initialGuestCount = 1,
  initialDate = new Date(),
  availableDates,
}: UseReservationProps) {
  // 초기에는 선택된 날짜 없음 (null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  const [availableTimesForSelectedDate, setAvailableTimesForSelectedDate] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedDate) {
      // 날짜가 선택되지 않은 경우 예약 가능한 시간 비우기 및 선택 시간 초기화
      setAvailableTimesForSelectedDate([]);
      setSelectedTime('');
      return;
    }

    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const times = availableDates[dateKey] || [];
    setAvailableTimesForSelectedDate(times);

    // 현재 선택된 시간이 없거나 해당 날짜에 없는 경우 첫 번째 시간 또는 빈 문자열로 설정
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

  const isAvailable = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return Object.keys(availableDates).includes(dateKey);
  };

  const total = guestCount * pricePerPerson;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;

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
    isAvailable,
    total,
    daysInMonth,
    startDay,
    prevMonthDays,
    totalCells,
    availableTimesForSelectedDate,
  };
}