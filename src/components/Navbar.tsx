import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import '../styles/NavBar.css';

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🪑</span>
                    <span className="logo-text">Lauréline Meubles</span>
                </Link>

                <div className="navbar-menu">
                    <Link to="/products" className="navbar-link">
                        <span className="link-icon">📦</span>
                        <span>Tous nos produits</span>
                    </Link>

                    {isAuthenticated && (
                        <>
                            <Link to="/my-products" className="navbar-link">
                                <span className="link-icon">🛍️</span>
                                <span>Mes produits</span>
                            </Link>
                            <Link to="/preferences" className="navbar-link">
                                <span className="link-icon">❤️</span>
                                <span>Mes favoris</span>
                            </Link>
                        </>
                    )}

                    {isAuthenticated && user?.role === 'ADMIN' && (
                        <Link to="/admin/products" className="navbar-link navbar-link-admin">
                            <span className="link-icon">👑</span>
                            <span>Admin</span>
                        </Link>
                    )}
                </div>

                <div className="navbar-user">
                    {user ? (
                        <>
                            <span className="navbar-welcome">
                                Bonjour, <strong>{user.firstname}</strong>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="navbar-btn navbar-btn-logout"
                            >
                                <span className="btn-icon">🚪</span>
                                <span>Déconnexion</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-btn navbar-btn-login">
                                <span className="btn-icon">🔐</span>
                                <span>Connexion</span>
                            </Link>
                            <Link to="/register" className="navbar-btn navbar-btn-register">
                                <span className="btn-icon">✨</span>
                                <span>Inscription</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;