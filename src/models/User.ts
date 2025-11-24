// Interfaces pour l'utilisateur
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address?: string;
  role: "USER" | "ADMIN";
}

export interface AuthResponse {
  token: string;
  user?: User;
  refreshToken?: string;
  expiresIn?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address?: string;
}
