"use client";

import React from "react";

export default function ActivitySkeleton() {
  return (
    <div className="px-4 py-6 desktop:px-8 desktop:pt-9 desktop:pb-20 tablet:pt-6 tablet:pb-12 mobile:pt-4 mobile:pb-10">
      <div className="flex flex-col desktop:flex-row desktop:justify-center desktop:gap-4">
        <div className="flex flex-col gap-6 w-full desktop:w-[720px]">
          <div className="w-full h-[240px] tablet:h-[320px] desktop:h-[400px] bg-gray-100 animate-pulse rounded-xl" />

          <div className="space-y-3">
            <div className="w-1/2 h-6 bg-gray-100 animate-pulse rounded" />
            <div className="w-full h-4 bg-gray-100 animate-pulse rounded" />
            <div className="w-[80%] h-4 bg-gray-100 animate-pulse rounded" />
          </div>

          <div className="w-full h-[180px] tablet:h-[220px] desktop:h-[300px] bg-gray-100 animate-pulse rounded-xl" />

          <div className="space-y-4">
            <div className="w-1/3 h-6 bg-gray-100 animate-pulse rounded" />
            {[...Array(2)].map((_, idx) => (
              <div
                key={idx}
                className="w-full h-16 tablet:h-20 bg-gray-100 animate-pulse rounded-xl"
              />
            ))}
          </div>
        </div>

        <div className="hidden desktop:flex flex-col w-[360px] gap-4">
          <div className="w-full h-6 bg-gray-100 animate-pulse rounded" />
          <div className="w-1/2 h-6 bg-gray-100 animate-pulse rounded" />
          <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-xl" />
        </div>
      </div>
    </div>
  );
}
