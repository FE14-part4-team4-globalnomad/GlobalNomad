'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import warningIcon from '@/assets/images/warning.svg';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex items-center">
        <span className="text-[138px] mobile:text-[60px] font-bold text-gray-900">4</span>
        <Image
          src={warningIcon}
          alt="Warning"
          className="mx-4 mobile:mx-[1px] scale-200 mobile:scale-100 origin-center flex-shrink-0"
        />
        <span className="text-[138px] mobile:text-[60px] font-bold text-gray-900">4</span>
      </div>

      <div className="text-center">
        <h1 className="text-32-b mobile:text-16-b text-gray-800">현재 찾을 수 없는 페이지를 요청했어요!</h1>
        <h2 className="text-20-m mobile:text-11-m text-gray-600 my-2 mobile:my-1">
          요청하신 페이지가 사라졌거나 존재하지 않아요. 돌아가는건 어떨까요?
        </h2>
        <div className="font-semibold flex gap-2 justify-center mobile:flex-col">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-brand-500 text-white rounded-3xl shadow cursor-pointer mobile:w-full"
          >
            메인 페이지
          </button>

          <button
            onClick={() => router.back()}
            className="px-6 mobile:px-5 py-2 bg-white text-gray-600 rounded-3xl shadow cursor-pointer mobile:w-full"
          >
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
}