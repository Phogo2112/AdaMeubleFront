// src/services/authService.ts
import api from "../api/axiosConfig.ts";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  firstname: string;
  lastname: string;
  exp?: number;
}

export interface User {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  firstname: string;
  lastname: string;
}

export async function login(email: string, password: string): Promise<User> {
  const res = await api.post("/auth/login", { email, password });

  localStorage.setItem("token", res.data.token);

  const user = getUserFromToken();
  return user!;
}

export async function register(
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<User> {
  const res = await api.post("/auth/register", {
    firstname,
    lastname,
    email,
    password,
  });

  localStorage.setItem("token", res.data.token);

  const user = getUserFromToken();
  return user!;
}

export function logout(): void {
  localStorage.removeItem("token");
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp) {
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        logout();
        return false;
      }
    }

    return true;
  } catch (error) {
    logout();
    return false;
  }
}

export function getUserFromToken(): User | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp) {
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        logout();
        return null;
      }
    }

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      firstname: decoded.firstname,
      lastname: decoded.lastname,
    };
  } catch (error) {
    console.error("Token invalide:", error);
    logout();
    return null;
  }
}

export async function getCurrentUser(): Promise<User> {
  const res = await api.get("/auth/me");
  return res.data;
}
