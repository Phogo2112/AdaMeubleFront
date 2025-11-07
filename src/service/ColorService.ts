import api from '../api/axiosConfig';
import { Color } from '../models/Color';

export const getAllColors = async (): Promise<Color[]> => {
    const response = await api.get('/colors');
    return response.data;
};