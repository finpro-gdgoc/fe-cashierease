import CashierDate from "@/components/ui/CashierDate";
import React from "react";

export default function StatisticHeader() {
  return (
    <div className=" bg-white w-fit pt-10 mb-6">
      <div className="flex justify-between">
        <p className="text-[#003370] text-2xl font-medium">Solaria</p>
      </div>
      <CashierDate />
    </div>
  );
}
