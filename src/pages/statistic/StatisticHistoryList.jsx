import React from "react";
import TransactionSuccess from "@/assets/icons/transaction_success.svg";
import { formatRupiah, formatToWIB } from "@/lib/utils";

export default function StatisticHistoryList({ data }) {
  return (
    <div className="flex justify-between items-center mt-4 ">
      <div className="flex items-center gap-4 ">
        <img src={TransactionSuccess} />
        <div className="flex flex-col justify-between gap-1">
          <p className="font-semibold text-[12px]">
            Transaksi Pesanan #{data?._id.slice(-4)}
          </p>
          <p className="text-xs text-gray-400">
            {formatToWIB(data?.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="font-semibold text-xs">
          {formatRupiah(data?.total_price_with_tax)}
        </p>
        <div className="px-4 py-[1px] text-white bg-[#003370] w-fit mx-auto rounded-full text-sm">
          {data.payment_method}
        </div>
      </div>
    </div>
  );
}
