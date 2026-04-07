export const getRegistros = async (mes: string, anio: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/auth/getDatos?mes=${mes}&anio=${anio}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

export const deleteRegistro = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/auth/DeleteDato?id=${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.ok;
};
