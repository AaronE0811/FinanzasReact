"use client";
import useLoginForm from "../hooks/useLoginForm";
import Link from "next/link";
import { useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
export default function Login() {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center transition-colors duration-300 ${
        darkMode ? "bg-[#121212] text-[#F9FAFB]" : "bg-[#F9FAFB] text-[#121212]"
      }`}
    >
      {/* Header idéntico al anterior */}
      <header
        className={`w-full mt-2 lg:w-[70%] ${
          darkMode
            ? "bg-[#1E1E1E] shadow text-[#F9FAFB]"
            : "bg-[#FFFFFF] shadow text-[#121212]"
        } flex justify-between items-center p-4 rounded transition-colors`}
      >
        <div>
          <h1 className="font-bold text-[18px] lg:text-[25px]">
            Finanzas Personales
          </h1>
        </div>
        <button className="flex gap-2 items-center" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
          {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex justify-center items-center flex-col w-full">
        <div
          className={`w-85 lg:w-132 h-auto flex flex-col p-8 rounded-xl shadow transition-colors ${
            darkMode
              ? "bg-[#1E1E1E] text-[#F9FAFB]"
              : "bg-[#FFFFFF] text-[#121212]"
          }`}
        >
          <div className="title">
            <h1 className="font-reddit font-bold text-[32px] leading-[140%] tracking-[-0.03px]">
              Bienvenido de nuevo
            </h1>
            <p
              className={`font-regular text-[18px] leading-[140%] tracking-[-0.03px] ${
                darkMode ? "text-[#a6acb1]" : "text-[#57577B]"
              }`}
            >
              Inicia sesión para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            {/* Email */}
            <div className="email mb-4 font-regular text-[18px]">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                className={`border rounded-xl mt-2 mb-1 h-12 w-full p-4 transition-colors ${
                  darkMode
                    ? "bg-[#1E1E1E] border-[#F9FAFB] text-[#F9FAFB] placeholder:text-[#a6acb1]"
                    : "bg-[#FFFFFF] border-[#121212] text-[#121212] placeholder:text-[#a6acb1]"
                }`}
                type="email"
                id="email"
                placeholder="name@gmail.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="password mb-6 font-regular text-[18px]">
              <label htmlFor="password">Contraseña</label>
              <input
                className={`border rounded-xl mt-2 mb-1 h-12 w-full p-4 transition-colors ${
                  darkMode
                    ? "bg-[#1E1E1E] border-[#F9FAFB] text-[#F9FAFB] placeholder:text-[#a6acb1]"
                    : "bg-[#FFFFFF] border-[#121212] text-[#121212] placeholder:text-[#a6acb1]"
                }`}
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full font-semibold text-[20px] text-white bg-[#4865DB] rounded h-12 mt-4 mb-4 hover:opacity-90 transition-opacity"
            >
              Iniciar Sesión
            </button>
          </form>

          <p className="flex w-full font-regular text-[18px] justify-center">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/createUser"
              className="ml-2 text-[#4865DB] font-bold hover:underline cursor-pointer"
            >
              Crear una cuenta
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
