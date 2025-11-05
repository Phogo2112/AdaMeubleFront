import React, { useState } from "react";

export default function LoginPage({ switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-row justify-center items-center">
      <h2>Connexion</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className=""
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Se connecter</button>
      </form>

      <p>
        Pas encore de compte ?{" "}
        <button onClick={switchToRegister}>Créer un compte</button>
      </p>
    </div>
  );
}
