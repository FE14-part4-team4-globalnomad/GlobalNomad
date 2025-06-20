"use client";

import Image from "next/image";
import { useState } from "react";

import Calendar from "./components/Calendar";
import { useMyActivities } from "@/apis/myActivity/myActivity.query";
import EmptyLogo from "@/assets/images/logos/logo_empty.svg";
import DefaultDropdown from "@/components/dropdown/DefaultDropdown";
import { ActivityType } from "@/types/activity";

export default function CalendarPage() {
  const { data: myActivities } = useMyActivities();
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>();

  return (
    <div className="w-full grid justify-stretch gap-[24px] tablet:gap-[32px]">
      <div className="grid gap-[4px]">
        <h1 className="text-18-b">예약 현황</h1>
        <div className="text-14-m text-gray-500">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </div>
      </div>
      {!!myActivities?.activities?.length ? (
        <div className="grid justify-stretch gap-[18px] tablet:gap-[24px] desktop:gap-[30px]">
          <DefaultDropdown
            placeholder="예약 현황을 조회할 내 체험을 선택해 주세요."
            optionList={myActivities?.activities}
            selectedItem={selectedActivity}
            onSelect={(activity: ActivityType) => setSelectedActivity(activity)}
          />
          {!!selectedActivity && <Calendar activityId={selectedActivity?.id} />}
        </div>
      ) : (
        <div className="w-full grid justify-center tablet:mt-[8px]">
          <Image
            src={EmptyLogo}
            alt="빈 예약현황 미리보기 이미지"
            width={182}
            height={182}
          />
          <div className="text-18-m text-gray-600">
            아직 등록한 체험이 없어요
          </div>
        </div>
      )}
    </div>
  );
}
