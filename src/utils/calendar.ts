import dayjs from "dayjs";

type CalendarMatrixCellType = { date: dayjs.Dayjs; isCurrentMonth: boolean };

/**
 * 달력 일자 배열 생성
 */
export const getCalendarMatrix = (year: number, month: number) => {
  const firstDay = dayjs(`${year}-${month}-01`);
  const startOfCalendar = firstDay.startOf("week"); // 일요일부터 시작
  const days: CalendarMatrixCellType[] = [];

  for (let i = 0; i < 35; i++) {
    const current = startOfCalendar.add(i, "day");
    days.push({
      date: current,
      isCurrentMonth: current.month() + 1 === month,
    });
  }

  return days;
};

/**
 * 연도 포맷 함수
 */
export const formatYear = (year: number) => year.toString().padStart(4, "0");

/**
 * 월 포맷 함수
 */
export const formatMonth = (month: number) => month.toString().padStart(2, "0");

/**
 * 한국 기준 시간 조회
 */
export const nowKST = new Date(
  new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }),
);
