import apiClient from "./apiClient";
import { ApiResponse,  } from "../types/category";
import { BlogPageResponse, CreateBlogRequestI, CreateBlogResponseI } from "../types/blog";

export const fetchCreateBlogRequest = async (post: CreateBlogRequestI): Promise<ApiResponse<CreateBlogResponseI>> => {
    const response = await apiClient.post<ApiResponse<CreateBlogResponseI>>('/blog', post);
    return response.data;
}

export const fetchGetOneBlog = async (id: number): Promise<ApiResponse<BlogPageResponse>> => {
    const response = await apiClient.get<ApiResponse<BlogPageResponse>>(`/blog/${id}`);
    return response.data;
}