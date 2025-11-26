import api from "../api/axiosConfig.ts";
import { Product } from "../models/Product";

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const buyProduct = async (productId: number): Promise<Product> => {
  const response = await api.put(`/products/${productId}/buy`);
  return response.data;
};

export const getAllProductsForAdmin = async (): Promise<Product[]> => {
  const response = await api.get("/admin/products");
  return response.data;
};

export const createProduct = async (productData: any): Promise<Product> => {
  const response = await api.post("/products", productData);
  return response.data;
};
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
export const updateProduct = async (
  id: number,
  productData: any
): Promise<Product> => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};
export const getMyProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products/my-products");
  return response.data;
};
export const deleteProductAsAdmin = async (id: number): Promise<void> => {
  await api.delete(`/admin/products/${id}`);
};
export const getPendingProducts = async (): Promise<Product[]> => {
  const response = await api.get("/admin/products/pending");
  return response.data;
};
export const createProductAsAdmin = async (
  productData: any
): Promise<Product> => {
  const response = await api.post("/admin/products", productData);
  return response.data;
};
export const validateProduct = async (id: number): Promise<Product> => {
  const response = await api.put(`/admin/products/${id}/validate`);
  return response.data;
};

export const rejectProduct = async (id: number): Promise<Product> => {
  const response = await api.put(`/admin/products/${id}/reject`);
  return response.data;
};
