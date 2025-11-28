import api from '../api/axiosConfig.ts';
import { Color } from '../models/Color';

export const getAllColors = async (): Promise<Color[]> => {
    const response = await api.get('/colors');
    return response.data;
};