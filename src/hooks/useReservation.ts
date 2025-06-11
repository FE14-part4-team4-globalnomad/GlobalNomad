import { useState, useEffect } from 'react';
import { format } from 'date-fns';

type UseReservationProps = {
  pricePerPerson: number;
  initialGuestCount?: number;
  initialDate?: Date;
  availableDates: Record<string, string[]>;
};

export default function useReservation({
  pricePerPerson,
  initialGuestCount = 1,
  initialDate = new Date(),
  availableDates,
}: UseReservationProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth()); // 0-based

  const [availableTimesForSelectedDate, setAvailableTimesForSelectedDate] = useState<string[]>([]);

  useEffect(() => {
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