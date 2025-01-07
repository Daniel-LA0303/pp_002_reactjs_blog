import apiClient from "./apiClient";
import { ApiResponse,  } from "../types/category";
import { CreateBlogRequestI, CreateBlogResponseI } from "../types/blog";

export const fetchCreateBlogRequest = async (post: CreateBlogRequestI): Promise<ApiResponse<CreateBlogResponseI>> => {
    const response = await apiClient.post<ApiResponse<CreateBlogResponseI>>('/blog', post);
    return response.data;
}