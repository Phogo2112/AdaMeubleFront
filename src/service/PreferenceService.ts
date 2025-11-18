import api from "../api/axiosConfig";
import { Preference } from "../models/Preference";

// Récupérer tous mes favoris
export const getMyPreferences = async (): Promise<Preference[]> => {
  const response = await api.get("/preferences");
  return response.data;
};

// Ajouter un produit aux favoris
export const addPreference = async (productId: number): Promise<Preference> => {
  const response = await api.post("/preferences", { productId });
  return response.data;
};

// Retirer un produit des favoris
export const removePreference = async (productId: number): Promise<void> => {
  await api.delete(`/preferences/${productId}`);
};

// Vérifier si un produit est en favoris
export const checkPreference = async (productId: number): Promise<boolean> => {
  const response = await api.get(`/preferences/check/${productId}`);
  return response.data.isFavorite;
};
