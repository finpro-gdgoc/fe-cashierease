import React from "react";
import StatsCompoHeader from "@/components/StatsCompoHeader";
import PopularMenuList from "./PopularMenuList";
import { GetPopularMenu } from "@/services/statistic";
import { useQuery } from "@tanstack/react-query";

const options = [{ value: "Nov 2025", label: "Nov 2025" }];

export default function StatisticPopularMenus() {
  const { data: popularMenus } = useQuery({
    queryKey: ["statsPopularMenu", 0],
    queryFn: () => GetPopularMenu(0),
  });

  const list = popularMenus ?? [];
  return (
    <div className="flex flex-col border-2 border-gray-300 rounded-lg px-6 py-5 w-[40%] max-h-80">
      <StatsCompoHeader
        title="Menu Populer"
        date="Nov 2025"
        options={options}
      />
      <div className="flex gap-6 mt-2">
        <p className="text-gray-300 font-medium">Peringkat</p>
        <p className="font-medium text-gray-300">Menu</p>
      </div>
      <div className="overflow-y-auto pr-3">
        {list.map((menus, index) => (
          <PopularMenuList
            key={index}
            num={menus.id}
            menu={menus.menu}
            jumlahPesanan={menus.jumlah}
          />
        ))}
      </div>
    </div>
  );
}
