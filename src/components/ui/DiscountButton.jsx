import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getCurrentDate } from "@/lib/utils";
import { HiOutlineTicket } from "react-icons/hi2";

export default function MiniCard({
  setCoupon,
  setCouponName,
  data,
  setCouponID,
  onClick,
  isCouponActive,
}) {
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setCoupon(Number(discount) || 0);
  }, [discount]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`w-[72px] text-4xl flex flex-col items-center p-2 rounded-md border-2 ${
            isCouponActive
              ? "text-[#003370] border-[#003370]"
              : "text-neutral-400"
          }`}
          onClick={onClick}
        >
          <HiOutlineTicket />
          <p
            className={`text-xs  text-center mt-1 capitalize ${
              isCouponActive ? "text-[#003370] " : "text-gray-300"
            }`}
          >
            Diskon
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-[#003370] border-4 w-full max-w-lg">
        <h1 className="font-medium uppercase text-center">
          kode promo{" "}
          <div className="text-gray-400 text-sm font-normal">
            {getCurrentDate()}
          </div>
        </h1>
        <div className="flex flex-col gap-2 mt-5 ">
          {data?.map((code, index) => (
            <button
              key={index}
              className="w-full py-3 border border-2 text-center text-sm font-medium rounded-lg hover:bg-[#003370] hover:text-white"
              onClick={() => {
                setDiscount(Number(code.besarDiscount) || 0);
                setCouponName(code.kodeCoupon);
                setCouponID(Number(code._id));
              }}
            >
              {code.kodeCoupon}
            </button>
          ))}
          <button
            className="w-full mt-5 py-3  text-center text-sm font-medium rounded-lg border-2 border-[#003370] hover:bg-[#003370] hover:text-white"
            onClick={() => {
              setDiscount(0);
              setCouponName(null);
              setCouponID(null);
            }}
          >
            Hapus Promo
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
