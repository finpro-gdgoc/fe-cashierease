import React, { useEffect, useState } from "react";
import PriceDetail from "@/components/ui/PriceDetail";
import DiscountButton from "@/components/ui/DiscountButton";
import PaymentCard from "@/components/ui/PaymentCard";
import ButtonOrder from "./ButtonOrder";
import ButtonOrderConfirmation from "./ButtonOrderConfirmation";
import NightDiscButton from "@/components/ui/NightDiscButton";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostOrder } from "@/services/order";
import { GetAllCoupons } from "@/services/coupon";

import { HiCurrencyDollar, HiXCircle } from "react-icons/hi2";
import { formatRupiah } from "@/lib/utils";

export default function Order({ menus, setOrder }) {
  const [isTakeaway, setIsTakeaway] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [coupon, setCoupon] = useState(0);
  const [couponName, setCouponName] = useState("");
  const [couponID, setCouponID] = useState("");
  const [isCouponActive, setIsCouponActive] = useState(false);

  const [orderid, setOrderid] = useState("");

  let totalTax = 0;
  let totalDiscount = 0;
  let subTotalAfterDiscount = 0;
  let totalPrice = 0;

  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveOrder = (id) => {
    setOrder((prevOrders) => prevOrders.filter((item) => item.id !== id));
  };

  const subTotalPrice = menus
    ? menus.reduce((total, item) => total + item.harga * item.qty, 0)
    : "-";

  const order = {
    order_items: menus,
    payment_method: paymentMethod,
    coupon: couponID,
  };

  useEffect(() => {
    setIsCouponActive(coupon > 0);
  }, [coupon]);

  totalDiscount = coupon;
  subTotalAfterDiscount = subTotalPrice - totalDiscount;
  totalTax = subTotalAfterDiscount * 0.1;
  totalPrice = subTotalAfterDiscount + totalTax;

  function handleSubmit() {
    if (!menus) {
      toast.error("Masukkan produk!");
    }
    setIsLoading(true);
    postOrder(order);
  }

  const { mutate: postOrder } = useMutation({
    mutationFn: (data) => PostOrder(data),
    onSuccess: (data) => {
      setOrderid(data);
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Cek kembali produk anda!");
      setOrder([]);
      setIsLoading(false);
    },
  });

  const { data: allCoupons } = useQuery({
    queryKey: ["dataAllCoupon"],
    queryFn: () => GetAllCoupons(),
  });

  return (
    <div className="w-full flex flex-col justify-between col-span-5 overflow-y-hidden h-screen">
      <div className="w-full px-4 pl-2 py-10 ">
        <p className="text-[#003370] text-2xl font-medium">Order #1</p>
        <div className="flex gap-2 mt-5">
          <button
            className={
              isTakeaway
                ? "px-6 py-2 bg-white rounded-lg text-[#003370] border-[#003370] border hover:text-white hover:bg-[#003370] text-sm"
                : "px-6 py-2 bg-[#003370] rounded-lg text-white text-sm"
            }
            onClick={() => setIsTakeaway(!isTakeaway)}
          >
            Makan ditempat
          </button>
          <button
            className={
              isTakeaway
                ? "px-6 py-2 bg-[#003370] rounded-lg text-white text-sm"
                : "px-6 py-2 bg-white rounded-lg text-[#003370] border-[#003370] border hover:text-white hover:bg-[#003370] text-sm"
            }
            onClick={() => setIsTakeaway(!isTakeaway)}
          >
            Bungkus
          </button>
        </div>
        <p className=" text-[#003370] mt-4 font-medium mb-2">Item</p>
        {menus && (
          <div className="max-h-[14rem] overflow-y-auto">
            {menus.map((item) => (
              <ul
                key={item.id}
                className="flex flex-row justify-between w-full py-2 border-2 rounded-lg mb-2 px-4 text-black text-sm"
              >
                <li className="w-full">
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-4  w-[45%]">
                      <img
                        src={item.gambar}
                        alt={item.nama}
                        className="w-[60px] h-[60px] object-cover rounded"
                      />
                      <p>{item.nama}</p>
                    </div>
                    <span> x {item.qty}</span>
                    <div className="flex gap-2 items-center ">
                      <p>{formatRupiah(item.harga)}</p>
                      <button onClick={() => handleRemoveOrder(item.id)}>
                        <HiXCircle className="text-3xl text-[#003370] hover:text-black" />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        )}
        <hr className="w-full border-[1px] mb-4"></hr>
        <div className="flex w-full items-center gap-28 justify-center">
          <DiscountButton
            key={order}
            setCoupon={setCoupon}
            setCouponName={setCouponName}
            setCouponID={setCouponID}
            data={allCoupons}
            price={subTotalPrice}
            isCouponActive={isCouponActive}
          />
          <NightDiscButton />
        </div>
        <hr className="w-full border-[1px] my-4"></hr>
        <div className="px-2">
          <PriceDetail
            desc="Pajak"
            className="text-gray-300 text-xs"
            value={formatRupiah(totalTax || 0)}
          />
          <div
            className={`flex justify-between items-center text-gray-300 text-xs my-2`}
          >
            <p>Diskon</p>
            <p className="text-black">
              {formatRupiah(coupon || 0)}{" "}
              {coupon ? (
                <span className="font-bold text-neutral-300">
                  {" "}
                  -{couponName}
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <PriceDetail
            desc="Subtotal"
            className="text-gray-300 text-xs"
            value={formatRupiah(subTotalPrice)}
          />
        </div>
        <hr className="w-full border-[1px] my-4 border-dotted"></hr>
        <PriceDetail
          desc="Total"
          className="text-black text-sm font-medium px-2"
          value={formatRupiah(totalPrice || 0)}
        />
        <hr className="w-full border-[1px] my-4"></hr>
        <p className="flex justify-between items-center text-black text-sm font-medium my-4">
          Metode Pembayaran
        </p>
        <div className="w-full flex items-center justify-center gap-12 mt-6">
          <PaymentCard
            src={<HiCurrencyDollar />}
            label="cash"
            onClick={() => setPaymentMethod("cash")}
            isPaymentActive={paymentMethod === "cash"}
          />
          <PaymentCard
            src={<HiCurrencyDollar />}
            label="QRIS"
            onClick={() => setPaymentMethod("qris")}
            isPaymentActive={paymentMethod === "qris"}
          />
          <PaymentCard
            src={<HiCurrencyDollar />}
            label="debit"
            onClick={() => setPaymentMethod("debit")}
            isPaymentActive={paymentMethod === "debit"}
          />
        </div>
      </div>
      <div className="px-4 pl-2">
        {menus && menus.length > 0 ? (
          <ButtonOrderConfirmation
            orderid={orderid}
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            payment={paymentMethod}
            isLoading={isLoading}
            setOrder={setOrder}
          />
        ) : (
          <ButtonOrder />
        )}
      </div>
    </div>
  );
}
