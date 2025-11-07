import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "../lib/utils";
import { HiBuildingStorefront, HiChartPie } from "react-icons/hi2";
import { FaWrench } from "react-icons/fa";
import { Logout } from "../services/auth";
import { IoIosLogOut } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";

export default function Navside() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    Logout();
    queryClient.removeQueries();
    queryClient.clear();
    navigate("/");
  };

  return (
    <nav className="bg-[#003370] h-screen col-span-1 fixed px-6 xl:pt-16 xl:py-0 xl:justify-normal lg:py-8 flex flex-col xl:gap-24 lg:gap-0 lg:justify-between items-center ">
      <Link
        to="/dashboard"
        className={cn(`p-2 hover:bg-[#5f67af] rounded-xl`, {
          "bg-[#95a1d9]": pathname === "/dashboard",
        })}
      >
        <HiBuildingStorefront className="text-5xl text-white" />
      </Link>
      <Link
        to="/statistic"
        className={cn(`p-2 hover:bg-[#5f67af] rounded-xl`, {
          "bg-[#95a1d9]": pathname === "/statistic",
        })}
      >
        <HiChartPie className="text-5xl text-white" />
      </Link>
      <Link
        to="/shopconfigure"
        className={cn(`p-2 hover:bg-[#5f67af] rounded-xl`, {
          "bg-[#95a1d9]":
            pathname === "/shopconfigure" ||
            pathname === "/productconfigure" ||
            pathname === "/discountconfigure" ||
            pathname === "/userconfigure",
        })}
      >
        <FaWrench className="text-5xl text-white" />
      </Link>
      <button
        onClick={handleLogout}
        className={cn(`p-2 hover:bg-[#95a1d9] rounded-xl`, {
          "bg-[#95a1d9]": pathname === "/",
        })}
      >
        <IoIosLogOut className="text-5xl text-white" />
      </button>
    </nav>
  );
}
