import { PaymentMethod } from './PaymentMethod';
import { PaymentStatus } from './PaymentStatus';

export interface Payment {
    id: number;
    productId: number;
    userId: number;
    amount: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    transactionId: string;
    paymentDate: string | null;
    createdAt: string;
    productName?: string;
    productImageUrl?: string;
}

export interface CreatePaymentRequest {
    productId: number;
    paymentMethod: PaymentMethod;
    stripeToken?: string;
    paypalOrderId?: string;
}