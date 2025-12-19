import { AuthLoginRequestI, AuthSuccessResponseI, SignUpRequestI } from "../types/auth";
import { ApiResponse } from "../../../types/global";
import apiClient from "../../../services/config-client/apiClient";


export const fetchLoginRequest = async (loginData: AuthLoginRequestI): Promise<ApiResponse<AuthSuccessResponseI>> => {
    const response = await apiClient.post<ApiResponse<AuthSuccessResponseI>>("/auth/login", loginData);
    return response.data;
};


export const fetchRegisterRequest = async (registerData: SignUpRequestI): Promise<ApiResponse<AuthSuccessResponseI>> => {
    const response = await apiClient.post<ApiResponse<AuthSuccessResponseI>>("/auth/register", registerData);
    console.log(response.data);
    return response.data;
};
