"use client";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import useCreateForm from "../hooks/useCreateForm";
import Link from "next/link";
import { useState } from "react";

function CreateAccount() {
  const { register, handleSubmit, errors, onSubmit } = useCreateForm();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center transition-colors duration-300 ${
        darkMode ? "bg-[#121212] text-[#F9FAFB]" : "bg-[#F9FAFB] text-[#121212]"
      }`}
    >
      <header
        className={`w-full mt-2 lg:w-[70%] ${
          darkMode
            ? "bg-[#1E1E1E] shadow text-[#F9FAFB]"
            : "bg-[#FFFFFF] shadow text-[#121212]"
        } flex justify-between items-center p-4 rounded`}
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

      <main className="flex-1 flex justify-center items-center flex-col w-full">
        <div
          className={`w-85 lg:w-130 p-8 rounded-xl shadow transition-colors ${
            darkMode
              ? "bg-[#1E1E1E] text-[#F9FAFB]"
              : "bg-[#FFFFFF] text-[#121212]"
          }`}
        >
          <div className="mb-6">
            <h1 className="font-reddit font-bold text-[32px] leading-[140%] tracking-[-0.03px]">
              Crear una cuenta
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-4 font-regular text-[18px]">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                className={`w-full h-12 p-4 mt-2 mb-1 border rounded-xl transition-colors ${
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
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Name */}
            <div className="mb-4 font-regular text-[18px]">
              <label htmlFor="name">Nombre</label>
              <input
                className={`w-full h-12 p-4 mt-2 mb-1 border rounded-xl transition-colors ${
                  darkMode
                    ? "bg-[#1E1E1E] border-[#F9FAFB] text-[#F9FAFB] placeholder:text-[#a6acb1]"
                    : "bg-[#FFFFFF] border-[#121212] text-[#121212] placeholder:text-[#a6acb1]"
                }`}
                type="text"
                id="name"
                placeholder="John Doe"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6 font-regular text-[18px]">
              <label htmlFor="password">Contraseña</label>
              <input
                className={`w-full h-12 p-4 mt-2 mb-1 border rounded-xl transition-colors ${
                  darkMode
                    ? "bg-[#1E1E1E] border-[#F9FAFB] text-[#F9FAFB] placeholder:text-[#a6acb1]"
                    : "bg-[#FFFFFF] border-[#121212] text-[#121212] placeholder:text-[#a6acb1]"
                }`}
                type="password"
                id="password"
                {...register("password")}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full font-semibold text-[20px] text-white bg-[#4865DB] rounded h-12 mb-4 hover:opacity-90 transition-opacity"
            >
              Crear Cuenta
            </button>
          </form>

          <p className="flex w-full font-regular text-[18px] justify-center">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="ml-2 text-[#4865DB] font-bold hover:underline"
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default CreateAccount;
