// src/services/authService.js
import api from "../api/axiosConfig.ts";

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data.user;
}

export async function register(firstname, lastname, email, password) {
  const res = await api.post("/auth/register", {
    firstname,
    lastname,
    email,
    password,
  });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data.user;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export async function getCurrentUser() {
  const res = await api.get("/auth/me");
  return res.data;
}
