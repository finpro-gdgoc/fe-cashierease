import React, { useMemo, useState } from "react";
import ConfigHeader from "./ConfigHeader";
import ProductConfigureTable from "./ProductConfigureTable";
import Filter from "@/assets/icons/filter.svg";
import Search from "@/assets/icons/Search.svg";
import Cross from "@/assets/icons/Cross.svg";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonAdd from "./ButtonAdd";
import { useLocation, Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addMenu } from "@/services/menu";
import Navside from "@/components/Navside";

export default function ProductConfigure() {
  const location = useLocation();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterText, setFilterText] = useState("Filter");
  const [selectedFilter, setSelectedFilter] = useState("");

  const [form, setForm] = useState({
    nama_produk: "",
    harga_produk: "",
    tipe_produk: "",
    gambar_produk: "",
  });

  const tipe_produk = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return sp.get("tipe_produk");
  }, [location.search]);

  function handleSearch(e) {
    const v = e.target.value;
    setTimeout(() => {
      if (v.length > 1 || v === "") setSearch(v);
    }, 1500);
  }

  const handleFilterChange = (text) => {
    if (selectedFilter === text) {
      setFilterText("Filter");
      setSelectedFilter("");
    } else {
      setFilterText(text);
      setSelectedFilter(text);
    }
    setIsFilterOpen(false);
  };

  // ========== Tambah Menu ==========
  const { mutate: createMenu, isPending } = useMutation({
    mutationFn: addMenu,
    onSuccess: () => {
      toast.success("Menu berhasil ditambahkan ✅");
      setForm({
        nama_produk: "",
        harga_produk: "",
        tipe_produk: "",
        gambar_produk: "",
      });
      queryClient.invalidateQueries({ queryKey: ["dataMenus"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Gagal menambahkan menu. Pastikan token admin valid.");
    },
  });

  const handleSubmit = () => {
    if (!form.nama_produk || !form.harga_produk || !form.tipe_produk) {
      toast.error("Lengkapi semua field.");
      return;
    }
    createMenu(form);
  };

  // =================================

  return (
    <>
      <div className="flex shadow-2xl pr-6 pb-6 h-screen">
        <Navside />
        <main className="w-full ml-[110px] h-screen relative pl-3 flex flex-col overflow-hidden">
          <ConfigHeader
            title="Manajemen Produk"
            paragraph="Kelola produk Anda dan atur detail serta kategorinya di sini."
            type="Produk"
          >
            <div className="flex justify-between items-center pt-10">
              <p className="text-xl font-bold">Semua Produk</p>

              <div className="flex gap-2">
                <div className="flex w-[265px] border-2 border-gray-200 rounded-xl py-2 px-3 items-center gap-2">
                  <img src={Search} />
                  <input
                    type="text"
                    className="w-full outline-none text-sm"
                    placeholder="Cari Produk"
                    onChange={handleSearch}
                  />
                </div>

                <div className="relative">
                  <button
                    className="bg-white flex items-center justify-center py-2 px-5 rounded-lg gap-2 font-semibold text-black border-2 border-gray-200 hover:bg-[#ffc700] transition-all duration-300"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <img src={Filter} />
                    <p>{filterText}</p>
                  </button>

                  <div
                    className={`absolute top-10 right-0 w-fit bg-[#ffc700] p-2 text-sm text-white rounded-xl flex flex-col items-start justify-center font-semibold z-10 ${
                      isFilterOpen ? "" : "hidden"
                    }`}
                  >
                    <Link
                      to="/productconfigure"
                      className={cn(
                        `text-base font-medium pb-1 hover:bg-[#fde99d] px-2 py-1 rounded-lg w-full`,
                        { "": !tipe_produk }
                      )}
                      onClick={() => handleFilterChange("Semua")}
                    >
                      Semua
                    </Link>
                    <Link
                      to="/productconfigure?tipe_produk=makanan"
                      className="text-base font-medium pb-1 hover:bg-[#fde99d] px-2 py-1 rounded-lg w-full"
                      onClick={() => handleFilterChange("Makanan")}
                    >
                      Makanan
                    </Link>
                    <Link
                      to="/productconfigure?tipe_produk=minuman"
                      className="text-base font-medium pb-1 hover:bg-[#fde99d] px-2 py-1 rounded-lg w-full"
                      onClick={() => handleFilterChange("Minuman")}
                    >
                      Minuman
                    </Link>
                    <Link
                      to="/productconfigure?tipe_produk=snack"
                      className="text-base font-medium pb-1 hover:bg-[#fde99d] px-2 py-1 rounded-lg w-full"
                      onClick={() => handleFilterChange("Snack")}
                    >
                      Snack
                    </Link>
                  </div>
                </div>

                {/* === Dialog Tambah Menu === */}
                <Dialog>
                  <DialogTrigger>
                    <div className="text-white bg-[#FFC700] flex items-center justify-center py-2 px-3 rounded-lg gap-2">
                      <img src={Cross} />
                      <p>Tambah Menu</p>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="w-full max-w-[32rem] border-[#FFC700] border-[3px] flex flex-col justify-center">
                    <p className="uppercase text-xl font-medium text-[#ffc700] text-center mb-2">
                      Tambah Menu
                    </p>

                    <div className="w-full mb-2">
                      <p className="uppercase text-sm font-medium pb-2">
                        Nama Menu
                      </p>
                      <input
                        placeholder="Masukkan nama menu"
                        className="text-sm border py-2 px-3 font-light outline-none w-full"
                        value={form.nama_produk}
                        onChange={(e) =>
                          setForm((s) => ({
                            ...s,
                            nama_produk: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="w-full mb-2">
                      <p className="uppercase text-sm font-medium pb-2">
                        Harga Menu
                      </p>
                      <input
                        type="number"
                        placeholder="Masukkan harga menu"
                        className="text-sm border py-2 px-3 font-light outline-none w-full"
                        value={form.harga_produk}
                        onChange={(e) =>
                          setForm((s) => ({
                            ...s,
                            harga_produk: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <p className="uppercase text-sm font-medium">Jenis Menu</p>
                    <Select
                      value={form.tipe_produk}
                      onValueChange={(v) =>
                        setForm((s) => ({ ...s, tipe_produk: v }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Jenis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="makanan">Makanan</SelectItem>
                        <SelectItem value="minuman">Minuman</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="w-full my-3">
                      <p className="uppercase text-sm font-semibold pb-2">
                        a Foto Produk
                      </p>
                      <input
                        type="text"
                        placeholder="Masukkan URL foto produk"
                        className="text-sm border py-2 px-3 font-light outline-none w-full"
                        value={form.gambar_produk}
                        onChange={(e) =>
                          setForm((s) => ({
                            ...s,
                            gambar_produk: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <ButtonAdd onClick={handleSubmit} disabled={isPending}>
                      {isPending ? "Menambahkan..." : "Tambah"}
                    </ButtonAdd>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </ConfigHeader>

          <ProductConfigureTable search={search} />
        </main>
      </div>
    </>
  );
}
