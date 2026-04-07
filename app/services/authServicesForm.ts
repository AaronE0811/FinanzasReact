const API_URL = "/api/auth";

export const FormDatos = async (
  monto: number,
  tipo: string,
  categoria: string,
  descripcion: string,
) => {
  const response = await fetch(`${API_URL}/FormDatos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ monto, tipo, categoria, descripcion }),
  });
  const data = await response.json();
  if (data.token) localStorage.setItem("token", data.token);
  return {
    ok: response.ok,
    message: data.message,
    error: data.error,
  };
};
