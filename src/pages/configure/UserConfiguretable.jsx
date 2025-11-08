// src/pages/configure/UserConfigureTable.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/ui/MiniLoader";
import ButtonDetail from "./ButtonDetail";
import { GetAllUsers } from "@/services/user";
import { tokenStore, userStore } from "@/services/auth";

export default function UserConfigureTable({ search }) {
  const access = tokenStore.getAccess();
  const user = userStore.get();
  const role = user?.role || localStorage.getItem("role");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: ["dataUsers", search],
    queryFn: () => GetAllUsers(search),
    enabled: !!access && role === "admin", // hanya fetch bila token ada & admin
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!!access && role === "admin") refetch();
  }, [search, role, access, refetch]);

  if (role !== "admin") {
    return (
      <p className="p-4 text-sm text-gray-500">
        Hanya admin yang bisa melihat daftar pengguna.
      </p>
    );
  }

  const users = Array.isArray(data) ? data : [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.max(1, Math.ceil(users.length / usersPerPage));

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
                <TableHead className="w-6/12">Nama Pengguna</TableHead>
                <TableHead className="text-center w-2/12">Peran</TableHead>
                <TableHead className="text-center w-4/12">
                  Terakhir Aktif
                </TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((u, idx) => (
                <TableRow
                  key={u.id ?? `${u.nama}-${idx + indexOfFirstUser}`}
                  className="font-semibold"
                >
                  <TableCell>{idx + 1 + indexOfFirstUser}</TableCell>
                  <TableCell>{u.nama}</TableCell>
                  <TableCell className="text-center">{u.role}</TableCell>
                  <TableCell className="text-center">
                    {u.lastActive ?? "-"}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger>
                        <p className="p-1 rounded-lg bg-[#ffc700]">...</p>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-[32rem] border-[#FFC700] border-[3px] flex flex-col justify-center">
                        <p className="uppercase text-xl font-medium text-[#ffc700] text-center mb-2">
                          Detail Pengguna
                        </p>
                        <div className="w-full mb-2">
                          <p className="uppercase text-sm font-medium pb-2">
                            Nama Lengkap
                          </p>
                          <input
                            className="text-sm border py-2 px-3 font-light outline-none w-full"
                            defaultValue={u.nama}
                            readOnly
                          />
                        </div>
                        <p className="uppercase text-sm font-medium">Peran</p>
                        <Select defaultValue={u.role} disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Kasir" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cashier">Kasir</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* biarkan tampil, tidak ada aksi delete/update */}
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
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`mx-1 p-2 px-3 rounded-lg ${
                    currentPage === i + 1 ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
