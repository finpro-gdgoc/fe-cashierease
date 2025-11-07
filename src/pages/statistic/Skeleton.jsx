import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatisticSkeleton() {
  return (
    <>
      <div className="w-full ml-[110px] h-full relative pl-3 flex flex-col pt-10">
        <Skeleton className="h-[25px] w-[140px] rounded-xl" />
        <Skeleton className="h-[15px] w-[200px] rounded-xl mt-2" />
        <div className="grid grid-cols-4 gap-3 w-full pt-8">
          <Skeleton className="h-[137px] w-[275px] rounded-xl" />
          <Skeleton className="h-[137px] w-[275px] rounded-xl" />
          <Skeleton className="h-[137px] w-[275px] rounded-xl" />
          <Skeleton className="h-[137px] w-[275px] rounded-xl" />
        </div>
        <div className="flex lg:mt-2 xl:mt-6 gap-3">
          <Skeleton className="h-[290px] w-[68%] rounded-xl" />
          <Skeleton className="h-[290px] w-[32%] rounded-xl" />
        </div>
        <div className="flex lg:mt-2 xl:mt-6 gap-3">
          <Skeleton className="h-[310px] w-[35%] rounded-xl" />
          <Skeleton className="h-[310px] w-[65%] rounded-xl" />
        </div>
      </div>
    </>
  );
}
