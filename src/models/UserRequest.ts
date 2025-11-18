// UserRequest.ts
export interface UserRequest {
  id: number;
  userId: number;
  categoryId?: number;
  colorId?: number;
  materialId?: number;

  // Relations (optionnelles, pour l'affichage)
  category?: {
    id: number;
    name: string;
  };
  color?: {
    id: number;
    name: string;
  };
  material?: {
    id: number;
    name: string;
  };
}

// DTO pour créer une préférence
export interface CreateUserRequestDTO {
  categoryId?: number;
  colorId?: number;
  materialId?: number;
}
