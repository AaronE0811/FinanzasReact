"use client";
import { useState, useEffect, useCallback } from "react";
import Main from "../components/main";
import { jwtDecode } from "jwt-decode";
import CreateForm from "../hooks/createForm";
import Dashboard from "../components/Dashboard";
import { getRegistros } from "../services/DatosServices";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  // Tipamos el estado para evitar el error de 'never[]'
  const [registros, setRegistros] = useState<any[]>([]);

  interface TokenPayload {
    email: string;
    name: string;
  }

  const fetchDatos = useCallback(async (mes?: string, anio?: string) => {
    try {
      const d = new Date();
      const m = mes || String(d.getMonth() + 1).padStart(2, "0");
      const a = anio || String(d.getFullYear());

      const data = await getRegistros(m, a);
      setRegistros(data);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  }, []);

  const { register, handleSubmit, errors, onSubmit, watch } =
    CreateForm(fetchDatos);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<TokenPayload>(token);
        setName(decodedToken.name);

        fetchDatos();
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [fetchDatos]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`w-full min-h-screen p-4 flex flex-col items-center gap-4 transition-colors duration-300 ${
        darkMode ? "bg-[#121212]" : "bg-[#F9FAFB]"
      } rounded shadow`}
    >
      {/* Formulario de ingreso de datos */}
      <Main
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        name={name}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        watch={watch}
      />

      {/* Reporte de gráficas, filtros y tabla */}
      <Dashboard
        registros={registros}
        darkMode={darkMode}
        onRefresh={fetchDatos}
      />
    </div>
  );
}
