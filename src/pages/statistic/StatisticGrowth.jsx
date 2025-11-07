"use client";

import React, { useEffect, useState } from "react";
import StatsCompoHeader from "@/components/StatsCompoHeader";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { GetPelangganByDay } from "@/services/statistic";
import MiniLoader from "@/components/ui/MiniLoader";

const options = [
  { value: 7, label: "7 Hari Terakhir" },
  { value: 31, label: "1 Bulan Terakhir" },
  { value: 93, label: "3 Bulan Terakhir" },
  { value: 365, label: "1 Tahun Terakhir" },
];

const chartConfig = {
  customer: {
    label: "customer",
    color: "hsl(var(--chart-1))",
  },
};

export default function StatisticGrowth() {
  const [days, setDays] = useState(7);

  const { data, refetch } = useQuery({
    queryKey: ["dataStatisticsPelanggan"],
    queryFn: () => GetPelangganByDay(days),
  });

  useEffect(() => {
    refetch();
    console.log(data);
  }, [days]);

  return (
    <div className="w-3/4 flex flex-col border-2 border-gray-300 rounded-lg px-6 py-5 h-80">
      <StatsCompoHeader
        title="Statistik Perkembangan Pelanggan"
        date="7 Hari Terakhir"
        options={options}
        setHour={setDays}
      />
      <Card className="h-60">
        <CardContent className=" px-0">
          <ChartContainer config={chartConfig}>
            {data ? (
              <BarChart
                accessibilityLayer
                data={data}
                margin={{
                  top: 10,
                }}
              >
                <CartesianGrid vertical={true} horizontal={true} />
                <XAxis
                  dataKey="date"
                  tickLine={true}
                  tickMargin={6}
                  axisLine={true}
                  tickFormatter={(value) => value.slice(0, 2)}
                />
                {/* <YAxis dataKey="orders" tickMargin={10} tickLine={true} /> */}
                <ChartTooltip cursor={true} />
                <Bar
                  dataKey="orders"
                  fill="hsl(213, 100%, 22%)"
                  radius={1}
                  stroke="hsl(213, 100%, 22%)"
                  fillOpacity={0.9}
                ></Bar>
              </BarChart>
            ) : (
              <MiniLoader />
            )}
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
