import React, { useEffect } from "react";
import MenuCatalog from "./MenuCatalog";
import { useQuery } from "@tanstack/react-query";
import { getAllMenus } from "@/services/menu";
import { useLocation } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

export default function Menus({ setMenus, setOrder, order, search }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("tipe_produk");

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ["dataMenus"],
    queryFn: () => getAllMenus(type, search),
  });

  useEffect(() => {
    refetch();
  }, [search, type, refetch]);

  useEffect(() => {
    setMenus(order);
  }, [order, setMenus]);

  const handleOrder = (id, harga, nama, gambar) => {
    setOrder((sumOrder) => {
      const existingOrder = sumOrder.find((order) => order.id === id);
      if (existingOrder) {
        return sumOrder.map((order) =>
          order.id === id ? { ...order, qty: order.qty + 1, gambar } : order
        );
      } else {
        return [...sumOrder, { id, harga, nama, qty: 1, gambar }];
      }
    });
  };

  if (isLoading || isRefetching) {
    return (
      <div className="grid grid-cols-3 gap-3 mt-48">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-[172px] w-[200px] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="pt-48 w-full max-h-screen">
        <div className="h-full overflow-y-auto">
          {data && data.length > 0 ? (
            <div className="grid grid-cols-3 px-1 gap-3 ">
              {data.map((menu) => (
                <MenuCatalog
                  key={menu._id}
                  id={menu._id}
                  nama={menu.nama_produk}
                  jenis={menu.tipe_produk}
                  harga={menu.harga_produk}
                  gambar={menu.gambar_produk}
                  onClick={(id, harga, nama) =>
                    handleOrder(id, harga, nama, menu.gambar_produk)
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-center">Menu tidak tersedia.</p>
          )}
        </div>
      </div>
    </>
  );
}
