// @ts-nocheck
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const { register: registerUser } = useAuth(); // <- On récupère la fonction register du context
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    try {
      await registerUser(firstname, lastname, email, password); // ✅ APPEL AU BACKEND
      setSuccess("Compte créé avec succès !");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'inscription");
    }
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
        <button type="submit">S'inscrire</button>
      </form>

      <p>
        Déjà un compte ? <a href="/login">Connectez-vous ici</a>
      </p>
    </div>
  );
}
