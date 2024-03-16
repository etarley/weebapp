import axios from "axios";

const BASE_URL = "https://backend.weebapp.workers.dev";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function registerUser(email: string, password: string) {
  const response = await api.post("/register", { email, password });
  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await api.post("/login", { email, password });
  return response.data.token;
}

export async function fetchProtectedData(token: string) {
  const response = await api.get("/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
