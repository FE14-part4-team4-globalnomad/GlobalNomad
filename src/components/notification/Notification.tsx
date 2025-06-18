'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import deleteIcon from '@/assets/icons/any/icon_delete.svg';

type NotificationType = {
  id: number;
  type: '예약 승인' | '예약 거절';
  description: string;
  time: string;
  date: string;
  status: '승인' | '거절';
};

// 초기 더미 데이터 생성
const generateDummy = (startId: number, count = 10): NotificationType[] =>
  Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    const isApproved = id % 2 === 0;
    return {
      id,
      type: isApproved ? '예약 승인' : '예약 거절',
      description: '함께하면 즐거운 스트릿 댄스',
      time: `${id}분 전`,
      date: '2023-01-14 15:00~18:00',
      status: isApproved ? '승인' : '거절',
    };
  });

export default function Notification() {
  const ref = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>(generateDummy(1));
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [nextId, setNextId] = useState(11);

  useEffect(() => {
    const loaderEl = loaderRef.current; // ✅ 현재 ref 값을 고정

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setNotifications((prev) => [...prev, ...generateDummy(nextId)]);
                setNextId((id) => id + 10);
            }
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        }
    );

    if (loaderEl) {
        observer.observe(loaderEl);
    }

    return () => {
        if (loaderEl) observer.unobserve(loaderEl);
    };
    }, [nextId]);

  const handleDelete = () => {
    if (selectedId === null) return;
    setNotifications((prev) => prev.filter((item) => item.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <div
      ref={ref}
      className="absolute top-[3.6rem] right-0 w-23 max-h-[326px] bg-white shadow-lg rounded-2xl z-50 pb-1 overflow-y-auto [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex justify-between items-center py-[16px] px-2 sticky top-0 bg-white z-10">
        <span className="text-16-b text-gray-950">알림 {notifications.length}개</span>
        <button onClick={handleDelete}>
          <Image src={deleteIcon} alt="삭제" />
        </button>
      </div>

      {[...notifications]
        .sort((a, b) => a.id - b.id) // 최신순 정렬
        .map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`cursor-pointer py-[16px] px-2 ${
              selectedId === item.id ? 'bg-brand-100' : ''
            }`}
          >
            <p className="text-14-b text-gray-950 mb-1">
              {item.type}
              <span className="text-gray-400 text-12-m float-right">{item.time}</span>
            </p>
            <div className="text-body-14 text-gray-800">
              {item.description}
              {item.date}
              <p>
                예약이{' '}
                <span className={item.status === '승인' ? 'text-brand-500' : 'text-red-500'}>
                  {item.status}
                </span>{' '}
                되었어요.
              </p>
            </div>
          </div>
        ))}

      <div ref={loaderRef} className="py-4 text-center text-gray-400 text-sm">
        불러오는 중...
      </div>
    </div>
  );
}