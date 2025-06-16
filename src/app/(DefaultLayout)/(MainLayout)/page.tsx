"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import ArrowButton from "./components/ArrowButton";
import CategoryFilter from "./components/CategoryFilter";
import activityService from "@/apis/activity/activity.service";
import SortDropdown from "@/app/(DefaultLayout)/(MainLayout)/components/SortDropdown";
import type { SortOptionType } from "@/app/(DefaultLayout)/(MainLayout)/components/SortDropdown";
import Card from "@/components/card/Card";
import Pagination from "@/components/pagination/Pagination";
import { Search } from "@/components/search/Search";
import type { ActivityCategoryType } from "@/types/activity";
import { ActivityType } from "@/types/activity";

function HomePage() {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [popularActivities, setPopularActivities] = useState<ActivityType[]>(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<
    ActivityCategoryType | ""
  >("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOption, setSortOption] = useState<SortOptionType>({
    id: "latest",
    title: "최신순",
  });

  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 1280) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(4);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 769) {
        setItemsPerPage(6);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(8);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await activityService.getActivities({
          query: {
            method: "offset",
            category: selectedCategory || undefined,
            sort: sortOption.id,
            page: currentPage,
            size: itemsPerPage,
          },
        });
        setActivities(response.data.activities);
        setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, [selectedCategory, currentPage, sortOption, itemsPerPage]);

  useEffect(() => {
    const fetchPopularActivities = async () => {
      try {
        const response = await activityService.getActivities({
          query: {
            method: "offset",
            sort: "most_reviewed",
          },
        });
        setPopularActivities(response.data.activities);
      } catch (error) {
        console.error("Error fetching popular activities:", error);
      }
    };
    fetchPopularActivities();
  }, []);

  useEffect(() => {
    if (activities.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= activities.length) {
          return 1;
        }
        return prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [activities]);

  useEffect(() => {
    if (currentIndex === activities.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
        const slider = document.getElementById("slider-track");
        if (slider) {
          slider.style.transition = "none";
          slider.style.transform = `translateX(0%)`;
          // force reflow then restore transition
          void slider.offsetWidth;
          slider.style.transition = "";
        }
      }, 700); // matches duration-700

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, activities.length]);

  const extendedActivities =
    activities.length > 0 ? [...activities, activities[0]] : [];

  const paginatedActivities = popularActivities?.slice(
    slideIndex * itemsPerSlide,
    slideIndex * itemsPerSlide + itemsPerSlide,
  );

  return (
    <div className="flex flex-col gap-15   ">
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
              className="w-full flex-shrink-0 mobile:h-[18.1rem] tablet:h-[37.5rem] desktop:h-[50rem] relative rounded-[24px] overflow-hidden"
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
          <div className="grid tablet:grid-cols-2 desktop:grid-cols-4 gap-4 hidden mobile:hidden tablet:grid">
            {paginatedActivities?.map((activity) => (
              <Card
                key={activity.id}
                title={activity.title}
                price={activity.price}
                bannerImageUrl={activity.bannerImageUrl}
                rating={activity.rating}
                reviewCount={activity.reviewCount}
              />
            ))}
          </div>

          {/* 모바일용 가로 슬라이드 */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 tablet:hidden desktop:hidden">
            {popularActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex-shrink-0 w-[85%] snap-start"
              >
                <Card
                  title={activity.title}
                  price={activity.price}
                  bannerImageUrl={activity.bannerImageUrl}
                  rating={activity.rating}
                  reviewCount={activity.reviewCount}
                />
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
            onSelect={(id: string) => {
              const labelMap: Record<string, ActivityCategoryType> = {
                culture: "문화 · 예술",
                food: "식음료",
                tour: "투어",
                sightseeing: "관광",
                wellbeing: "웰빙",
              };
              setSelectedCategory(labelMap[id]);
            }}
          />
        </div>
        <div className="grid grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-4 gap-4">
          {activities?.map((activity) => (
            <Card
              key={activity.id}
              title={activity.title}
              price={activity.price}
              bannerImageUrl={activity.bannerImageUrl}
              rating={activity.rating}
              reviewCount={activity.reviewCount}
            />
          ))}
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
