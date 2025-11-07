"use client";

import React from "react";
import StatisticHeader from "./StatisticHeader";
import StatisticCard from "./StatisticCard";
import totalIcon from "@/assets/icons/total_pemasukan.svg";
import StatisticGraph from "./StatisticGraph";
import StatisticHistory from "./StatisticHistory";
import StatisticPopularMenus from "./StatisticPopularMenus";
import StatisticGrowth from "./StatisticGrowth";
import { useQuery } from "@tanstack/react-query";
import { formatRupiah } from "@/lib/utils";
import { GetStatistic } from "@/services/statistic";
import StatisticSkeleton from "./Skeleton";
import Navside from "@/components/Navside";

export default function Statistic() {
  const { isLoading, data } = useQuery({
    queryKey: ["dataStatistics"],
    queryFn: () => GetStatistic(),
  });

  if (isLoading) return <StatisticSkeleton />;

  return (
    <div className="flex shadow-statistic h-screen pr-6">
      <Navside />
      <main className="w-full ml-[110px] h-full relative pl-3  flex flex-col ">
        <StatisticHeader />
        <div className="grid grid-cols-4 gap-3">
          <StatisticCard
            title="Total Pemasukan"
            desc="Jumlah pemasukan dalam sebulan"
            count={formatRupiah(data?.totalIncome)}
            imageSrc={totalIcon}
          />
          <StatisticCard
            title="Total Pesanan"
            desc="Jumlah pesanan dalam sebulan"
            count={data?.totalQuantity}
            imageSrc={totalIcon}
          />
          <StatisticCard
            title="Total Pelanggan"
            desc="Jumlah pelanggan dalam sebulan"
            count={data?.totalOrders}
            imageSrc={totalIcon}
          />
          <StatisticCard
            title="Total Kupon Digunakan"
            desc="Jumlah penggunaan kupon sebulan"
            count={data?.totalCouponUse}
            imageSrc={totalIcon}
          />
        </div>
        <div className="flex lg:mt-2 xl:mt-6 gap-3">
          <StatisticGraph />
          <StatisticHistory />
        </div>
        <div className="flex lg:mt-2 xl:mt-6 gap-3">
          <StatisticPopularMenus />
          <StatisticGrowth />
        </div>
      </main>
    </div>
  );
}
