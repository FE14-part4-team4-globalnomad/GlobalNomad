'use client';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="flex gap-[1.2rem] overflow-hidden">
      <div className="overflow-hidden rounded-tl-3xl rounded-bl-3xl tablet:w-33 tablet:h-40 mobile:w-16 mobile:h-25">
        <img
          src={images[0]}
          alt="소개 이미지1"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-[1.2rem]">
        <div className="overflow-hidden rounded-tr-3xl tablet:w-33 tablet:h-[194px] mobile:w-16 mobile:h-12">
          <img
            src={images[1]}
            alt="소개 이미지2"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="overflow-hidden rounded-br-3xl tablet:w-33 tablet:h-[194px] mobile:w-16 mobile:h-12">
          <img
            src={images[2]}
            alt="소개 이미지3"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}