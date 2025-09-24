import React from "react";
import { cn } from "@/lib/utils";

export default function ButtonAuth({ title, isLoading }) {
  return (
    <button
      type="submit"
      className={cn(
        `text-white py-2 mt-4 cursor-pointer px-8 rounded-md font-semibold bg-[#003370] text-center`,
        { "bg-gray-200": isLoading }
      )}
      // disabled={isLoading}
    >
      {title}
    </button>
  );
}
