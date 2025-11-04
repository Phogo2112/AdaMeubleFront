export interface User {
  id: number;
  name: string;
  email: string;
  role?: "USER" | "ADMIN";
  createdAt?: string;
  updatedAt?: string;
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
  name: string;
  email: string;
  password: string;
}
