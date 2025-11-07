"use client";

import React, { useEffect, useState } from "react";
import StatsCompoHeader from "@/components/StatsCompoHeader";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { GetStatisticByDay } from "@/services/statistic";
import MiniLoader from "@/components/ui/MiniLoader";

// const chartData = [
//   { date: "12 Agustus", income: 2900000 },
//   { date: "13 Agustus", income: 4000000 },
//   { date: "14 Agustus", income: 1350000 },
//   { date: "15 Agustus", income: 2850000 },
//   { date: "16 Agustus", income: 4000000 },
//   { date: "17 Agustus", income: 3725000 },
//   { date: "18 Agustus", income: 3750000 },
//   { date: "19 Agustus", income: 2500000 },
//   { date: "20 Agustus", income: 2650000 },
//   { date: "21 Agustus", income: 2230000 },
// ];

const chartConfig = {
  desktop: {
    label: "Chart",
    color: "hsl(var(--chart-1))",
  },
};

const options = [
  { value: 7, label: "1 Minggu Terakhir" },
  { value: 31, label: "1 Bulan Terakhir" },
  { value: 93, label: "3 Bulan Terakhir" },
  { value: 365, label: "1 Tahun Terakhir" },
];

export default function StatisticGraph() {
  const [days, setDays] = useState(7);

  const { data, refetch } = useQuery({
    queryKey: ["dataStatisticsPendapatan"],
    queryFn: () => GetStatisticByDay(days),
  });

  useEffect(() => {
    refetch();
  }, [days]);

  return (
    <div className="w-3/4 max-h-72 flex flex-col border-2 border-gray-300 rounded-lg px-6 py-5">
      <StatsCompoHeader
        title="Statistik Pendapatan"
        date="1 Minggu Terakhir"
        options={options}
        setHour={setDays}
      />
      <Card>
        <ChartContainer className="pl-2" config={chartConfig}>
          {data ? (
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 2,
                right: 13,
                top: 10,
              }}
            >
              <CartesianGrid
                vertical={false}
                // horizontal={true}
                // horizontalPoints={true}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              {/* <YAxis dataKey="" tickMargin={2} tickLine={true} /> */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="income"
                type="natural"
                fill="	hsl(213, 100%, 22%)"
                fillOpacity={0.9}
                stroke="hsl(213, 100%, 22%)"
              />
            </AreaChart>
          ) : (
            <MiniLoader />
          )}
        </ChartContainer>
      </Card>
    </div>
  );
}
