"use client";

import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageGalleryProps {
  bannerImageUrl: string;
  subImageUrls: string[];
}

export default function ImageGallery({ bannerImageUrl, subImageUrls }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [bannerImageUrl, ...subImageUrls];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="relative w-full max-w-screen-lg mx-auto mobile:w-[327px]">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={12}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          className="!pb-4"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full overflow-hidden cursor-pointer h-[400px] mobile:h-[245px]"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={src}
                  alt={`소개 이미지 ${index + 1}`}
                  className="w-full h-full object-cover rounded-3xl mobile:h-[245px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-[9999]"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`확대 이미지 ${currentIndex + 1}`}
              className="w-[800px] h-[534px] shadow-lg tablet:w-[684px] tablet:h-[400px] mobile:w-[327px] mobile:h-[245px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
