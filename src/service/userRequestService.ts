import api from "../api/axiosConfig";
import { UserRequest, CreateUserRequestDTO } from "../models/UserRequest";

export const getMyPreferences = async (): Promise<UserRequest[]> => {

  const mockData: UserRequest[] = [
    {
      id: 1,
      userId: 5,
      categoryId: 1,
      colorId: 2,
      materialId: 1,
      category: { id: 1, name: "Salon" },
      color: { id: 2, name: "Bleu" },
      material: { id: 1, name: "Bois massif" },
    },
    {
      id: 2,
      userId: 5,
      categoryId: 2,
      colorId: 1,
      materialId: 3,
      category: { id: 2, name: "Chambre" },
      color: { id: 1, name: "Blanc" },
      material: { id: 3, name: "Métal" },
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockData;
};

export const addPreference = async (
  data: CreateUserRequestDTO
): Promise<UserRequest> => {
  console.log("🎭 [MOCK] Ajout préférence:", data);

  const newPreference: UserRequest = {
    id: Math.floor(Math.random() * 1000),
    userId: 5,
    ...data,
    category: data.categoryId
      ? { id: data.categoryId, name: "Catégorie" }
      : undefined,
    color: data.colorId ? { id: data.colorId, name: "Couleur" } : undefined,
    material: data.materialId
      ? { id: data.materialId, name: "Matière" }
      : undefined,
  };

  await new Promise((resolve) => setTimeout(resolve, 300));
  return newPreference;
};

export const deletePreference = async (id: number): Promise<void> => {
  console.log("🎭 [MOCK] Suppression préférence ID:", id);
  await new Promise((resolve) => setTimeout(resolve, 300));
};
