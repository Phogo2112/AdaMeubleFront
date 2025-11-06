// @ts-nocheck
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ✅ Si l'utilisateur n'est pas connecté → on redirige vers /login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const displayName =
    user?.firstname || user?.name || user?.email || "utilisateur";

  const logoutUser = () => {
    logout();
    navigate("/login"); // ✅ Retour automatique vers login après déconnexion
  };

  return (
    <div>
      <h1>Bienvenue {displayName} 👋</h1>

      <button onClick={logoutUser}>Déconnexion</button>
    </div>
  );
}
