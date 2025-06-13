// 태블릿, 모바일 예약 컴포넌트 보여주는 컴포넌트

'use client';

import React, { useEffect } from 'react';

import styles from "@/styles/slideuppanel.module.css";

type SlidePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function SlidePanel({ isOpen, onClose, children }: SlidePanelProps) {
  useEffect(() => {
    if (isOpen) {
      // 스크롤 막기
      document.body.style.overflow = 'hidden';
    } else {
      // 원래대로
      document.body.style.overflow = '';
    }

    // 컴포넌트 unmount 시 복원 (혹시 몰라서)
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-end mobile:px-2 tablet:px-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-dimmed"
        onClick={onClose}
      />

      {/* 슬라이드 패널 */}
      <div
        className={`
          relative z-50 w-full bg-white rounded-t-3xl shadow-xl transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          h-auto overflow-y-auto overflow-x-hidden mobile:max-h-[320px] tablet:max-h-[400px]
          mobile:max-w-[380px] tablet:max-w-[744px] tablet:scale-[0.95] origin-bottom
          ${styles.customScrollbar}
          pr-1
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}