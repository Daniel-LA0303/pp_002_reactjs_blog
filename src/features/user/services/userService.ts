import apiClient from "../../../services/config-client/apiClient";
import { UserProfile, UserUpdateInfoI} from "../types/user";
import { ApiResponse } from "../../../types/global";
import apiAuthClient from "../../../services/config-client/apiAuthClient";


export const fetchGetProfile = async (id: number): Promise<ApiResponse<UserProfile>> => {
  const response = await apiClient.get<ApiResponse<UserProfile>>(`/user/get-user-info/${id}`);
  return response.data;
};


export const fetchGetUpdateUserInfo = async (id: number): Promise<ApiResponse<UserUpdateInfoI>> => {
  const response = await apiClient.get<ApiResponse<UserUpdateInfoI>>(`/user/get-user-info-to-update/${id}`);
  return response.data;
}

export const fetchPutUpdateUserInfo = async (id: number, userUpdated: UserUpdateInfoI): Promise<ApiResponse<string>> => {
  const response = await apiAuthClient.put<ApiResponse<string>>(`/user/${id}`, userUpdated);
  return response.data;
}

export const fetchPostFollowUser = async (followerId: number, followedId: number): Promise<ApiResponse<string>> => {
  const response = await apiAuthClient.post<ApiResponse<string>>(`/user/${followedId}/follow`, null, {
    params: { followerId }
  });
  return response.data;
};

export const fetchDeleteUnfollowUser = async (followerId: number, followedId: number): Promise<ApiResponse<string>> => {
  const response = await apiAuthClient.delete<ApiResponse<string>>(`/user/${followedId}/unfollow`, {
    params: { followerId }
  });
  return response.data;
};

