import React from "react";
import Cart from "../../assets/images/Cart.png";
import { formatRupiah } from "../../lib/utils";
import { dummyMenuData } from "./dummyMenuData";

function MenuItem({ nama, jenis, harga, id, onClick, gambar }) {
  return (
    <div
      className="border-gray-300 border-[1px] rounded-md cursor-pointer px-4 pt-4 pb-2 relative hover:bg-neutral-500 transition-all duration-300 "
      onClick={() => onClick(id, harga, nama)}
    >
      <div className="flex items-center justify-center mb-2 bg">
        <div className="rounded-full p-2 w-24 h-24 flex items-center bg-gray-200 overflow-hidden">
          <div className="w-20 ">
            <img
              src={gambar}
              alt="Gambar produk"
              className="w-20 h-20 object-cover"
            />
          </div>
        </div>
      </div>
      <p className="font-normal text-sm">{nama}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-[10px] text-gray-300 font-normal capitalize">
          {jenis}
        </p>
        <p className="text-xs text-[#003370] font-medium">
          {formatRupiah(harga)},-
        </p>
      </div>
      <div className="bg-[#003370] pr-2 pl-1 w-fit rounded-md absolute top-[6px] right-[6px] ">
        <img src={Cart} alt="Cart" className="object-cover" />
      </div>
    </div>
  );
}

export default function MenuCatalog({
  onClick,
  id,
  nama,
  jenis,
  harga,
  gambar,
}) {
  if (id && nama && harga) {
    return (
      <MenuItem
        id={id}
        nama={nama}
        jenis={jenis}
        harga={harga}
        gambar={gambar}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {dummyMenuData.map((menu) => (
        <MenuItem
          key={menu.id}
          id={menu.id}
          nama={menu.nama}
          jenis={menu.jenis}
          harga={menu.harga}
          gambar={menu.gambar}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
