import { AuthLoginRequestI, AuthLoginResponseI } from "../types/auth";
import { ApiResponse } from "../types/category";
import apiClient from "./apiClient";


export const fetchLoginRequest = async (loginData: AuthLoginRequestI): Promise<ApiResponse<AuthLoginResponseI>> => {
    const response = await apiClient.post<ApiResponse<AuthLoginResponseI>>("/auth/login", loginData);
    return response.data;
};