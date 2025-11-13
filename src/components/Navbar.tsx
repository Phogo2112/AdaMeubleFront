import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            backgroundColor: '#2c3e50',
            padding: '15px 0',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>
                    Lauréline Meubles
                </Link>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Link to="/products" style={{
                        color: 'white',
                        textDecoration: 'none',
                        padding: '8px 15px'
                    }}>
                        Tous nos produits
                    </Link>
                    
                    {isAuthenticated && user.role === 'ADMIN' && (
                        <Link to="/admin/products" style={{color: 'white'}}>
                            Admin
                        </Link>
                    )}

                    {user ? (
                        <>
                            <span style={{ color: 'white' }}>
                                Bonjour, {user.firstname}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="btn"
                                style={{
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    padding: '8px 15px'
                                }}
                            >
                                Se déconnecter
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-primary">
                                Se connecter
                            </Link>
                            <Link to="/register" className="btn" style={{
                                backgroundColor: '#27ae60',
                                color: 'white'
                            }}>
                                S'inscrire
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;