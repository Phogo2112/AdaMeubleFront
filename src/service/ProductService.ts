import api from '../api/axiosConfig';
import { Product } from '../models/Product';

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};