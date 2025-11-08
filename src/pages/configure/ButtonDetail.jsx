import React from "react";

export default function ButtonDetail({ onDelete, loading }) {
  return (
    <div className="w-full flex justify-between gap-4 mt-4">
      <button
        onClick={onDelete}
        disabled={loading}
        className="w-1/3 border py-3 rounded-lg bg-white text-red-500 border border-red-500 hover:text-white hover:bg-red-500"
      >
        Hapus
      </button>
      <button className="w-1/3 border py-3 rounded-lg bg-white text-[#003370] border border-[#003370]">
        Kembali
      </button>
      <button className="w-1/3 border py-3 rounded-lg text-white bg-[#003370]">
        Simpan
      </button>
    </div>
  );
}
