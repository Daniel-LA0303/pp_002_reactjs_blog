import apiClient from './apiClient';
import { ApiResponse, Category } from '../types/category';

export const fetchAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await apiClient.get<ApiResponse<Category[]>>('/category');
  return response.data;
};
