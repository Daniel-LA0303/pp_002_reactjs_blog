import { AuthLoginRequestI, AuthSuccessResponseI, SignUpRequestI } from "../types/auth";
import { ApiResponse } from "../types/category";
import apiClient from "./apiClient";


export const fetchLoginRequest = async (loginData: AuthLoginRequestI): Promise<ApiResponse<AuthSuccessResponseI>> => {
    const response = await apiClient.post<ApiResponse<AuthSuccessResponseI>>("/auth/login", loginData);
    console.log(response.data);
    return response.data;
};


export const fetchRegisterRequest = async (registerData: SignUpRequestI): Promise<ApiResponse<AuthSuccessResponseI>> => {
    const response = await apiClient.post<ApiResponse<AuthSuccessResponseI>>("/auth/register", registerData);
    console.log(response.data);
    return response.data;
};
