import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserPayments } from '../service/PaymentService.ts';
import { Payment } from '../models/Payment';
import { PaymentStatus } from '../models/PaymentStatus';
import '../styles/PaymentHistoryPage.css';

export const PaymentHistoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await getUserPayments();
                setPayments(data);
            } catch (err: any) {
                setError(err.message || 'Erreur lors du chargement de l\'historique');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const getStatusClass = (status: PaymentStatus): string => {
        switch (status) {
            case PaymentStatus.COMPLETED:
                return 'status-completed';
            case PaymentStatus.PENDING:
            case PaymentStatus.PROCESSING:
                return 'status-pending';
            case PaymentStatus.FAILED:
                return 'status-failed';
            case PaymentStatus.REFUNDED:
                return 'status-refunded';
            default:
                return '';
        }
    };

    const getStatusText = (status: PaymentStatus): string => {
        switch (status) {
            case PaymentStatus.COMPLETED:
                return 'Complété';
            case PaymentStatus.PENDING:
                return 'En attente';
            case PaymentStatus.PROCESSING:
                return 'En cours';
            case PaymentStatus.FAILED:
                return 'Échoué';
            case PaymentStatus.REFUNDED:
                return 'Remboursé';
            default:
                return status;
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="payment-history-page">
                <div className="loading">Chargement...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="payment-history-page">
                <div className="error-container">
                    <h2>Erreur</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate('/')}>Retour à l'accueil</button>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-history-page">
            <div className="container">
                <div className="header">
                    <h1>Historique des paiements</h1>
                    <button
                        className="btn-back"
                        onClick={() => navigate('/')}
                    >
                        ← Retour
                    </button>
                </div>

                {payments.length === 0 ? (
                    <div className="empty-state">
                        <p>Vous n'avez effectué aucun paiement pour le moment.</p>
                        <button
                            className="btn-browse"
                            onClick={() => navigate('/')}
                        >
                            Parcourir les produits
                        </button>
                    </div>
                ) : (
                    <div className="payments-list">
                        {payments.map((payment) => (
                            <div key={payment.id} className="payment-card">
                                <div className="payment-header">
                                    <div className="payment-info">
                                        {payment.productImageUrl && (
                                            <img
                                                src={payment.productImageUrl}
                                                alt={payment.productName || 'Produit'}
                                                className="product-thumbnail"
                                            />
                                        )}
                                        <div>
                                            <h3>{payment.productName || `Produit #${payment.productId}`}</h3>
                                            <p className="payment-date">
                                                {payment.paymentDate
                                                    ? formatDate(payment.paymentDate)
                                                    : formatDate(payment.createdAt)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="payment-right">
                                        <p className="payment-amount">{payment.amount.toFixed(2)} €</p>
                                        <span className={`payment-status ${getStatusClass(payment.paymentStatus)}`}>
                                            {getStatusText(payment.paymentStatus)}
                                        </span>
                                    </div>
                                </div>

                                <div className="payment-details">
                                    <div className="detail-item">
                                        <span className="label">Méthode :</span>
                                        <span className="value">{payment.paymentMethod}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Transaction :</span>
                                        <span className="value transaction-id">{payment.transactionId}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};