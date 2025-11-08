"use client";

import React from "react";
import DummyResto from "@/assets/images/dummyResto.png";
import ConfigHeader from "./ConfigHeader";
import Navside from "@/components/Navside";

export default function ShopConfigure() {
  return (
    <>
      <div className="flex shadow-2xl pr-6 pb-6 h-screen">
        <Navside />
        <main className="w-full ml-[110px] h-full relative pl-3 flex flex-col overflow-hidden pb-16">
          {/* Header */}
          <ConfigHeader
            title="Manajemen Toko"
            paragraph="Kelola toko Anda dan atur detail serta informasinya di sini."
          />
          <hr className="border-[1px]" />
          {/* Logos */}
          <div className="w-full flex flex-col lg:my-4 xl:my-8 px-4">
            <p className="text-xl font-semibold">Logo Toko</p>
            <div className="flex flex-row mt-8 gap-8 font-medium items-center">
              <div className="lg:w-48 xl:w-64 rounded-full bg-teal-300 overflow-hidden">
                <img src={DummyResto} className="object-fill" />
              </div>
              <div class="flex gap-4">
                <button className="xl:px-3 xl:py-2 lg:px-2 lg:py-1 text-white lg:text-sm xl:text-base bg-[#003370] rounded-lg">
                  Ubah Gambar
                </button>
                <button className="xl:px-3 xl:py-2 lg:px-2 lg:py-1 lg:text-sm xl:text-base text-[#003370] border-2 rounded-lg hover:text-white hover:bg-[#003370] border-[#003370]">
                  Hapus Gambar
                </button>
              </div>
            </div>
          </div>
          {/* Names */}
          <div className="w-full px-4 flex flex-col justify-between h-full items-end gap-4">
            <div className="w-full">
              <p className="text-xl font-semibold">Nama Toko</p>
              <input
                className="w-full border-2 rounded-lg mt-4 px-4 py-2 outline-none font-medium"
                placeholder="Nama toko"
              />
            </div>
            <button className="bg-[#003370] text-white font-semibold py-2 px-4  w-fit rounded-lg">
              Simpan Perubahan
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
