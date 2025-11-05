// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

export default function HomePage({ goToLogin }) {
  const { user, logout } = useAuth();
  const [protectedData, setProtectedData] = useState(null);

  const displayName =
    user?.firstname || user?.name || user?.email || "utilisateur";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/users/me");
        setProtectedData(response.data);
      } catch (error) {
        console.error("Erreur API protégée :", error);
      }
    };
    fetchData();
  }, []);

  const logoutUser = () => {
    logout(); // ✅ utilise la bonne fonction du contexte
    if (goToLogin) goToLogin();
  };

  return (
    <div>
      <h1>Bienvenue {displayName} 👋</h1>

      {/* ✅ bouton avec la fonction corrigée */}
      <button onClick={logoutUser}>Déconnexion</button>

      {protectedData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Données sécurisées récupérées :</h2>
          <pre>{JSON.stringify(protectedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
