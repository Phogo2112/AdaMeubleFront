import axios from "axios";
import {
  AuthResponse,
  User,
  LoginRequest,
  RegisterRequest,
} from "../models/User";

export function login(email: string, password: string): Promise<AuthResponse> {
  return axios
    .post<AuthResponse>("http://localhost:8080/api/auth/login", {
      email,
      password,
    })
    .then((res) => res.data);
}

export function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  return axios
    .post<AuthResponse>("http://localhost:8080/api/auth/register", {
      name,
      email,
      password,
    })
    .then((res) => res.data);
}

export function logout(): Promise<void> {
  return axios
    .post("http://localhost:8080/api/auth/logout")
    .then((res) => res.data);
}

export function getStoredToken(): Promise<User> {
  return axios
    .get<User>("http://localhost:8080/api/auth/me")
    .then((res) => res.data);
}

export function storeAuth(token: string, user: User): Promise<void> {
  return axios
    .post("http://localhost:8080/api/auth/store", { token, user })
    .then((res) => res.data);
}

export function clearAuth(): Promise<void> {
  return axios
    .post("http://localhost:8080/api/auth/clear")
    .then((res) => res.data);
}

export function isAuthenticated(): Promise<boolean> {
  return axios
    .get("http://localhost:8080/api/auth/isAuthenticated")
    .then((res) => res.data);
}

export function getCurrentUser(): Promise<User> {
  return axios
    .get<User>("http://localhost:8080/api/auth/me")
    .then((res) => res.data);
}

export function getStoredTokens(): Promise<string[]> {
  return axios
    .get("http://localhost:8080/api/auth/storedTokens")
    .then((res) => res.data);
}

export function clearStoredTokens(): Promise<void> {
  return axios
    .post("http://localhost:8080/api/auth/clearStoredTokens")
    .then((res) => res.data);
}

export function isTokenValid(token: string): Promise<boolean> {
  return axios
    .post("http://localhost:8080/api/auth/isTokenValid", { token })
    .then((res) => res.data);
}

export function LoginRequest(
  email: string,
  password: string
): Promise<AuthResponse> {
  return axios
    .post("http://localhost:8080/api/auth/login", { email, password })
    .then((res) => res.data);
}

export function RegisterRequest(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  return axios
    .post("http://localhost:8080/api/auth/register", { name, email, password })
    .then((res) => res.data);
}

export function LogoutRequest(): Promise<void> {
  return axios
    .post("http://localhost:8080/api/auth/logout")
    .then((res) => res.data);
}
