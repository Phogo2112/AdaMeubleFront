import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ✅ Ajoute automatiquement le token JWT dans les headers si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
