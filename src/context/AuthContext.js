import api from "../api/axiosConfig";

// export async function login(email, password) {
//   const res = await api.post("/auth/login", { email, password });
//   localStorage.setItem("token", res.data.token);
//   return res.data.user;
// }

// export async function register(firstname, lastname, email, password) {
//   const res = await api.post("/auth/register", {
//     firstname,
//     lastname,
//     email,
//     password,
//   });
//   return res.data;
// }

// export function logout() {
//   localStorage.removeItem("token");
// }

// export function isAuthenticated() {
//   return !!localStorage.getItem("token");
// }

// export async function getCurrentUser() {
//   const res = await api.get("/auth/me");
//   return res.data;
// }
// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
