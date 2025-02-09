import apiClient from './apiClient';
import { ApiResponse, Category, CategoryPageableResponseI } from '../types/category';

// This file content category services

/**
 * get all categories
 */
export const fetchAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await apiClient.get<ApiResponse<Category[]>>('/category');
  return response.data;
};

export const fetchCategoriesPaginated = async (page: number, size: number): Promise<ApiResponse<CategoryPageableResponseI>> => {
  const response = await apiClient.get<ApiResponse<CategoryPageableResponseI>>(`/category/pagination?page=${page}&size=${size}`);
  return response.data;
};
