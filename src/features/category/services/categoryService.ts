import apiClient from '../../../services/config-client/apiClient';
import { ApiResponse } from '../../../types/global';
import {Category, CategoryPageableResponseI } from '../types/category';
import apiAuthClient from '../../../services/config-client/apiAuthClient';

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


export const followCategory = async (categoryId: number, userId: number): Promise<ApiResponse<string>> => {
  const response = await apiAuthClient.post<ApiResponse<string>>(`/category/${categoryId}/follow?userId=${userId}`);
  return response.data;
};

export const unfollowCategory = async (categoryId: number, userId: number): Promise<ApiResponse<string>> => {
  const response = await apiAuthClient.delete<ApiResponse<string>>(`/category/${categoryId}/unfollow?userId=${userId}`);
  return response.data;
};
