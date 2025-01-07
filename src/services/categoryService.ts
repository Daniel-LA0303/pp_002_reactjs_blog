import apiClient from './apiClient';
import { ApiResponse, Category } from '../types/category';

// This file content category services

/**
 * get all categories
 */
export const fetchAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await apiClient.get<ApiResponse<Category[]>>('/category');
  return response.data;
};
