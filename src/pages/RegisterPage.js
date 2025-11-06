// @ts-nocheck
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const { login } = useAuth(); // pour connecter l'utilisateur directement après inscription
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🚨 Validation simple côté front
    if (!firstname || !lastname || !email || !password) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    // ✅ Simulation d'inscription (fake backend)
    const newUser = {
      id: Date.now(), // Identifiant simulé
      firstname,
      lastname,
      email,
    };

    // ✅ Stocker le user en local (comme si l’API avait répondu)
    localStorage.setItem("user", JSON.stringify(newUser));

    // ✅ Connexion automatique après inscription
    login(newUser);

    setSuccess("Compte créé avec succès !");
    setError("");
    // Option : redirection auto
    // window.location.href = "/";
  };

  return (
    <div>
      <h2>Créer un compte</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">S’inscrire</button>
      </form>

      <p>
        Déjà un compte ? <a href="/login">Connectez-vous ici</a>
      </p>
    </div>
  );
}
