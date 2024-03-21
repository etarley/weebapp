import axios from "axios";

const BASE_URL = "https://backend.weebapp.workers.dev";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function registerUser(
  email: string,
  password: string,
  name: string,
) {
  const response = await api.post("/register", { email, password, name });
  return response.data;
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error || "Failed to login");
    } else {
      throw new Error("Failed to login");
    }
  }
}

export async function fetchProtectedData(token: string) {
  const response = await api.get("/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
