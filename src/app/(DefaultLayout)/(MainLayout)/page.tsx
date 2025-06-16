"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import ArrowButton from "./components/ArrowButton";
import CategoryFilter from "./components/CategoryFilter";
import activityService from "@/apis/activity/activity.service";
import Card from "@/components/card/Card";
import SortDropdown from "@/components/dropdown/SortDropdown";
import type { SortOptionType } from "@/components/dropdown/SortDropdown";
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

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await activityService.getActivities({
          query: {
            method: "offset",
            category: selectedCategory || undefined,
            sort: sortOption.id,
            page: currentPage,
            size: 8,
          },
        });
        setActivities(response.data.activities);
        setTotalPages(Math.ceil(response.data.totalCount / 8));
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, [selectedCategory, currentPage, sortOption]);

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
              className="w-full flex-shrink-0 h-[500px] relative rounded-[24px] overflow-hidden"
              style={{ width: `${100 / (activities.length || 1)}%` }}
            >
              <Image
                src={activity.bannerImageUrl}
                alt={activity.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-[90px] left-1/2 transform -translate-x-1/2 text-white z-10 text-center w-full px-4">
                <h2 className="text-[32px] font-bold mb-1.5">
                  {activity.title}
                </h2>
                <p className="text-[18px]">1월의 인기 체험 BEST 🔥</p>
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
          <div>
            <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4">
              {popularActivities
                ?.slice(slideIndex * 4, slideIndex * 4 + 4)
                .map((activity) => (
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
          </div>
          <div className="absolute right-[-40px] top-1/2 -translate-y-1/2">
            <ArrowButton
              onClick={() =>
                setSlideIndex(
                  (prev) =>
                    (prev + 1) % Math.ceil(popularActivities.length / 4),
                )
              }
            />
          </div>
        </div>
      </section>

      {/* 모든 체험 */}
      <section className="flex flex-col gap-[2rem] ">
        <h2 className="text-24-b">🛼 모든 체험</h2>
        {/* 필터, 태그 */}
        <div className="flex justify-between">
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
          <SortDropdown
            selectedItem={sortOption}
            onSelect={(option) => setSortOption(option)}
          />
        </div>
        <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4">
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
