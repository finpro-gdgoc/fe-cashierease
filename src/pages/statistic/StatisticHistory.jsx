import React, { useEffect, useState } from "react";
import StatisticHistoryList from "./StatisticHistoryList";
import StatsCompoHeader from "@/components/StatsCompoHeader";
import { useQuery } from "@tanstack/react-query";
import { GetTransactionByHour } from "@/services/statistic";
import MiniLoader from "@/components/ui/MiniLoader";

const options = [
  { value: 1, label: "1 Jam Terakhir" },
  { value: 6, label: "6 Jam Terakhir" },
  { value: 12, label: "12 Jam Terakhir" },
  { value: 24, label: "24 Jam Terakhir" },
];

export default function StatisticHistory() {
  const [hour, setHour] = useState(1);

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ["dataTransaction"],
    queryFn: () => GetTransactionByHour(hour),
  });

  useEffect(() => {
    refetch();
  }, [hour]);

  return (
    <>
      <div className="flex flex-col  border-2 border-gray-300  rounded-lg px-6 py-5 w-[35%] max-h-72">
        <StatsCompoHeader
          title="Histori Transaksi"
          date="1 Jam Terakhir"
          options={options}
          setHour={setHour}
        />
        <div className="overflow-y-auto pr-2 h-full">
          {isRefetching || isLoading ? (
            <MiniLoader />
          ) : (
            data
              ?.toReversed()
              .map((history, index) => (
                <StatisticHistoryList key={index} data={history} />
              ))
          )}
        </div>
      </div>
    </>
  );
}
