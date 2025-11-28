import api from "../api/axiosConfig";
import { Preference } from "../models/Preference";

export const getMyPreferences = async (): Promise<Preference[]> => {
  const response = await api.get("/preferences");
  return response.data;
};

export const addPreference = async (productId: number): Promise<Preference> => {
  const response = await api.post(`/preferences/${productId}`);
  return response.data;
};

export const removePreference = async (productId: number): Promise<void> => {
  await api.delete(`/preferences/${productId}`);
};

export const checkPreference = async (productId: number): Promise<boolean> => {
  const response = await api.get(`/preferences/check/${productId}`);
  return response.data.isFavorite;
};
