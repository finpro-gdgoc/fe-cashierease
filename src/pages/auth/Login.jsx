import LoginForm from "@/components/LoginForm";
import FlipButton from "@/components/ui/FlipButton";
import LogoCashierEase from "@/components/ui/LogoCashierEase";
import React from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full bg-gray-100 auth-pattern shadow-2xl">
      <div className="mx-auto min-h-screen rounded-lg w-10/12 flex items-center">
        <main className="w-full bg-white rounded-2xl flex justify-between items-center px-20 py-16 gap-16 relative shadow-2xl">
          <div className=" w-7/12">
            <LogoCashierEase />
          </div>
          <div className="w-[2px] h-96 bg-gray-200"></div>
          <div>
            <h1 className="font-semibold text-2xl">Login</h1>
            <p className="text-gray-300 text-xs mb-6 mt-4">
              Autentikasi diperlukan untuk masuk kedalam aplikasi
            </p>
            <LoginForm />
          </div>
          <FlipButton onClick={() => navigate("/")} />
        </main>
      </div>{" "}
    </div>
  );
}
