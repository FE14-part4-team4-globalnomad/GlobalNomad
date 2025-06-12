'use client';

interface CombinedProps {
  images: string[];
  content: string;
}

export default function Description({ images, content }: CombinedProps) {
  return (
    <div className="mb-4 pb-4 w-67 border-b border-gray-200">
      {/* ImageGallery 부분 */}
      <div className="flex gap-[1.2rem] h-40 overflow-hidden">
        <div className="w-33 h-40 overflow-hidden rounded-tl-3xl rounded-bl-3xl">
          <img
            src={images[0]}
            alt="소개 이미지1"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-[1.2rem] w-[329px]">
          <div className="w-33 h-[194px] overflow-hidden rounded-tr-3xl">
            <img
              src={images[1]}
              alt="소개 이미지2"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-33 h-[194px] overflow-hidden rounded-br-3xl">
            <img
              src={images[2]}
              alt="소개 이미지3"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Description 부분 */}
      <section className="text-gray-950 mt-4">
        <h2 className="text-18-b mb-1">체험 설명</h2>
        <p className="text-16-body-m">{content}</p>
      </section>
    </div>
  );
}