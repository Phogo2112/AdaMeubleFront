import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentSuccessPage.css';

export const PaymentSuccessPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-success-page">
            <div className="success-container">
                <div className="success-icon">✓</div>
                <h1>Paiement réussi !</h1>
                <p>Votre commande a été confirmée avec succès.</p>
                <p className="sub-message">
                    Vous recevrez un email de confirmation sous peu.
                </p>

                <div className="action-buttons">
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/payments')}
                    >
                        Voir mes paiements
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => navigate('/')}
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
};