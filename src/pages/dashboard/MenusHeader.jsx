import React from "react";
import Search from "@/assets/icons/Search.svg";
import CashierDate from "@/components/ui/CashierDate";
import MenuNav from "./MenuNav";
import { GetUserById } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { getTokoName } from "@/services/getToko";

export default function MenusHeader({ handleSearch }) {
  const { data: userData } = useQuery({
    queryKey: ["dataUser"],
    queryFn: () => GetUserById(),
  });

  const { data: tokoData } = useQuery({
    queryKey: ["dataToko"],
    queryFn: () => getTokoName(),
  });

  return (
    <div className="fixed bg-white max-w-[40rem] pt-10 z-10 mb-48">
      <div className="flex justify-between items-center w-full">
        {tokoData?.map((toko) => (
          <p className="text-[#003370] text-2xl font-medium">{toko.namaToko}</p>
        ))}
        <div className="flex w-[265px] border border-gray-200 rounded-xl p-3 items-center gap-2 ml-48">
          <img src={Search} alt="Search" />
          <input
            type="text"
            className="w-full outline-none text-sm "
            placeholder="Cari makanan, atau minuman"
            onChange={(menu) => handleSearch(menu)}
          />
        </div>
      </div>
      <CashierDate data={userData} />
      <MenuNav />
    </div>
  );
}
