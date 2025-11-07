import React from "react";
import Mieayam from "@/assets/images/mieayam.png";

export default function PopularMenuList({ num, menu, jumlahPesanan }) {
  return (
    <div className="flex mt-4 gap-6 ">
      <div className="w-[96px] flex items-center justify-center ">
        <p className="text-lg font-semibold mx-auto">{num}</p>
      </div>
      <div className="border-b-2 border-gray-200 flex gap-4 w-full">
        <div className="flex items-center justify-center mb-2">
          <div className="rounded-full p-2 w-14 h-14 flex items-center bg-gray-100">
            <div className="w-14">
              <img src={Mieayam} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{menu}</p>
          <p className="text-sm font-medium text-gray-300">
            Jumlah Pesanan: {jumlahPesanan}
          </p>
        </div>
      </div>
    </div>
  );
}
