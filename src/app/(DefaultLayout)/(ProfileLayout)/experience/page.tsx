"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import Emptylogo from "@/assets/images/logos/logo_empty.svg";
import Button from "@/components/button/Button";
import MyExperienceCard from "@/components/card/MyExperienceCard";
import { ActivityType } from "@/types/activity";

interface ActivityResponse {
  activities: ActivityType[];
  hasNextPage: boolean;
  nextPage: number;
}

// const fetchMyActivities = async ({
//   pageParam = 1,
// }): Promise<ActivityResponse> => {
//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/activities/me?page=${pageParam}`,
//     { withCredentials: true },
//   );
//   return res.data;
// };

// 페이지 번호 기반 더미 데이터 생성 함수

const dummyActivity: ActivityType = {
  id: 1,
  userId: 101,
  title: "한옥 마을 투어",
  description: "전통 한옥에서 즐기는 역사 체험 투어입니다.",
  category: "관광", // ActivityCategoryType에서 허용된 문자열 중 하나
  price: 30000,
  address: "서울 종로구 익선동",
  bannerImageUrl: "/next.svg",
  rating: 4.7,
  reviewCount: 85,
  createdAt: "2025-06-01T10:00:00.000Z",
  updatedAt: "2025-06-05T12:00:00.000Z",
};

// 실제 React Query용 fetch 함수
const fetchMyActivities = async ({
  pageParam = 1,
}): Promise<ActivityResponse> => {
  const data = Array.from({ length: 5 }, (_, i) => ({
    ...dummyActivity,
    id: pageParam * 100 + i, // id가 중복되지 않게
    title: `더미 체험 ${i + 1}`,
    createdAt: new Date(Date.now() - i * 1000000).toISOString(),
  }));

  return {
    activities: data,
    hasNextPage: pageParam < 3,
    nextPage: pageParam + 1,
  };
};

export default function ExperiencePage() {
  const router = useRouter();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: ["myActivities"],
      queryFn: fetchMyActivities,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextPage : undefined,
    });

  const handleDelete = async (id: number) => {
    try {
      // 실제 API 요청
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/activities/${id}`,
        {
          withCredentials: true,
        },
      );

      // 또는 상태를 수동으로 갱신하려면 refetch 사용
      refetch();
    } catch (error) {
      console.error("삭제 실패", error);
    }
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
    <div className="space-y-[3rem]">
      <div className="flex justify-between items-start desktop:gap-[26rem] tablet:gap-[9.5rem]">
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
        <div className="grid gap-[2.4rem] px-[1rem] py-[2rem]">
          {activities.map((activity) => (
            <MyExperienceCard
              key={activity.id}
              {...activity}
              onDelete={handleDelete}
            />
          ))}
          <div ref={observerRef} className="h-1" />
        </div>
      ) : (
        // 빈 상태 유지
        <div className="w-full flex flex-col items-center mt-[5rem] tablet:mt-10 gap-4 text-center">
          <Image src={Emptylogo} alt="빈 체험 목록" width={182} height={182} />
          <p className="text-lg text-gray-400">아직 등록된 체험이 없어요</p>
        </div>
      )}
    </div>
  );
}
