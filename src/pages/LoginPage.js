// @ts-nocheck
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

export function LoginPage() {
  const { handleLogin } = useAuth(); // récupère la méthode depuis le contexte
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submitLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ Ce que le backend doit renvoyer :
      // { token: "...", user: { id, name, email, role } }
      const { token, user } = response.data;

      // ✅ On stocke tout dans le contexte + localStorage
      handleLogin(user, token);
    } catch (err) {
      setError("Email ou mot de passe incorrect");
      console.error("Erreur login:", err);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submitLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p>
          Pas encore de compte ? <a href="/register">Inscrivez-vous ici</a>
        </p>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
