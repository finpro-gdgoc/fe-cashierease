import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PaymentSuccess from "@/assets/icons/PaymentSuccess.svg";
import PaymentLaoding from "@/assets/icons/PaymentLoading.svg";
import { DialogClose } from "@radix-ui/react-dialog";
import { formatRupiah, getCurrentDate, getCurrentTime } from "@/lib/utils";

export default function ButtonOrderConfirmation({
  totalPrice,
  payment,
  handleSubmit,
  isLoading,
  setOrder,
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="w-full bg-[#003370] text-white py-4 rounded-lg mb-12 font-medium"
            onClick={() => handleSubmit()}
          >
            Konfirmasi Pesanan
          </button>
        </DialogTrigger>
        <div onClick={() => setOrder([])}>
          <DialogContent className="w-full max-w-[32rem] pt-14 border-[#003370] border-[3px] flex flex-col items-center justify-center">
            {isLoading ? (
              <>
                <img
                  src={PaymentLaoding}
                  alt="Payment Loading"
                  className="animate-spin"
                />
                <p className="font-semibold text-2xl">
                  Pembayaran Sedang Di Proses
                </p>
                <p className="font-bold text-3xl">Rp. -</p>
                <hr className="w-full border-[1px] my-2"></hr>
                <div className="flex flex-col gap-3 w-full text-gray-400">
                  {/* <div className="flex justify-between">
                    <p>Kode Pembayaran</p>
                    <p className="text-black">-</p>
                  </div> */}
                  <div className="flex justify-between">
                    <p>Waktu Pembayaran</p>
                    <p className="text-black">-</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Metode Pembayaran</p>
                    <p className="text-black">-</p>
                  </div>
                </div>
                <hr className="w-full border-[1px] my-2 border-dotted"></hr>
                <div className="w-full flex justify-between gap-2 my-6">
                  <button className="w-1/2 border py-3 rounded-lg bg-white text-[#003370] border border-[#003370]">
                    Kembali
                  </button>
                  <button className="w-1/2 border py-3 rounded-lg text-white bg-[#003370]">
                    Cetak Bukti Transaksi
                  </button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={PaymentSuccess}
                  alt="Payment Success"
                  className="animate-bounce"
                />
                <p className="font-semibold text-2xl" id="bayarberhasil">
                  Pembayaran Berhasil!
                </p>
                <p className="font-bold text-3xl">{formatRupiah(totalPrice)}</p>
                <hr className="w-full border-[1px] my-2"></hr>
                <div className="flex flex-col gap-3 w-full text-gray-400">
                  {/* <div className="flex justify-between">
                    <p>Kode Pembayaran</p>
                    <p className="text-black">{`#${orderid}`}</p>
                  </div> */}
                  <div className="flex justify-between">
                    <p>Waktu Pembayaran</p>
                    <div className="flex flex-col items-end">
                      <p className="text-black">{getCurrentDate()}</p>
                      <p>{getCurrentTime()}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p>Metode Pembayaran</p>
                    <p className="text-black capitalize">{payment}</p>
                  </div>
                </div>
                <hr className="w-full border-[1px] my-2 border-dotted"></hr>
                <div className="w-full flex justify-between gap-2 my-6">
                  <DialogClose
                    className="w-1/2 border py-3 rounded-lg bg-white text-[#003370] hover:bg-[#003370] border-[#003370] hover:text-white transisi"
                    onClick={() => setOrder([])}
                  >
                    Kembali
                  </DialogClose>
                  <button className="w-1/2 border py-3 rounded-lg text-white bg-[#ffc800db] hover:bg-[#003370] transisi">
                    Cetak Bukti Transaksi
                  </button>
                </div>
              </>
            )}
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}
