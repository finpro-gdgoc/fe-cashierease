import React from "react";
import StatsCompoHeader from "@/components/StatsCompoHeader";
import PopularMenuList from "./PopularMenuList";

const popularMenus = [
  {
    id: 1,
    menu: "Mie Ayam",
    jumlah: 45,
  },
  {
    id: 2,
    menu: "Bakso",
    jumlah: 30,
  },
  {
    id: 3,
    menu: "Seblak",
    jumlah: 15,
  },
];

const options = [
  { value: "Agt 2025", label: "Agt 2025" },
  { value: "Spt 2025", label: "Spt 2025" },
  { value: "Okt 2025", label: "Okt 2025" },
  { value: "Nov 2025", label: "Nov 2025" },
  { value: "Des 2025", label: "Des 2025" },
  { value: "Jan 2025", label: "Jan 2025" },
  { value: "Feb 2025", label: "Feb 2025" },
  { value: "Mar 2025", label: "Mar 2025" },
  { value: "Apr 2025", label: "Apr 2025" },
  { value: "Mei 2025", label: "Mei 2025" },
  { value: "Jun 2025", label: "Jun 2025" },
  { value: "Jul 2025", label: "Jul 2025" },
];

export default function StatisticPopularMenus() {
  return (
    <div className="flex flex-col border-2 border-gray-300 rounded-lg px-6 py-5 w-[40%] max-h-80">
      <StatsCompoHeader
        title="Menu Populer"
        date="Agt 2025"
        options={options}
      />
      <div className="flex gap-6 mt-2">
        <p className="text-gray-300 font-medium">Peringkat</p>
        <p className="font-medium text-gray-300">Menu</p>
      </div>
      <div className="overflow-y-auto pr-3">
        {popularMenus.map((menus, index) => (
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
