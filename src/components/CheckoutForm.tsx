import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { initiatePayment, confirmPayment } from '../service/PaymentService';
import { PaymentMethod } from '../models/PaymentMethod';
import '../styles/CheckoutForm.css';

interface CheckoutFormProps {
    productId: number;
    amount: number;
    onSuccess: () => void;
    onCancel: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
                                                              productId,
                                                              amount,
                                                              onSuccess,
                                                              onCancel
                                                          }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            // 1. Créer le paiement côté backend (réserve le produit)
            const payment = await initiatePayment({
                productId,
                paymentMethod: PaymentMethod.CARD
            });

            // 2. Créer le token Stripe côté client
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error('Card element not found');
            }

            const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (stripeError) {
                throw new Error(stripeError.message);
            }

            // 3. Confirmer le paiement côté backend
            await confirmPayment(payment.transactionId);

            // 4. Succès !
            onSuccess();

        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue lors du paiement');
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-header">
                <h2>Paiement sécurisé</h2>
                <p className="amount">Montant : {amount.toFixed(2)} €</p>
            </div>

            <div className="card-element-wrapper">
                <label>Informations de carte bancaire</label>
                <CardElement
                    options={{
                        hidePostalCode: true,
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="form-actions">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn-cancel"
                    disabled={processing}
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="btn-pay"
                    disabled={!stripe || processing}
                >
                    {processing ? 'Paiement en cours...' : `Payer ${amount.toFixed(2)} €`}
                </button>
            </div>
        </form>
    );
};