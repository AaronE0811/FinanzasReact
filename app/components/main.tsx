import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { IoMdSwap } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { TbFileDescription } from "react-icons/tb";
interface MainProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  name: string;
  watch: any;
  register: any;
  handleSubmit: any;
  errors: any;
  onSubmit: any;
}
function Main({
  darkMode,
  toggleDarkMode,
  name,
  register,
  handleSubmit,
  errors,
  onSubmit,
  watch,
}: MainProps) {
  const tipoSeleccionado = watch("tipo");
  return (
    <div className={`w-full mt-2 p-2 flex flex-col items-center`}>
      <header
        className={`w-full lg:w-[70%] ${darkMode ? "bg-[#1E1E1E] rounded shadow text-[#F9FAFB]" : "bg-[#FFFFFF] rounded shadow text-[#121212]"} flex flex-col lg:flex-row justify-between items-center p-4`}
      >
        <div>
          <h1 className="font-bold text-[18px] lg:text-[25px]">
            Finanzas Personales
          </h1>
        </div>
        <div
          className={`flex gap-2 w:text-[14px] items-center justify-evenly  divide-x ${darkMode ? "divide-gray-600" : "divide-gray-300"}`}
        >
          <p className="pr-4 gap-2 flex flex-col lg:flex-row items-center">
            Bienvenido:
            <span className="font-bold"> {name ? `${name}` : "Invitado"}</span>
          </p>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="px-4 cursos-pointer"
          >
            Cerrar sesion
          </button>

          <button
            className="px-4 flex flex-col lg:flex-row gap-2 items-center border-none cursor-pointer"
            onClick={toggleDarkMode}
          >
            <span className="hidden lg:inline">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>

            {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
          </button>
        </div>
      </header>
      <main
        className={`w-full lg:w-[70%] mt-2 ${darkMode ? "bg-[#1E1E1E] rounded shadow text-[#F9FAFB]" : "bg-[#FFFFFF] rounded shadow text-[#121212]"} flex justify-between items-center p-4`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-wrap gap-4"
          action=""
        >
          {/*Monto*/}
          <div className="w-full lg:w-[46%] flex lg:flex-col justify-between items-baseline gap-2 lg:justify-start">
            <label className="flex gap-2 items-center" htmlFor="Monto">
              Monto: <GiMoneyStack size={30} />{" "}
            </label>
            <input
              {...register("monto", { required: true, valueAsNumber: true })}
              className={`${darkMode ? "bg-[#1E1E1E] placeholder:text-[#a6acb1] text-[#F9FAFB] border border-[#F9FAFB]" : "bg-[#FFFFFF] placeholder:text-[#a6acb1] text-[#121212] border border-[#121212]"} w-full gap-2 rounded p-2 mt-2`}
              type="number"
              id="Monto"
              placeholder="200000"
              required
              autoComplete="off"
              min={1}
              step={0.01}
            />
            {errors.monto && <p className="text-red-500">Monto es requerido</p>}
          </div>
          {/*Tipo*/}
          <div className="w-full lg:w-[46%] flex lg:flex-col justify-between items-baseline gap-2 lg:justify-start">
            <label className="flex gap-2 items-center" htmlFor="Tipo">
              Tipo: <IoMdSwap size={30} />{" "}
            </label>
            <select
              {...register("tipo", { required: true })}
              className={`${darkMode ? "bg-[#1E1E1E] text-[#F9FAFB] border border-[#F9FAFB]" : "bg-[#FFFFFF] text-[#121212] border border-[#121212]"} w-full gap-2 rounded p-2 mt-2`}
              id="Tipo"
              required
              autoComplete="off"
              defaultValue="Ingreso"
            >
              <option value="Ingreso">Ingreso</option>
              <option value="Gasto">Gasto</option>
            </select>
            {errors.tipo && <p className="text-red-500">Tipo es requerido</p>}
          </div>
          {/*Categoria*/}
          <div className="w-full lg:w-[46%] flex lg:flex-col justify-between items-baseline gap-2 lg:justify-start">
            <label className="flex gap-2 items-center" htmlFor="Categoria">
              Categoria: <BiCategoryAlt size={30} />
            </label>
            <select
              key={tipoSeleccionado}
              className={`${darkMode ? "bg-[#1E1E1E] text-[#F9FAFB] border border-[#F9FAFB]" : "bg-[#FFFFFF] text-[#121212] border border-[#121212]"} w-full gap-2 rounded p-2 mt-2`}
              {...register("categoria", { required: true })}
              id="Categoria"
              defaultValue={
                tipoSeleccionado === "Ingreso" ? "Ingreso" : "Alimentacion"
              }
            >
              {tipoSeleccionado === "Ingreso" ? (
                <option value="Ingreso">Ingreso</option>
              ) : (
                <>
                  <option value="Alimentacion">Alimentación</option>
                  <option value="Salud">Salud</option>
                  <option value="Transporte">Combustible</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                  <option value="Compras">Pagos Mensuales</option>
                  <option value="Otros">Otros</option>
                </>
              )}
            </select>
            {errors.categoria && (
              <p className="text-red-500">Categoria es requerida</p>
            )}
          </div>
          {/*Descripcion*/}
          <div className="w-full lg:w-[46%] flex flex-col justify-between items-baseline gap-2 lg:justify-start">
            <label className="flex gap-2 items-center" htmlFor="Descripcion">
              Descripción: <TbFileDescription size={30} />{" "}
            </label>
            <textarea
              {...register("descripcion", { required: true })}
              className={`${darkMode ? "bg-[#1E1E1E] text-[#F9FAFB] placeholder:text-[#a6acb1] border border-[#F9FAFB]" : "bg-[#FFFFFF] placeholder:text-[#a6acb1] text-[#121212] border border-[#121212]"} w-full gap-2 rounded p-2 mt-2`}
              id="Descripcion"
              placeholder="Compras de supermercado"
              autoComplete="off"
              rows={3}
            />
            {errors.descripcion && (
              <p className="text-red-500">Descripción es requerida</p>
            )}
          </div>
          <button className="w-full  bg-blue-500 text-white p-2 rounded">
            Guardar
          </button>
        </form>
      </main>
    </div>
  );
}

export default Main;
