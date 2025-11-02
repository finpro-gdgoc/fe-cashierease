import React from "react";
// import Ease from "@/../public/images/Ease.png";
import Ease from "@/assets/images/Ease.png";

export default function BgEase() {
  return (
    <div className="mx-auto h-[515px] ">
      <img src={Ease} className="opacity-20 w-full h-full bg-cover" />
    </div>
  );
}
