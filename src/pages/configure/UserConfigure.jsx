// src/pages/configure/UserConfigure.jsx
import React, { useState } from "react";
import ConfigHeader from "./ConfigHeader";
import UserConfigureTable from "./UserConfigureTable";
import SearchIcon from "@/assets/icons/Search.svg";
import Cross from "@/assets/icons/Cross.svg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonAdd from "./ButtonAdd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterUser } from "@/services/user";
import toast from "react-hot-toast";
import Navside from "@/components/Navside";

export default function UserConfigure() {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    nama: "",
    nomorPegawai: "",
    password: "",
    role: "",
  });
  const queryClient = useQueryClient();

  // debounce ringan buat search
  function handleSearch(e) {
    const v = e.target.value;
    setTimeout(() => {
      if (v.length > 1 || v === "") setSearch(v);
    }, 500);
  }

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: (p) => RegisterUser(p),
    onSuccess: () => {
      toast.success("Pengguna berhasil ditambahkan");
      // reset form
      setForm({ nama: "", nomorPegawai: "", password: "", role: "" });
      // refresh tabel
      queryClient.invalidateQueries({ queryKey: ["dataUsers"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Gagal menambahkan pengguna. Pastikan token admin valid.");
    },
  });

  const handleSubmit = () => {
    if (!form.nama || !form.nomorPegawai || !form.password || !form.role) {
      toast.error("Lengkapi semua field.");
      return;
    }
    createUser(form);
  };

  return (
    <>
      <div className="flex shadow-2xl pr-6 pb-6 h-screen">
        <Navside />
        <main className="w-full ml-[110px] h-screen relative pl-3 flex flex-col overflow-hidden">
          <ConfigHeader
            title="Manajemen Pengguna"
            paragraph="Kelola anggota tim Anda dan atur izin akun Mereka di sini"
            type="Pengguna"
          >
            <div className="flex justify-between items-center pt-10">
              <p className="text-xl font-bold">Semua Pengguna</p>
              <div className="flex gap-2">
                <div className="flex w-[265px] border-2 border-gray-200 rounded-xl py-2 px-3 items-center gap-2">
                  <img src={SearchIcon} />
                  <input
                    type="text"
                    className="w-full outline-none text-sm"
                    placeholder="Cari Pengguna"
                    onChange={handleSearch}
                  />
                </div>

                <Dialog>
                  <DialogTrigger>
                    <div className="text-white bg-[#FFC700] flex items-center justify-center py-2 px-3 rounded-lg gap-2">
                      <img src={Cross} />
                      <p>Tambah Pengguna</p>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="w-full max-w-[32rem] border-[#FFC700] border-[3px] flex flex-col justify-center">
                    <p className="uppercase text-xl font-medium text-[#ffc700] text-center mb-2">
                      Tambah Pengguna
                    </p>

                    <div className="w-full mb-2">
                      <p className="uppercase text-sm font-medium pb-2">
                        Nama Lengkap
                      </p>
                      <input
                        placeholder="Masukkan nama lengkap"
                        className="text-sm border py-2 px-3 font-light outline-none w-full"
                        value={form.nama}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, nama: e.target.value }))
                        }
                      />
                    </div>

                    <div className="w-full mb-2">
                      <p className="uppercase text-sm font-medium pb-2">
                        Nomor Pegawai
                      </p>
                      <input
                        placeholder="Masukkan nomor pegawai"
                        className="text-sm border py-2 px-3 font-light outline-none w-full"
                        value={form.nomorPegawai}
                        onChange={(e) =>
                          setForm((s) => ({
                            ...s,
                            nomorPegawai: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="w-full mb-2">
                      <p className="uppercase text-sm font-medium pb-2">
                        Password
                      </p>
                      <input
                        type="password"
                        placeholder="Masukkan password akun"
                        className="text-sm border py-2 px-3 font-light outline-none w-full"
                        value={form.password}
                        onChange={(e) =>
                          setForm((s) => ({ ...s, password: e.target.value }))
                        }
                      />
                    </div>

                    <p className="uppercase text-sm font-medium">Peran</p>
                    <Select
                      value={form.role}
                      onValueChange={(v) => setForm((s) => ({ ...s, role: v }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cashier">Kasir</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Pastikan ButtonAdd meneruskan onClick ke elemen button di dalamnya */}
                    {/* ganti block ini kalau ButtonAdd tidak forward props */}
                    <div className="mt-3">
                      <button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="bg-[#FFC700] text-white py-2 px-4 rounded-lg font-semibold disabled:opacity-60"
                      >
                        {isPending ? "Menambahkan..." : "Tambah"}
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </ConfigHeader>

          <UserConfigureTable search={search} />
        </main>
      </div>
    </>
  );
}
