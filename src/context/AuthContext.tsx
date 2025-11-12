import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { User } from "../models/User";

// Interface pour le contexte
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<any>;
    register: (firstname: string, lastname: string, email: string, password: string, address?: string) => Promise<any>;
    logout: () => void;
    isAuthenticated: boolean;
}

// Créer le contexte avec le type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data); // res.data est le UserDto complet
            return res.data;
        } catch (error) {
            console.error("❌ Token invalide, déconnexion...");
            // Nettoyer en cas d'échec
            localStorage.removeItem("token");
            delete api.defaults.headers.common["Authorization"];
            setUser(null);
            throw error; // Permet aux autres fonctions de savoir que ça a échoué
        }
    };

    // Au premier chargement de l'application, on vérifie la session
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            // Configurer Axios pour TOUTES les futures requêtes de cette session
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            try {
                // Valider le token en récupérant l'utilisateur
                await fetchUser();
            } catch (error) {
                // L'erreur est déjà gérée dans fetchUser
            } finally {
                // Quoi qu'il arrive, le chargement est terminé
                setLoading(false);
            }
        };
        checkAuth();
    }, []); // Le tableau vide [] assure que cela ne s'exécute qu'une fois

    /**
     * Connecte l'utilisateur
     */
    const login = async (email, password) => {
        // 1. Obtenir le token du backend
        const res = await api.post("/auth/login", { email, password });
        const token = res.data.token;

        // 2. Sauvegarder le token
        localStorage.setItem("token", token);

        // 3. Mettre à jour l'en-tête Axios par défaut
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // 4. Récupérer le profil utilisateur et le stocker dans l'état
        return await fetchUser();
    };

    /**
     * Inscrit l'utilisateur ET le connecte automatiquement
     */
    const register = async (firstname, lastname, email, password) => {
        // 1. S'inscrire et obtenir le token
        const res = await api.post("/auth/register", {
            firstname,
            lastname,
            email,
            password,
        });
        const token = res.data.token; // (Supposant que /register renvoie un token)

        // 2. Sauvegarder le token
        localStorage.setItem("token", token);

        // 3. Mettre à jour l'en-tête Axios par défaut
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // 4. Récupérer le profil utilisateur et le stocker dans l'état
        return await fetchUser();
    };

    /**
     * Déconnecte l'utilisateur
     */
    const logout = () => {
        // 1. Vider le localStorage
        localStorage.removeItem("token");

        // 2. Vider l'état React
        setUser(null);

        // 3. TRÈS IMPORTANT : Retirer le token d'Axios
        delete api.defaults.headers.common["Authorization"];
    };

    // Fournir le contexte au reste de l'application
    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user, // Un booléen pratique
            }}
        >
            {/* N'affiche pas les enfants (le reste de l'app)
              tant que la vérification initiale n'est pas terminée
            */}
            {!loading && children}
        </AuthContext.Provider>
    );
}

/**
 * Hook personnalisé pour un accès facile au contexte
 */
export function useAuth() {
    return useContext(AuthContext);
}