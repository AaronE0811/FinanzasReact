"use client";
import { useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { deleteRegistro } from "../services/DatosServices";
import { IoTrashOutline } from "react-icons/io5";
import { BiWallet, BiTrendingUp, BiTrendingDown } from "react-icons/bi"; // Iconos para el resumen
import Swal from "sweetalert2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Registro {
  id: number;
  monto: number;
  tipo: string;
  categoria: string;
  descripcion: string;
  creadoEn: string;
}

interface DashboardProps {
  registros: Registro[];
  darkMode: boolean;
  onRefresh: (mes?: string, anio?: string) => void;
}

export default function Dashboard({
  registros,
  darkMode,
  onRefresh,
}: DashboardProps) {
  const [mesAnio, setMesAnio] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMesAnio(value);
    const [anio, mes] = value.split("-");
    onRefresh(mes, anio);
  };

  const registrosFiltrados = useMemo(() => {
    return registros.filter((reg) => {
      const matchCat =
        filtroCategoria === "Todas" || reg.categoria === filtroCategoria;
      const matchTipo = filtroTipo === "Todos" || reg.tipo === filtroTipo;
      return matchCat && matchTipo;
    });
  }, [registros, filtroCategoria, filtroTipo]);

  // --- LÓGICA DE TOTALES ---
  const totales = useMemo(() => {
    return registrosFiltrados.reduce(
      (acc, curr) => {
        const monto = Number(curr.monto);
        if (curr.tipo === "Ingreso") acc.ingresos += monto;
        else acc.gastos += monto;
        acc.saldo = acc.ingresos - acc.gastos;
        return acc;
      },
      { ingresos: 0, gastos: 0, saldo: 0 },
    );
  }, [registrosFiltrados]);

  const dataGrafica = useMemo(() => {
    const agruparPorCategoria = registrosFiltrados.reduce(
      (acc, curr) => {
        const cat = curr.categoria;
        acc[cat] = (acc[cat] || 0) + Number(curr.monto);
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      labels: Object.keys(agruparPorCategoria),
      datasets: [
        {
          data: Object.values(agruparPorCategoria),
          backgroundColor: [
            "#4865DB",
            "#10B981",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#EC4899",
            "#3B82F6",
          ],
          borderWidth: 0,
          hoverOffset: 15,
        },
      ],
    };
  }, [registrosFiltrados]);

  const handleEliminar = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      confirmButtonColor: "#EF4444",
    });

    if (confirm.isConfirmed) {
      const ok = await deleteRegistro(id);
      if (ok) {
        const [anio, mes] = mesAnio.split("-");
        onRefresh(mes, anio);
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="w-full lg:w-[70%] mt-4 flex flex-col gap-6 mb-10">
      {/* 1. SECCIÓN DE TOTALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`p-4 rounded-xl shadow border-l-4 border-green-500 ${darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}`}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold opacity-60 uppercase">
              Ingresos
            </span>
            <BiTrendingUp className="text-green-500" size={24} />
          </div>
          <p className="text-xl font-bold mt-1">
            ₡{totales.ingresos.toLocaleString()}
          </p>
        </div>

        <div
          className={`p-4 rounded-xl shadow border-l-4 border-red-500 ${darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}`}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold opacity-60 uppercase">
              Gastos
            </span>
            <BiTrendingDown className="text-red-500" size={24} />
          </div>
          <p className="text-xl font-bold mt-1">
            ₡{totales.gastos.toLocaleString()}
          </p>
        </div>

        <div
          className={`p-4 rounded-xl shadow border-l-4 ${totales.saldo >= 0 ? "border-blue-500" : "border-orange-500"} ${darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}`}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold opacity-60 uppercase">
              Saldo Neto
            </span>
            <BiWallet
              className={
                totales.saldo >= 0 ? "text-blue-500" : "text-orange-500"
              }
              size={24}
            />
          </div>
          <p
            className={`text-xl font-bold mt-1 ${totales.saldo < 0 ? "text-red-400" : "text-blue-500"}`}
          >
            ₡{totales.saldo.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 2. SELECTOR DE MES Y GRÁFICA */}
      <div
        className={`p-6 rounded-xl shadow ${darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="font-bold text-lg">Análisis de Datos</h2>
          <input
            type="month"
            value={mesAnio}
            onChange={handleMonthChange}
            className={`p-2 rounded-lg border outline-none font-bold ${darkMode ? "bg-[#2A2A2A] border-gray-600" : "bg-gray-50 border-gray-300"}`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-44 h-44 relative">
              {registrosFiltrados.length > 0 ? (
                <Doughnut
                  data={dataGrafica}
                  options={{
                    cutout: "75%",
                    plugins: { legend: { display: false } },
                  }}
                />
              ) : (
                <div className="text-center text-[10px] opacity-40 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center p-4 italic">
                  Sin movimientos
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold opacity-50 uppercase ml-1">
                Categoría
              </label>
              <select
                className={`p-2 rounded-lg border outline-none ${darkMode ? "bg-[#1E1E1E] border-gray-600" : "bg-white border-gray-300"}`}
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="Todas">Todas</option>
                <option value="Alimentacion">Alimentación</option>
                <option value="Salud">Salud</option>
                <option value="Transporte">Transporte</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Compras">Compras/Pagos</option>
                <option value="Ingreso">Ingresos</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold opacity-50 uppercase ml-1">
                Tipo
              </label>
              <select
                className={`p-2 rounded-lg border outline-none ${darkMode ? "bg-[#1E1E1E] border-gray-600" : "bg-white border-gray-300"}`}
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="Todos">Ambos</option>
                <option value="Ingreso">Ingresos</option>
                <option value="Gasto">Gastos</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TABLA CON DESCRIPCIÓN */}
      <div
        className={`overflow-x-auto rounded-xl shadow ${darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}`}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={darkMode ? "bg-[#2A2A2A]" : "bg-gray-100"}>
              <th className="p-4 text-[11px] font-bold uppercase opacity-50">
                Fecha
              </th>
              <th className="p-4 text-[11px] font-bold uppercase opacity-50">
                Categoría
              </th>
              <th className="p-4 text-[11px] font-bold uppercase opacity-50">
                Descripción
              </th>
              <th className="p-4 text-[11px] font-bold uppercase opacity-50 text-right">
                Monto
              </th>
              <th className="p-4 text-[11px] font-bold uppercase opacity-50 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.length > 0 ? (
              registrosFiltrados.map((reg) => (
                <tr
                  key={reg.id}
                  className="border-t border-gray-700/20 hover:bg-gray-500/5 transition-colors"
                >
                  <td className="p-4 text-[10px] opacity-60 italic">
                    {new Date(reg.creadoEn).toLocaleDateString("es-CR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </td>
                  <td className="p-4 text-sm font-semibold">{reg.categoria}</td>
                  <td className="p-4 text-xs opacity-80 max-w-36] truncate">
                    {reg.descripcion}
                  </td>
                  <td
                    className={`p-4 font-bold text-right ${reg.tipo === "Ingreso" ? "text-green-500" : "text-red-500"}`}
                  >
                    {reg.tipo === "Ingreso" ? "+" : "-"} ₡
                    {Number(reg.monto).toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleEliminar(reg.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <IoTrashOutline size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center opacity-40 italic">
                  No hay datos en este período.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
