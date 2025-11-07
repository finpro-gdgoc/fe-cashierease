import React from "react";
import { ColorRing } from "react-loader-spinner";

export default function MiniLoader() {
  return (
    <>
      <div className="w-full flex items-center justify-center h-full ">
        <ColorRing
          colors={["#ffc700", "#ffc700", "#ffc700", "#ffc700", "#ffc700"]}
          height="90"
          width="90"
        />
      </div>
    </>
  );
}
