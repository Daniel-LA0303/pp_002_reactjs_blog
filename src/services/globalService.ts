import { ApiResponse } from "../types/global";
import { UserCategoryTop } from "../types/global";
import apiClient from "./config-client/apiClient";


export const fetchHomePageInfo = async (): Promise<ApiResponse<UserCategoryTop>> => {
    const response = await apiClient.get<ApiResponse<UserCategoryTop>>(`/blog/home-page-info`);
    return response.data;
};