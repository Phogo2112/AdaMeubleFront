import api from '../api/axiosConfig';
import { Category } from '../models/Category';

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
};