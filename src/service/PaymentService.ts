import api from '../api/axiosConfig';
import { Payment, CreatePaymentRequest } from '../models/Payment';

/**
 * Initier un paiement (réserver le produit)
 */
export const initiatePayment = async (request: CreatePaymentRequest): Promise<Payment> => {
    const response = await api.post('/payments', request);
    return response.data;
};

/**
 * Confirmer un paiement (après succès Stripe/PayPal)
 */
export const confirmPayment = async (transactionId: string): Promise<Payment> => {
    const response = await api.put(`/payments/${transactionId}/confirm`);
    return response.data;
};

/**
 * Annuler un paiement
 */
export const cancelPayment = async (paymentId: number): Promise<void> => {
    await api.delete(`/payments/${paymentId}`);
};

/**
 * Récupérer l'historique des paiements de l'utilisateur
 */
export const getUserPayments = async (): Promise<Payment[]> => {
    const response = await api.get('/payments');
    return response.data;
};

/**
 * Récupérer les détails d'un paiement
 */
export const getPaymentById = async (paymentId: number): Promise<Payment> => {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
};