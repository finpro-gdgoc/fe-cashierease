import React from "react";
import { getCurrentDate } from "@/lib/utils";

export default function CashierDate({ data }) {
  return (
    <>
      <p className="font-medium text-base">{data?.nama}</p>
      <p className="text-gray-600 text-sm">{getCurrentDate()}</p>
    </>
  );
}
