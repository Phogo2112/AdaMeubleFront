import api from "../api/axiosConfig";
import { UserRequest, CreateUserRequestDTO } from "../models/UserRequest";

// 🎭 MOCK : Récupérer mes préférences
export const getMyPreferences = async (): Promise<UserRequest[]> => {
  // 🎭 DONNÉES MOCKÉES (temporaires)
  // Plus tard : const response = await api.get('/api/user-requests/my-preferences');

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

  // Simule un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockData;
};

// 🎭 MOCK : Ajouter une préférence
export const addPreference = async (
  data: CreateUserRequestDTO
): Promise<UserRequest> => {
  // 🎭 SIMULATION
  // Plus tard : const response = await api.post('/api/user-requests', data);

  console.log("🎭 [MOCK] Ajout préférence:", data);

  // Simule la réponse du backend
  const newPreference: UserRequest = {
    id: Math.floor(Math.random() * 1000),
    userId: 5,
    ...data,
    // Ces infos viendraient normalement du backend
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

// 🎭 MOCK : Supprimer une préférence
export const deletePreference = async (id: number): Promise<void> => {
  // 🎭 SIMULATION
  // Plus tard : await api.delete(`/api/user-requests/${id}`);

  console.log("🎭 [MOCK] Suppression préférence ID:", id);
  await new Promise((resolve) => setTimeout(resolve, 300));
};
