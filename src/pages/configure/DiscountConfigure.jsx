import React, { useState } from "react";
import ConfigHeader from "./ConfigHeader";
import Cross from "@/assets/icons/Cross.svg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CouponCard from "./CouponCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GetAllCoupons, CreateCoupon, DeleteCoupon } from "@/services/coupon";
import toast from "react-hot-toast";
import Navside from "@/components/Navside";
import ButtonDetail from "./ButtonDetail";

/** helper: ubah local datetime ke ISO + timezone offset (yyyy-mm-ddThh:mm:ss+hh:mm) */
function toISOWithTZ(localDateTime) {
  if (!localDateTime) return "";
  const d = new Date(localDateTime);
  const pad = (n) => String(n).padStart(2, "0");
  const tzMin = -d.getTimezoneOffset();
  const sign = tzMin >= 0 ? "+" : "-";
  const hh = pad(Math.floor(Math.abs(tzMin) / 60));
  const mm = pad(Math.abs(tzMin) % 60);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}${sign}${hh}:${mm}`;
}

function InputField({ label, type = "text", className = "", ...props }) {
  return (
    <div className="w-full mb-2">
      <p className="uppercase text-sm font-medium pb-2">{label}</p>
      <input
        type={type}
        {...props}
        className={`text-sm border py-2 px-3 font-light outline-none w-full ${className}`}
      />
    </div>
  );
}

export default function DiscountConfigure() {
  const [newCoupon, setNewCoupon] = useState({
    kode_coupon: "",
    awal_coupon: "",
    akhir_coupon: "",
    besar_discount: "",
    deskripsi: "",
    payment_method: "ALL",
  });

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["dataAllCoupon"],
    queryFn: GetAllCoupons,
  });

  const { mutate: addCoupon, isPending: adding } = useMutation({
    mutationFn: CreateCoupon,
    onSuccess: () => {
      toast.success("Kupon berhasil ditambahkan!");
      setNewCoupon({
        kode_coupon: "",
        awal_coupon: "",
        akhir_coupon: "",
        besar_discount: "",
        deskripsi: "",
        payment_method: "ALL",
      });
      refetch();
    },
    onError: () =>
      toast.error("Gagal menambahkan kupon. Pastikan token admin valid."),
  });

  const { mutate: removeCoupon, isPending: deleting } = useMutation({
    mutationFn: DeleteCoupon,
    onSuccess: () => {
      toast.success("Kupon dihapus.");
      refetch();
    },
    onError: () => toast.error("Gagal menghapus kupon."),
  });

  const handleAddCoupon = () => {
    const p = newCoupon;

    if (
      !p.kode_coupon ||
      !p.besar_discount ||
      !p.awal_coupon ||
      !p.akhir_coupon
    ) {
      toast.error("Harap isi semua field!");
      return;
    }

    const payload = {
      kode_coupon: p.kode_coupon.trim(),
      awal_coupon: toISOWithTZ(p.awal_coupon),
      akhir_coupon: toISOWithTZ(p.akhir_coupon),
      besar_discount: Number(p.besar_discount),
      deskripsi: p.deskripsi?.trim() || "",
      payment_method: p.payment_method || "ALL",
    };

    addCoupon(payload);
  };

  return (
    <div className="flex shadow-2xl pr-6 pb-6 h-screen">
      <Navside />
      <main className="w-full ml-[110px] h-screen relative pl-3 flex flex-col">
        <ConfigHeader
          title="Manajemen Diskon"
          paragraph="Kelola diskon Anda dan atur detail serta syaratnya di sini."
        >
          <div className="flex justify-between items-center pt-10">
            <p className="text-xl font-bold">Semua Kupon</p>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger>
                  <div className="text-white bg-[#003370] flex items-center justify-center py-2 px-3 rounded-lg gap-2">
                    <img src={Cross} alt="Tambah" />
                    <p>Tambah Kupon</p>
                  </div>
                </DialogTrigger>

                <DialogContent className="w-full max-w-[32rem] border-[#003370] border-[3px] flex flex-col justify-center">
                  <p className="uppercase text-xl font-medium text-[#003370] text-center mb-2">
                    Tambah Kupon
                  </p>

                  <div className="space-y-2">
                    <InputField
                      label="Kode Kupon"
                      placeholder="Masukkan kode kupon (unik)"
                      value={newCoupon.kode_coupon}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          kode_coupon: e.target.value,
                        }))
                      }
                    />

                    <InputField
                      label="Nominal Kupon"
                      type="number"
                      placeholder="Masukkan nominal kupon"
                      value={newCoupon.besar_discount}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          besar_discount: e.target.value,
                        }))
                      }
                    />

                    <InputField
                      label="Deskripsi Kupon"
                      placeholder="Keterangan kupon"
                      value={newCoupon.deskripsi}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          deskripsi: e.target.value,
                        }))
                      }
                    />

                    <InputField
                      label="Tanggal Mulai"
                      type="datetime-local"
                      value={newCoupon.awal_coupon}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          awal_coupon: e.target.value,
                        }))
                      }
                    />

                    <InputField
                      label="Tanggal Akhir"
                      type="datetime-local"
                      value={newCoupon.akhir_coupon}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          akhir_coupon: e.target.value,
                        }))
                      }
                    />

                    <button
                      onClick={handleAddCoupon}
                      disabled={adding}
                      className="bg-[#003370] text-white py-2 px-4 rounded-lg font-semibold mt-3 disabled:opacity-60"
                    >
                      {adding ? "Menambahkan..." : "Tambah"}
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </ConfigHeader>

        <hr className="border-[1px]" />

        <div className="grid grid-cols-3 my-8 gap-6">
          {isLoading ? (
            <p>Memuat kupon...</p>
          ) : data?.length ? (
            data.map((code) => (
              <Dialog key={code.id ?? code.kodeCoupon}>
                <DialogTrigger>
                  <CouponCard
                    kodeCoupon={code.kodeCoupon}
                    deskripsi={code.deskripsi}
                    CouponDate={code.akhirCoupon}
                  />
                </DialogTrigger>

                <DialogContent className="w-full max-w-[30rem] border-[#003370] border-[3px] flex flex-col justify-center">
                  <p className="uppercase text-xl font-medium text-[#003370] text-center mb-2">
                    Detail Kupon
                  </p>

                  <InputField
                    label="Kode Kupon"
                    value={code.kodeCoupon}
                    readOnly
                  />
                  <InputField
                    label="Deskripsi Kupon"
                    value={code.deskripsi}
                    readOnly
                  />

                  <ButtonDetail
                    loading={deleting}
                    onDelete={() => removeCoupon(code.id)} // gunakan ID numerik
                  />
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <p>Tidak ada kupon.</p>
          )}
        </div>
      </main>
    </div>
  );
}
