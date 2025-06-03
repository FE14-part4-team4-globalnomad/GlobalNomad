'use client';

import Earth from '@/assets/images/notFound/404_earth.svg';
import Face from '@/assets/images/notFound/404_earth_face.svg';

export default function NotFound() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      {/* 지구와 표정을 함께 감싸는 div */}
      <div className="relative inline-block">
        <Earth className="block" />
        <Face className="absolute inset-0 w-full h-full" />
      </div>

      {/* 메시지 */}
      <div className="mt-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - 페이지를 찾을 수 없어요</h1>
        <p className="text-gray-500">지구가 울고 있어요... 돌아가 주세요.</p>
      </div>
    </div>
  );
}