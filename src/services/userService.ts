import apiClient from "./apiClient";
import { UserProfile, UserUpdateInfoRequest, UserUpdateInfoI} from "../types/user";
import { ApiResponse } from "../types/category";


export const fetchGetProfile = async (id: number): Promise<ApiResponse<UserProfile>> => {
  const response = await apiClient.get<ApiResponse<UserProfile>>(`/user/get-user-info/${id}`);
  return response.data;
};


export const fetchGetUpdateUserInfo = async (id: number): Promise<ApiResponse<UserUpdateInfoI>> => {
  const response = await apiClient.get<ApiResponse<UserUpdateInfoI>>(`/user/get-user-info-to-update/${id}`);
  return response.data;
}

export const fetchPutUpdateUserInfo = async (id: number, userUpdated: UserUpdateInfoRequest): Promise<ApiResponse<string>> => {
  const response = await apiClient.put<ApiResponse<string>>(`/user/${id}`, userUpdated);
  return response.data;
}