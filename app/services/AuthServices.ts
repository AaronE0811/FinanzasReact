const API_URL = "/api/auth";

export const Register = async (
  email: string,
  password: string,
  name: string,
) => {
  const response = await fetch(`${API_URL}/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
  const data = await response.json();
  return {
    ok: response.ok,
    message: data.message,
    error: data.error,
  };
};

export const Login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.token) localStorage.setItem("token", data.token);
  return {
    ok: response.ok,
    message: data.message,
    error: data.error,
  };
};
