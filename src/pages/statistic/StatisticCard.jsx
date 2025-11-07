import React from "react";

export default function StatisticCard({ imageSrc, title, desc, count }) {
  return (
    <div className="stats-gradient flex flex-col px-4 pt-3 pb-8 border-2 border-gray-300 rounded-lg justify-between gap-4 bg-white hover:border-2 hover:border-[#003370] hover:-translate-y-1 transisi">
      <div className="flex gap-4 items-center ">
        <img src={imageSrc} />
        <div>
          <p className="font-semibold text-nowrap mb-1">{title}</p>
          <p className="text-[10px] text-nowrap text-black">{desc}</p>
        </div>
      </div>
      <p className="text-center text-xl font-bold ">{count || 0}</p>
    </div>
  );
}
