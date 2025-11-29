import React, { createContext, useContext, useState, useEffect, ReactNode, } from 'react';
import { login as loginService, logout as logoutService, register as registerService, getUserFromToken, User, } from '../service/authService';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = getUserFromToken();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const user = await loginService(email, password);
            setUser(user);
        } catch (error) {
            console.error('Erreur de connexion:', error);
            throw error;
        }
    };
    const register = async (
        firstname: string,
        lastname: string,
        email: string,
        password: string
    ) => {
        try {
            const user = await registerService(firstname, lastname, email, password);
            setUser(user);
        } catch (error) {
            console.error('Erreur inscription:', error);
            throw error;
        }
    };
    const logout = () => {
        logoutService();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}