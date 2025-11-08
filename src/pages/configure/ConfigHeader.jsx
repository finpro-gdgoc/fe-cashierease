"use client";
import React from "react";
import { useState } from "react";

export default function ConfigHeader({ title, paragraph, children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="w-full pt-10 pb-6">
      <div className="flex relative w-fit gap-3">
        <p className="text-[#003370] text-2xl font-medium">{title}</p>
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className={`border-2 border-[#003370] px-[10px] rounded-full transition-all duration-500 ${
            isNavOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            class="w-2.5 h-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="#003370"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          className={`absolute top-7 right-2 w-fit bg-slate-100 border-2 border-[#003370] p-2 text-sm text-white rounded-xl flex flex-col items-start justify-center font-semibold ${
            isNavOpen ? "" : "hidden"
          }`}
        >
          <a
            href="/shopconfigure"
            className="hover:bg-white px-2 py-1 rounded-lg w-full"
            style={{ textDecoration: "none" }}
          >
            Kelola Toko
          </a>
          <a
            href="/userconfigure"
            className="hover:bg-white px-2 py-1 rounded-lg w-full"
            style={{ textDecoration: "none" }}
          >
            Kelola Pengguna
          </a>
          <a
            href="/productconfigure"
            className="hover:bg-white px-2 py-1 rounded-lg w-full"
            style={{ textDecoration: "none" }}
          >
            Kelola Produk
          </a>

          <a
            href="/discountconfigure"
            className="hover:bg-white px-2 py-1 rounded-lg w-full"
            style={{ textDecoration: "none" }}
          >
            Kelola Diskon
          </a>
        </div>
      </div>
      <p className="text-gray-400 font-medium">{paragraph}</p>
      {children}
    </div>
  );
}
