import { AuthLoginRequestI, AuthLoginResponseI } from "../types/auth";
import apiClient from "./apiClient";


export const fetchLoginRequest = async (loginData: AuthLoginRequestI): Promise<AuthLoginResponseI> => {
    const response = await apiClient.post<AuthLoginResponseI>("/auth/login", loginData);
    console.log(response.data);
    return response.data;
};