'use client'

import Image from 'next/image'

interface ImageGalleryProps {
  images: string[] // 이미지 URL 3개
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="flex gap-[1.2rem] w-[690px] h-[400px] overflow-hidden">
      {/* 왼쪽 큰 이미지 (329 x 400) */}
      <div className="relative w-33 h-40">
        <Image
          src={images[0]}
          alt="소개 이미지1"
          fill
          className="object-cover rounded-tl-3xl rounded-bl-3xl"
        />
      </div>

      {/* 오른쪽 두 개의 작은 이미지 (각 329 x 194 + gap) */}
      <div className="flex flex-col gap-[1.2rem] w-[329px]">
        <div className="relative w-33 h-[194px]">
          <Image
            src={images[1]}
            alt="소개 이미지2"
            fill
            className="object-cover rounded-tr-3xl"
          />
        </div>
        <div className="relative w-33 h-[194px]">
          <Image
            src={images[2]}
            alt="소개 이미지3"
            fill
            className="object-cover rounded-br-3xl"
          />
        </div>
      </div>
    </div>
  )
}