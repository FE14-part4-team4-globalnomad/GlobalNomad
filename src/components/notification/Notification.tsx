"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback, useState } from "react";

import {
  useDeleteMyNotificationMutation,
  useMyNotificationListQuery,
} from "@/apis/notification/notification.query";
import deleteIcon from "@/assets/icons/any/icon_delete.svg";

type LocalNotificationType = {
  id: number;
  content: string;
  createdAt: string;
};

export default function Notification() {
  const ref = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage } = useMyNotificationListQuery();
  const { mutate: deleteNotification } = useDeleteMyNotificationMutation();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const notifications: LocalNotificationType[] =
    data?.pages.flatMap((page) => page.notifications) ?? [];

  const transformNotification = (item: LocalNotificationType) => {
    const isApproved = item.content.includes('승인');

    const match = item.content.match(
      /^(.*)\((\d{4}-\d{2}-\d{2} \d{2}:\d{2}~\d{2}:\d{2})\).*예약이\s*(승인|거절)되었습니다?\.?$/
    );

    let title = "";
    let dateRange = "";
    let status = isApproved ? "승인" : "거절";

    if (match) {
      title = match[1].trim();
      dateRange = match[2].trim();
      status = match[3].trim();
    } else {
      title = item.content;
    }

    const createdTime = new Date(item.createdAt).getTime();
    const now = new Date().getTime();
    const diffInMinutes = Math.floor((now - createdTime) / (1000 * 60));

    let timeAgoLabel = "";
    if (diffInMinutes < 1) {
      timeAgoLabel = "방금 전";
    } else if (diffInMinutes < 60) {
      timeAgoLabel = `${diffInMinutes}분 전`;
    } else if (diffInMinutes < 60 * 24) {
      const hours = Math.floor(diffInMinutes / 60);
      timeAgoLabel = `${hours}시간 전`;
    } else if (diffInMinutes < 60 * 24 * 30) {
      const days = Math.floor(diffInMinutes / (60 * 24));
      timeAgoLabel = `${days}일 전`;
    } else {
      timeAgoLabel = "한 달 이상";
    }

    return {
      id: item.id,
      type: `예약 ${status}`,
      title,
      dateRange,
      status,
      timeAgoLabel,
    };
  };

  useEffect(() => {
    const loaderEl = loaderRef.current;
    if (!loaderEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    observer.observe(loaderEl);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleDeleteSelected = useCallback(() => {
    if (selectedId !== null) {
      deleteNotification(selectedId);
      setSelectedId(null);
    }
  }, [selectedId, deleteNotification]);

  return (
    <div
      ref={ref}
      className="absolute top-[15px] right-0 w-23 max-h-[326px] bg-white shadow-lg rounded-2xl z-50 pb-1 overflow-y-auto [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex justify-between items-center py-[16px] px-2 sticky top-0 bg-white z-10">
        <span className="text-16-b text-gray-950">
          알림 {notifications.length}개
        </span>
        {selectedId !== null && (
          <button onClick={handleDeleteSelected}>
            <Image src={deleteIcon} alt="선택 항목 삭제" width={24} height={24} />
          </button>
        )}
      </div>

      {[...notifications]
        .map(transformNotification)
        .sort((a, b) => b.id - a.id)
        .map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={`cursor-pointer py-[16px] px-2 transition ${
              selectedId === item.id ? 'bg-brand-100' : ''
            }`}
          >
            <p className="text-14-b text-gray-950 mb-1">
              {item.type}
              <span className="text-gray-400 text-12-m float-right">
                {item.timeAgoLabel}
              </span>
            </p>
            <div className="16-body-m text-gray-950">
              <p>{item.title}</p>
              <p className="">({item.dateRange})</p>
              <p>
                예약이{' '}
                <span
                  className={
                    item.status === "승인" ? "text-brand-500" : "text-red-500"
                  }
                >
                  {item.status}
                </span>{" "}
                되었어요.
              </p>
            </div>
          </div>
        ))}

      {notifications.length === 0 ? (
        <div className="py-4 text-center text-gray-400 text-sm">
          알림이 없습니다.
        </div>
      ) : hasNextPage ? (
        <div ref={loaderRef} className="py-4 text-center text-gray-400 text-sm">
          불러오는 중...
        </div>
      ) : null}
    </div>
  );
}