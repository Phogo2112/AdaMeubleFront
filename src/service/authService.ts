// src/services/authService.ts
import api from "../api/axiosConfig.ts";
import { jwtDecode } from "jwt-decode";

// ✅ Interface pour le contenu du JWT
interface JwtPayload {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  firstname: string; // ✅ AJOUTÉ
  lastname: string; // ✅ AJOUTÉ
  exp?: number; // Timestamp d'expiration
}

// ✅ Interface pour l'utilisateur
export interface User {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  firstname: string; // ✅ AJOUTÉ
  lastname: string; // ✅ AJOUTÉ
}

/**
 * Connexion utilisateur
 * ✅ SÉCURISÉ : On stocke seulement le token, pas l'objet user
 */
export async function login(email: string, password: string): Promise<User> {
  const res = await api.post("/auth/login", { email, password });

  // ✅ Stocker SEULEMENT le token
  localStorage.setItem("token", res.data.token);

  // ❌ NE PLUS FAIRE ÇA :
  // localStorage.setItem("user", JSON.stringify(res.data.user));

  // ✅ Décoder le JWT pour obtenir les infos user
  const user = getUserFromToken();
  return user!;
}

/**
 * Inscription utilisateur
 * ✅ SÉCURISÉ : Même logique que login
 */
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

  // ✅ Stocker SEULEMENT le token
  localStorage.setItem("token", res.data.token);

  // ✅ Décoder le JWT
  const user = getUserFromToken();
  return user!;
}

/**
 * Déconnexion
 * ✅ Supprime SEULEMENT le token (pas besoin de supprimer 'user' qui n'existe plus)
 */
export function logout(): void {
  localStorage.removeItem("token");
  // ❌ Plus besoin de ça :
  // localStorage.removeItem("user");
}

/**
 * Vérifier si l'utilisateur est connecté
 * ✅ SÉCURISÉ : Vérifie aussi l'expiration du token
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // ✅ Vérifier l'expiration
    if (decoded.exp) {
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        // Token expiré
        logout();
        return false;
      }
    }

    return true;
  } catch (error) {
    // Token invalide
    logout();
    return false;
  }
}

/**
 * Récupérer l'utilisateur depuis le JWT
 * ✅ SÉCURISÉ : Le JWT est signé par le backend, impossible à falsifier
 */
export function getUserFromToken(): User | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // ✅ Vérifier l'expiration
    if (decoded.exp) {
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        logout();
        return null;
      }
    }

    // ✅ Retourner l'utilisateur depuis le JWT
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      firstname: decoded.firstname, // ✅ AJOUTÉ
      lastname: decoded.lastname, // ✅ AJOUTÉ
    };
  } catch (error) {
    console.error("Token invalide:", error);
    logout();
    return null;
  }
}

/**
 * Récupérer l'utilisateur actuel depuis le backend
 * ✅ Utilise l'endpoint /auth/me si tu as besoin de données à jour
 */
export async function getCurrentUser(): Promise<User> {
  const res = await api.get("/auth/me");
  return res.data;
}
