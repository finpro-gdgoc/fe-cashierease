import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getAllMenus } from "@/services/menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/ui/MiniLoader";
import { formatRupiah } from "@/lib/utils";
import ButtonDetail from "./ButtonDetail";
import { useLocation } from "react-router";
import Mieayam from "@/assets/images/mieayam.png";

export default function ProductConfigureTable({ search }) {
  const location = useLocation();

  // ambil ?tipe_produk=... dari URL
  const type = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return sp.get("tipe_produk");
  }, [location.search]);

  const [currentPage, setCurrentPage] = useState(1);
  const MenusPerPage = 8;

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ["dataMenus", type, search],
    queryFn: () => getAllMenus(type, search),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // reset ke page 1 saat filter/search berubah
    setCurrentPage(1);
    refetch();
  }, [search, type, refetch]);

  const menus = Array.isArray(data) ? data : [];
  const indexOfLastMenus = currentPage * MenusPerPage;
  const indexOfFirstMenus = indexOfLastMenus - MenusPerPage;
  const currentMenus = menus.slice(indexOfFirstMenus, indexOfLastMenus);
  const totalPages = Math.max(1, Math.ceil(menus.length / MenusPerPage));

  return (
    <>
      {isLoading || isRefetching ? (
        <Loader />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="w-10">No</TableHead>
                <TableHead className="w-[40%]">Nama Makanan</TableHead>
                <TableHead className="text-center w-2/12">Kategori</TableHead>
                <TableHead className="text-center w-4/12">Harga</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMenus.map((menu, index) => (
                <TableRow key={menu._id ?? index} className="font-semibold">
                  <TableCell className="w-10">
                    {index + 1 + indexOfFirstMenus}
                  </TableCell>

                  <TableCell className="flex items-center gap-4">
                    <div className="h-14 w-[70px] flex items-center justify-center">
                      <img
                        src={
                          typeof menu.gambar_produk === "string" &&
                          menu.gambar_produk.trim() !== ""
                            ? menu.gambar_produk
                            : Mieayam
                        }
                        alt={menu.nama_produk}
                        className="object-cover rounded"
                      />
                    </div>
                    <span className="w-full">{menu.nama_produk}</span>
                  </TableCell>

                  <TableCell className="text-center capitalize">
                    {menu.tipe_produk}
                  </TableCell>

                  <TableCell className="text-center">
                    {formatRupiah(menu.harga_produk)}
                  </TableCell>

                  <TableCell className="w-10">
                    <Dialog>
                      <DialogTrigger>
                        <p className="p-1 rounded-lg bg-[#003370] text-white">
                          ...
                        </p>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-[32rem] border-[#003370] border-[3px] flex flex-col justify-center">
                        <p className="uppercase text-xl font-medium text-[#003370] text-center mb-2">
                          Detail Produk
                        </p>

                        <div className="w-full">
                          <p className="uppercase text-sm font-semibold pb-2">
                            Nama Produk
                          </p>
                          <input
                            type="text"
                            placeholder="Masukkan nama produk"
                            className="text-sm border py-2 px-3 font-light outline-none w-full"
                            defaultValue={menu.nama_produk}
                          />
                        </div>

                        <div className="w-full my-3">
                          <p className="uppercase text-sm font-semibold pb-2">
                            Harga Produk
                          </p>
                          <input
                            type="number"
                            placeholder="Masukkan harga produk"
                            className="text-sm border py-2 px-3 font-light outline-none w-full"
                            defaultValue={menu.harga_produk}
                          />
                        </div>

                        <p className="uppercase text-sm font-semibold">
                          kategori
                        </p>
                        <Select defaultValue={menu.tipe_produk}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Makanan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="makanan">Makanan</SelectItem>
                            <SelectItem value="minuman">Minuman</SelectItem>
                            <SelectItem value="snack">Snack</SelectItem>
                          </SelectContent>
                        </Select>

                        <ButtonDetail />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`mx-1 p-2 px-3 rounded-lg ${
                    currentPage === idx + 1 ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
