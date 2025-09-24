import React from "react";
import ButtonAuth from "./ui/ButtonAuth";

export default function LoginForm() {
  return (
    <form>
      <input
        type="text"
        className="input-style mb-3"
        placeholder="Nomor Pegawai Kasir"
        id="nomorPegawai"
      />
      <input
        type="password"
        className="input-style"
        placeholder="Kata Sandi Toko"
        id="password"
      />
      <ButtonAuth title="Masuk" />
    </form>
  );
}
