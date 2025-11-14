import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedUserRouteProps {
  component: React.ReactNode;
}

/**
 * Composant de protection pour les routes utilisateur
 * Vérifie que l'utilisateur est connecté (USER ou ADMIN)
 */
export function ProtectedUserRoute({ component }: ProtectedUserRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();

  // ⏳ Attendre la fin du chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  // 🔒 Si pas connecté, rediriger vers /login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // ✅ Si connecté (peu importe le rôle), afficher le composant
  return <>{component}</>;
}