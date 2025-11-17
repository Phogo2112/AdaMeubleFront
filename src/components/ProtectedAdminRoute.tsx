import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedAdminRouteProps {
    component: React.ReactNode;
}

export function ProtectedAdminRoute({ component }: ProtectedAdminRouteProps) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user.role !== 'ADMIN') {
        return <Navigate to="/products" />;
    }

    return <>{component}</>;
}