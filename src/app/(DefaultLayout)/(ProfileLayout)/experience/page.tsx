"use client";

import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import myActivityService from "@/apis/myActivity/myActivity.service";
import MyExperienceCard from "@/app/(DefaultLayout)/(ProfileLayout)/experience/(components)/MyExperienceCard";
import Emptylogo from "@/assets/images/logos/logo_empty.svg";
import Button from "@/components/button/Button";
import WarningModal from "@/components/modal/WarningModal";
import { useOverlay } from "@/hooks/useOverlay";
import { ActivityType } from "@/types/activity";

interface ActivityResponse {
  activities: ActivityType[];
  hasNextPage: boolean;
  nextPage: number;
}

const fetchMyActivities = async ({
  pageParam = undefined,
}: QueryFunctionContext): Promise<ActivityResponse> => {
  const { data } = await myActivityService.getMyActivities({
    query: {
      method: "cursor",
      cursorId: pageParam,
      size: 10,
    } as {
      method: "cursor";
      cursorId?: number;
      size: number;
    },
  });

  return {
    activities: data.activities,
    hasNextPage: data.activities.length > 0,
    nextPage: data.cursorId,
  };
};

export default function ExperiencePage() {
  const router = useRouter();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { overlay, close } = useOverlay();

  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: ["myActivities"],
      queryFn: fetchMyActivities,
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextPage : undefined,
    });

  const handleDelete = (id: number) => {
    overlay(
      <WarningModal
        message="삭제하시겠습니까?"
        onConfirm={async () => {
          try {
            await myActivityService.deleteMyActivity({ activityId: id });
            close();
            refetch();
          } catch (error) {
            console.error("삭제 실패", error);
          }
        }}
      />,
    );
  };

  const activities =
    data?.pages
      .flatMap((page) => page.activities)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ) ?? [];

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null, // ✅ 뷰포트 기준
        threshold: 1.0,
      },
    );

    const el = observerRef.current;
    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start desktop:gap-26 tablet:gap-[9.5rem]">
        <div>
          <span className="block text-18-b block tablet:hidden">예약내역</span>
          <span className="block text-gray-500 text-14-m whitespace-nowrap tablet:hidden">
            예약내역 변경 및 취소할 수 있습니다.
          </span>
          <span className="hidden tablet:block text-18-b">내 체험 관리</span>
          <span className="hidden tablet:block text-gray-500 text-14-m whitespace-nowrap">
            체험을 등록하거나 수정 및 삭제가 가능합니다.
          </span>
        </div>

        <Button
          size="experienceRegister"
          className="hidden tablet:block"
          onClick={() => router.push("/experience/update/new")}
        >
          체험 등록하기
        </Button>
      </div>

      {isLoading ? (
        <p>불러오는 중...</p>
      ) : activities.length > 0 ? (
        <div className="grid gap-[2.4rem] px-1">
          {activities.map((activity) => (
            <MyExperienceCard
              key={activity.id}
              title={activity.title}
              price={activity.price}
              bannerImageUrl={activity.bannerImageUrl}
              rating={activity.rating}
              reviewCount={activity.reviewCount}
              onDeleteActivity={() => activity.id && handleDelete(activity.id)}
              onUpdateActivity={() =>
                activity.id && router.push(`/experience/update/${activity.id}`)
              }
            />
          ))}
          <div ref={observerRef} className="h-1" />
        </div>
      ) : (
        // 빈 상태 유지
        <div className="w-full flex flex-col items-center mt-5 tablet:mt-10 gap-4 text-center">
          <Image src={Emptylogo} alt="빈 체험 목록" width={182} height={182} />
          <p className="text-lg text-gray-400">아직 등록된 체험이 없어요</p>
        </div>
      )}
    </div>
  );
}
