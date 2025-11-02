import React from "react";

export default function PaymentCard({ src, label, onClick, isPaymentActive }) {
  return (
    <>
      <button
        className={`w-[72px] text-4xl flex flex-col items-center p-2 rounded-md border-2 ${
          isPaymentActive
            ? "text-[#003370] border-[#003370]"
            : "text-neutral-400"
        }`}
        onClick={onClick}
      >
        {src}
        <p
          className={`text-xs  text-center mt-1 capitalize ${
            isPaymentActive ? "text-[#003370] " : "text-gray-300"
          }`}
        >
          {label}
        </p>
      </button>
    </>
  );
}
