import apiClient from "../../../services/config-client/apiClient";
import { ApiResponse } from "../../../types/global";
import { BlogPageResponse, BlogsPageableResponseI, CreateBlogResponseI } from "../types/blog";
import apiAuthClient from "../../../services/config-client/apiAuthClient";

export const fetchCreateBlogRequest = async (post: FormData): Promise<ApiResponse<CreateBlogResponseI>> => {
    const response = await apiAuthClient.post<ApiResponse<CreateBlogResponseI>>('/blog', post);
    return response.data;
}

export const fetchGetOneBlog = async (id: number): Promise<ApiResponse<BlogPageResponse>> => {
    const response = await apiClient.get<ApiResponse<BlogPageResponse>>(`/blog/${id}`);
    return response.data;
}

export const fetchBlogsByUser = async (userId: number, page: number, size: number): Promise<ApiResponse<BlogsPageableResponseI>> => {
    const response = await apiClient.get<ApiResponse<BlogsPageableResponseI>>(`/blog/pagination-by-user?userId=${userId}&page=${page}&size=${size}`);
    return response.data;
};

export const fetchBlogsHomePage = async (page: number, size: number): Promise<ApiResponse<BlogsPageableResponseI>> => {
    const response = await apiClient.get<ApiResponse<BlogsPageableResponseI>>(`/blog/pagination?page=${page}&size=${size}`);
    return response.data;
};

export const likeBlog = async (userId: number, blogId: number): Promise<ApiResponse<string>> => {
    const response = await apiAuthClient.post<ApiResponse<string>>(`/blog/${blogId}/like?userId=${userId}`);
    return response.data;
};

export const unlikeBlog = async (userId: number, blogId: number): Promise<ApiResponse<string>> => {
    const response = await apiAuthClient.delete<ApiResponse<string>>(`/blog/${blogId}/unlike?userId=${userId}`);
    return response.data;
};

export const savedBlog = async (userId: number, blogId: number): Promise<ApiResponse<string>> => {
    const response = await apiAuthClient.post<ApiResponse<string>>(`/blog/${blogId}/read?userId=${userId}`);
    return response.data;
};

export const unsavedBlog = async (userId: number, blogId: number): Promise<ApiResponse<string>> => {
    const response = await apiAuthClient.delete<ApiResponse<string>>(`/blog/${blogId}/read?userId=${userId}`);
    return response.data;
};
