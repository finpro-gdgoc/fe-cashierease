import React from "react";
import FlipButtonRight from "@/../public/images/flipButton.png";

export default function FlipButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-3 bottom-3 hover:cursor-pointer"
    >
      <img src={FlipButtonRight} className="bg-white" />
    </button>
  );
}
