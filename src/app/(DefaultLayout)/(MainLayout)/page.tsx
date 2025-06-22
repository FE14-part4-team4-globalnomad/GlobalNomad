"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import ArrowButton from "./components/ArrowButton";
import CategoryFilter from "./components/CategoryFilter";
import SortDropdown from "@/app/(DefaultLayout)/(MainLayout)/components/SortDropdown";
import Card from "@/components/card/Card";
import Pagination from "@/components/pagination/Pagination";
import { Search } from "@/components/search/Search";
import { useActivities } from "@/hooks/useActivities";
import { useAutoSlider } from "@/hooks/useAutoSlider";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import { usePagination } from "@/hooks/usePagination";
import { usePopularActivities } from "@/hooks/usePopularActivities";
import { useResponsiveSlider } from "@/hooks/useResponsiveSlider";
import { useSort } from "@/hooks/useSort";
import { ActivityType } from "@/types/activity";

function HomePage() {
  // 🔥 인기 체험 영역 관련 상태
  const { popularActivities } = usePopularActivities();
  const [slideIndex, setSlideIndex] = useState(0);

  // 🛼 모든 체험 영역 관련 상태
  const { selectedCategory, handleCategorySelect } = useCategoryFilter();
  const { currentPage, setCurrentPage } = usePagination();
  const { sortOption, setSortOption } = useSort();
  const { itemsPerSlide, itemsPerPage } = useResponsiveSlider();

  const { activities, totalPages } = useActivities(
    selectedCategory,
    sortOption.id,
    currentPage,
    itemsPerPage,
  );

  // 🖼️ 배너 영역 관련 상태
  const { currentIndex, extendedActivities } = useAutoSlider(activities);

  const paginatedActivities = popularActivities?.slice(
    slideIndex * itemsPerSlide,
    slideIndex * itemsPerSlide + itemsPerSlide,
  );

  const renderCard = (activity: ActivityType) => (
    <Link href={`/activities/${activity.id}`}>
      <Card
        key={activity.id}
        title={activity.title}
        price={activity.price}
        bannerImageUrl={activity.bannerImageUrl}
        rating={activity.rating}
        reviewCount={activity.reviewCount}
      />
    </Link>
  );

  return (
    <div className="flex flex-col space-y-16">
      {/* 배너 영역 */}
      <section className="w-full overflow-hidden relative">
        <div
          id="slider-track"
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${activities.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / (activities.length || 1))}%)`,
          }}
        >
          {extendedActivities.map((activity, index) => (
            <div
              key={`${activity.id}-${index}`}
              className="w-full flex-shrink-0 relative rounded-[24px] overflow-hidden mobile:h-[18.1rem] tablet:h-[37.5rem] desktop:h-[50rem]"
              style={{ width: `${100 / (activities.length || 1)}%` }}
            >
              <Image
                src={activity.bannerImageUrl}
                alt={activity.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-[90px] mobile:bottom-[20px] left-1/2 transform -translate-x-1/2 text-white z-10 text-center w-full px-4">
                <h2 className="text-[32px] mobile:text-[18px] font-bold mb-1.5">
                  {activity.title}
                </h2>
                <p className="text-[18px] mobile:text-[14px]">
                  1월의 인기 체험 BEST 🔥
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6.5">
          <Search onSearch={(keyword) => console.log(keyword)} />
        </div>
      </section>

      {/* 인기 체험 */}
      <section className="flex flex-col gap-[2rem]">
        <h2 className="text-24-b">🔥 인기 체험</h2>
        <div className="relative">
          {/* 데스크탑/태블릿용 그리드 */}
          <div className="hidden tablet:grid tablet:grid-cols-2 desktop:grid-cols-4 gap-4">
            {paginatedActivities?.map((activity) => renderCard(activity))}
          </div>

          {/* 모바일용 가로 슬라이드 */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 tablet:hidden desktop:hidden">
            {popularActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex-shrink-0 w-[85%] snap-start"
              >
                {renderCard(activity)}
              </div>
            ))}
          </div>
          <div className="absolute desktop:right-[-40px] tablet:right-[-25px] top-1/2 -translate-y-1/2 hidden mobile:hidden tablet:block">
            <ArrowButton
              onClick={() =>
                setSlideIndex(
                  (prev) =>
                    (prev + 1) %
                    Math.ceil(popularActivities.length / itemsPerSlide),
                )
              }
            />
          </div>
        </div>
      </section>

      {/* 모든 체험 */}
      <section className="flex flex-col gap-[2rem] ">
        <div className="flex justify-between items-center flex-wrap gap-2 mobile:flex-nowrap mobile:gap-0">
          <h2 className="text-24-b">🛼 모든 체험</h2>
          <SortDropdown
            selectedItem={sortOption}
            onSelect={(option) => setSortOption(option)}
          />
        </div>
        {/* 필터, 태그 */}
        <div className="flex overflow-x-auto gap-2 tablet:justify-between scrollbar-hide">
          <CategoryFilter
            selectedId={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </div>
        <div className="grid grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-4 gap-4">
          {activities?.map((activity) => renderCard(activity))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
}

export default HomePage;
