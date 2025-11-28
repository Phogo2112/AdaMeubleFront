import api from "../api/axiosConfig";
import { Payment, CreatePaymentRequest } from "../models/Payment";

export const initiatePayment = async (
  request: CreatePaymentRequest
): Promise<Payment> => {
  const response = await api.post("/payments", request);
  return response.data;
};

export const confirmPayment = async (
  transactionId: string
): Promise<Payment> => {
  const response = await api.put(`/payments/${transactionId}/confirm`);
  return response.data;
};

export const cancelPayment = async (paymentId: number): Promise<void> => {
  await api.delete(`/payments/${paymentId}`);
};

export const getUserPayments = async (): Promise<Payment[]> => {
  const response = await api.get("/payments");
  return response.data;
};

export const getPaymentById = async (paymentId: number): Promise<Payment> => {
  const response = await api.get(`/payments/${paymentId}`);
  return response.data;
};
