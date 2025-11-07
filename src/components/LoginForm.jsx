import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import ButtonAuth from "./ui/ButtonAuth";
import { PostLogin } from "@/services/auth";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function onSubmit(data) {
    setIsLoading(true);
    login(data);
  }

  const { mutate: login } = useMutation({
    mutationFn: (data) => PostLogin(data),
    onSuccess: (response) => {
      const user = response?.data?.data;

      if (user?.id != null) {
        localStorage.setItem("id", String(user.id));
      }
      if (user?.role) {
        localStorage.setItem("role", user.role);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });

      toast.success("Login berhasil!");
      navigate("/dashboard");
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Login gagal! Periksa kembali data anda.");
      reset();
      setIsLoading(false);
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="input-style mb-3"
        placeholder="Nomor Pegawai Kasir"
        id="nomorPegawai"
        {...register("nomorPegawai", {
          required: "Nomor pegawai diperlukan!",
        })}
      />
      <input
        type="password"
        className="input-style"
        placeholder="Kata Sandi Toko"
        id="password"
        {...register("password", {
          required: "Password diperlukan!",
        })}
      />
      {errors && (
        <p className="text-sm text-red-600 mb-6 mt-1">
          {errors?.nomorPegawai?.message || errors?.password?.message}
        </p>
      )}
      <ButtonAuth title="Masuk" isLoading={isLoading} />
    </form>
  );
}
