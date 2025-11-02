import React from "react";

export default function PriceDetail({ desc, className, value }) {
  return (
    <div className={`flex justify-between items-center ${className} my-2`}>
      <p>{desc}</p>
      <p className="text-black">{value}</p>
    </div>
  );
}
