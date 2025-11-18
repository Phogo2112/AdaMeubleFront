import { Product } from "./Product";

export interface Preference {
  id: number;
  product: Product;
  createdAt: string;
}
