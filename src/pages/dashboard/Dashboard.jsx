import React, { useState } from "react";
import Menus from "./Menus";
import MenusHeader from "./MenusHeader";
import Order from "./Order";
import Navside from "@/components/Navside";

export default function Dashboard() {
  const [menus, setMenus] = useState([]);
  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState("");

  function handleSearch(menu) {
    setTimeout(() => {
      if (menu.target.value.length > 1 || menu.target.value === "") {
        setSearch(menu.target.value);
      }
    }, 1500);
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-[127px] h-screen overflow-hidden shadow-2xl overflow-x-hidden">
        <Navside />

        <main className="w-full ml-[110px] h-full pl-3 col-span-6 flex flex-row">
          <MenusHeader handleSearch={handleSearch} />
          <Menus
            setMenus={setMenus}
            order={order}
            setOrder={setOrder}
            search={search}
          />
        </main>
        <Order menus={menus} setOrder={setOrder} setMenus={setMenus} />
      </div>
    </>
  );
}
