import React from "react";
import MiniEase from "@/../public/images/mini-ease.png";

export default function LogoCashierEase() {
  return (
    <>
      <div className="flex items-center justify-center">
        <img src={MiniEase} />
      </div>
      <h1 className="font-medium text-center text-2xl leading-9">
        Cashier<span className="text-[#003370]">Ease</span>
      </h1>
    </>
  );
}
