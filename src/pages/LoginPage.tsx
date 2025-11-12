// @ts-nocheck
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate, Link } from "react-router-dom";
import '../styles/Forms.css';

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Email ou mot de passe incorrect");
        }
    };

    return (
        <div className="form-page">
            <h2>Connexion</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
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
                    Se connecter
                </button>
            </form>

            <p className="form-footer">
                Pas encore de compte ?{' '}
                <Link to="/register">Créez votre compte ici</Link>
            </p>
        </div>
    );
}