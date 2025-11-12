// @ts-nocheck
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import '../styles/Forms.css';

export function RegisterPage() {
    const { register: registerUser } = useAuth();
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
            await registerUser(firstname, lastname, email, password);
            setSuccess("Compte créé avec succès !");
            setError("");
        } catch (err) {
            console.error(err);
            setError("Erreur lors de l'inscription");
        }
    };

    return (
        <div className="form-page">
            <h2>Créer un compte</h2>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Prénom</label>
                    <input
                        type="text"
                        placeholder="Votre prénom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        placeholder="Votre nom"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                    S'inscrire
                </button>
            </form>

            <p className="form-footer">
                Déjà un compte ?{' '}
                <Link to="/login">Connectez-vous ici</Link>
            </p>
        </div>
    );
}