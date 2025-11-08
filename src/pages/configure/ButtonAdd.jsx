import React from "react";

export default function ButtonAdd({ onClick }) {
  return (
    <div className="w-full flex justify-between gap-4 mt-4">
      <button className="w-1/2 border py-3 rounded-lg bg-white text-[#003370] border border-[#003370]">
        Kembali
      </button>
      <button
        className="w-1/2 border py-3 rounded-lg text-white bg-[#003370]"
        onClick={onClick}
      >
        Tambah
      </button>
    </div>
  );
}
