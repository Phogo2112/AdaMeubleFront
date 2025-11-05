import React, { useState } from "react";

export default function RegisterPage({ switchToLogin }) {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
  });

  return (
    <div>
      <h2>Inscription</h2>
      <form>
        <input
          type="text"
          placeholder="Prénom"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="Nom"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="Adresse"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <br />
        <button type="submit">S'inscrire</button>
      </form>

      <p>
        Déjà un compte ? <button onClick={switchToLogin}>Se connecter</button>
      </p>
    </div>
  );
}
