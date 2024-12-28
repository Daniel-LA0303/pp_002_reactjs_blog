import apiClient from "./apiClient";
import { UserProfile } from "../types/user";
import { ApiResponse } from "../types/category";

export const fetchGetProfile = async (id: number): Promise<ApiResponse<UserProfile>> => {
  const response = await apiClient.get<ApiResponse<UserProfile>>(`/user/get-user-info/${id}`);
  return response.data;
};