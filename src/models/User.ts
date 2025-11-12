// Interfaces pour l'utilisateur
export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    address?: string;  // Optionnel
    role: "USER" | "ADMIN";
}

// Réponse d'authentification
export interface AuthResponse {
    token: string;
    user?: User;  // Optionnel
    refreshToken?: string;  // Optionnel
    expiresIn?: number;  // Optionnel
}

// Requête de connexion
export interface LoginRequest {
    email: string;
    password: string;
}

// Requête d'inscription
export interface RegisterRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address?: string;  // Optionnel
}