import React from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

export default function MenuNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const tipe_produk = searchParams.get("tipe_produk");

  return (
    <nav className="text-[#003370] mt-4">
      <ul className="flex gap-10">
        <Link
          to="/dashboard"
          className={cn(`text-base font-medium pb-1`, {
            "border-b-[3px] border-[#003370]":
              !tipe_produk && pathname === "/dashboard",
          })}
        >
          Semua
        </Link>
        <Link
          to="/dashboard?tipe_produk=makanan"
          className={cn(`text-base font-medium pb-1`, {
            "border-b-[3px] border-[#003370]": tipe_produk === "makanan",
          })}
        >
          Makanan
        </Link>
        <Link
          to="/dashboard?tipe_produk=minuman"
          className={cn(`text-base font-medium pb-1`, {
            "border-b-[3px] border-[#003370]": tipe_produk === "minuman",
          })}
        >
          Minuman
        </Link>
        <Link
          to="/dashboard?tipe_produk=snack"
          className={cn(`text-base font-medium pb-1`, {
            "border-b-[3px] border-[#003370]": tipe_produk === "snack",
          })}
        >
          Snack
        </Link>
      </ul>
    </nav>
  );
}
