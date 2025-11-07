import api from '../api/axiosConfig';
import { Material } from '../models/Material';

export const getAllMaterials = async (): Promise<Material[]> => {
    const response = await api.get('/materials');
    return response.data;
};