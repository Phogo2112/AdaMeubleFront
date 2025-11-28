import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedUserRouteProps {
  component: React.ReactNode;
}

export function ProtectedUserRoute({ component }: ProtectedUserRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Chargement...</div>;
  }
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }
  return <>{component}</>;
}