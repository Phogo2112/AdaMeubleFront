export interface UserRequest {
  id: number;
  userId: number;
  categoryId?: number;
  colorId?: number;
  materialId?: number;

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

export interface CreateUserRequestDTO {
  categoryId?: number;
  colorId?: number;
  materialId?: number;
}
