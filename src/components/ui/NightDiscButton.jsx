import React from "react";
import { HiMoon } from "react-icons/hi2";

export default function NightDiscButton({ onClick, isNightActive }) {
  return (
    <button
      className={`w-[72px] text-4xl flex flex-col items-center p-2 rounded-md border-2 ${
        isNightActive ? "text-[#003370] border-[#003370]" : "text-neutral-400"
      }`}
      onClick={onClick}
    >
      <HiMoon />
      <p
        className={`text-xs  text-center mt-1 capitalize ${
          isNightActive ? "text-[#003370] " : "text-gray-300"
        }`}
      >
        Malam
      </p>
    </button>
  );
}
