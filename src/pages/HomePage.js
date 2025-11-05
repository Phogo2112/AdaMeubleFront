import React from "react";
import { useAuth } from "../context/useAuth";

export default function HomePage({ goToLogin }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Supprime le user et token du contexte + localStorage
    if (goToLogin) goToLogin(); // Retour à la page login
  };

  /** @type {any} */
  const anyUser = user;
  const displayName =
    (anyUser && (anyUser.firstname ?? anyUser.email)) || "utilisateur";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenue {displayName} ! 👋</h1>
      <p>Tu es bien connecté à l'application 😊</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Déconnexion
      </button>
    </div>
  );
}
