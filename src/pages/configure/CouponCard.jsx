import React from "react";
import { HiTicket } from "react-icons/hi2";
import { formatCouponWIB } from "@/lib/utils";

export default function CouponCard({ kodeCoupon, deskripsi, CouponDate }) {
  const sampai = formatCouponWIB(CouponDate);
  return (
    <>
      <div className="flex flex-col py-5 px-6 bg-[#003370] rounded-lg">
        <div className="flex items-center gap-3 justify-start mb-4">
          <HiTicket className="text-4xl text-white" />
          <p className="uppercase text-white text-2xl font-medium">
            {kodeCoupon}
          </p>
        </div>
        <p className="text-white text-xs text-start mt-2">{deskripsi}</p>
        <hr className="border-[1px] my-3" />
        <p className="text-white text-sm">Berlaku hingga {sampai}</p>
      </div>
    </>
  );
}
