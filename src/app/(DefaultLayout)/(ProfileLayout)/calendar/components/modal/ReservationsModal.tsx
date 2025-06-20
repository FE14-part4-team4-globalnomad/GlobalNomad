import dayjs from "dayjs";
import { useEffect, useState } from "react";

import ReservationList from "./ReservationList";
import { useMyReservedSchedule } from "@/apis/myActivity/myActivity.query";
import DefaultDropdown from "@/components/dropdown/DefaultDropdown";
import { Icon } from "@/components/icon/Icon";
import {
  MyActivityReservationStatusType,
  MyActivityReservedScheduleType,
} from "@/types/myActivity";
import { cn, cond } from "@/utils/classNames";

interface ReservationsModalProps {
  activityId: number;
  date: dayjs.Dayjs;
  onClose: () => void;
}
export default function ReservationsModal({
  activityId,
  date,
  onClose,
}: ReservationsModalProps) {
  const [tab, setTab] = useState<"pending" | MyActivityReservationStatusType>(
    "pending",
  );
  const tabList = [
    { status: "pending", label: "신청" },
    { status: "confirmed", label: "승인" },
    { status: "declined", label: "거절" },
  ] as {
    label: "신청" | "승인" | "거절";
    status: "pending" | MyActivityReservationStatusType;
  }[];

  type SelectedSchedule = {
    id: number;
    title: string;
  } & MyActivityReservedScheduleType;
  const [schedule, setSchedule] = useState<SelectedSchedule>();
  const { data: scheduleResult, isSuccess } = useMyReservedSchedule(
    activityId,
    { date: date?.format("YYYY-MM-DD") },
  );

  useEffect(() => {
    if (!schedule && isSuccess && scheduleResult?.length > 0) {
      const selected = scheduleResult[0];
      setSchedule({
        ...selected,
        id: selected.scheduleId,
        title: `${selected.startTime} - ${selected.endTime}`,
      });
    }
  }, [isSuccess, scheduleResult, schedule]);
  return (
    <div className="fixed z-10 inset-0 bg-dimmed flex justify-center items-center">
      <div className="bg-white py-[30px] px-[24px] rounded-[30px] min-w-[340px] grid gap-[30px]">
        <div className="grid justify-stretch gap-[12px]">
          <div className="flex justify-between items-center text-20-b">
            {date?.format("YY년 MM월 DD일")}
            <button onClick={onClose}>
              <Icon name="Close" />
            </button>
          </div>
          <div className="flex items-stretch gap-[8px] h-[40px] border-b-1 border-gray-100">
            {tabList.map(({ status, label }) => (
              <button
                key={status}
                onClick={() => setTab(status)}
                className={cn(
                  "flex gap-[4px] px-[14px]",
                  cond(
                    tab === status,
                    "text-brand-500 border-b-[2px] border-brand-500",
                  ),
                )}
              >
                {label}
                {status === "pending" && <div>{schedule?.count?.pending}</div>}
                {status === "confirmed" && (
                  <div>{schedule?.count?.confirmed}</div>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-[12px]">
          <label className="text-18-b">예약 시간</label>
          <DefaultDropdown
            optionList={scheduleResult?.map((el) => {
              return {
                ...el,
                id: el.scheduleId,
                title: `${el.startTime} - ${el.endTime}`,
              };
            })}
            selectedItem={schedule}
            onSelect={setSchedule}
          />
        </div>
        {!!schedule && (
          <ReservationList
            {...{ activityId, scheduleId: schedule.scheduleId, status: tab }}
          />
        )}
      </div>
    </div>
  );
}
